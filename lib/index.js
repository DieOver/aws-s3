/// <reference path="index.d.ts" />

const AWS = require('aws-sdk');

class AWSS3 {

    _AWS_CONFIG = {
        SECRET_ACCESS_KEY: null,
        ACCESS_KEY_ID: null,
        S3_VERSION: null,
        S3_BUCKET: null,
        S3_REGION: null
    };

    /**
     * @param {Object} config Configuration of AWSS3
     * @param {Object} config.ACCESS_KEY_ID Access Key of AWS
     * @param {Object} config.SECRET_ACCESS_KEY Secret Key of AWS
     * @param {Object} config.S3_VERSION Version of AWS S3
     * @param {Object} config.S3_BUCKET Bucket of AWS S3
     * @param {Object} config.S3_REGION Region of AWS S3
     */
    constructor(config) {
        this._AWS_CONFIG = config;
    }

    /**
     * This function upload de base64 in a converted PNG file and return de URL direct of the image on AWS S3
     * @param {string} base64 Base64 of Image
     * @param {string} folder Folder name to save Image e.g: 'imagens/perfils'
     * @param {string} filename Filename of Image whiout extension (all base64 are converted to png)
     */
    async upload(base64, folder, filename) {
        try {
            const s3 = new AWS.S3({
                accessKeyId: this._AWS_CONFIG.ACCESS_KEY_ID,
                secretAccessKey: this._AWS_CONFIG.SECRET_ACCESS_KEY,
                region: this._AWS_CONFIG.S3_REGION,
                apiVersion: this._AWS_CONFIG.S3_VERSION
            });
            const base64Data = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64');

            if (folder.startsWith('/')) { folder = folder.substring(1); }
            if (folder.endsWith('/')) { folder = folder.slice(0, -1); }
            folder = folder.split('.').slice(0, -1).join('.');

            if (filename.startsWith('/')) { filename = filename.substring(1); }
            if (filename.endsWith('/')) { filename = filename.slice(0, -1); }
            filename = filename.split('.').slice(0, -1).join('.');

            const params = {
                Bucket: this._AWS_CONFIG.S3_BUCKET,
                Key: `${folder}/${filename}.png`,
                Body: base64Data,
                ACL: 'public-read',
                ContentEncoding: 'base64',
                ContentType: `image/png`,
            };
            const result = (await s3.upload(params).promise()).Location;
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject('Failed to save image.');
        }
    }

    /**
     * This function delete file on AWS S3
     * Key is the URL of File without de domain
     * e.g:
     * 
     * URL: https://S3_BUCKET.s3-S3_REGION.amazonaws.com/profiles/NameOfImage.png
     * 
     * KEY Will be: profiles/NameOfImage.png
     * @param {string} photo_url Photo URL to delete
     */
    async delete(photo_url) {
        try {
            const s3 = new AWS.S3({
                accessKeyId: this._AWS_CONFIG.ACCESS_KEY_ID,
                secretAccessKey: this._AWS_CONFIG.SECRET_ACCESS_KEY,
                region: this._AWS_CONFIG.S3_REGION,
                apiVersion: this._AWS_CONFIG.S3_VERSION
            });
            const params = {
                Bucket: this._AWS_CONFIG.S3_BUCKET,
                Key: photo_url.replace(`https://${this._AWS_CONFIG.S3_BUCKET}.s3-${this._AWS_CONFIG.S3_REGION}.amazonaws.com/`, '')
            };
            await s3.deleteObject(params).promise();
            return Promise.resolve('Image Deleted.');
        } catch (error) {
            return Promise.reject('Failed to delete image.');
        }
    }

}

module.exports = AWSS3;