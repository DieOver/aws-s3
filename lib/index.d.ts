// Type definitions for @dieover/aws-s3
// Project: AWS-S3
// Definitions by: Lennon Milicic Costa dieoverofficial@gmail.com

export = AWSS3;

declare class AWSS3 {

    /**
     * @param {AWSS3.ConstructorOptions} config Configuration of AWSS3
     */
    constructor(config: AWSS3.ConstructorOptions);

    /**
     * This function upload de base64 in a converted PNG file and return de URL direct of the image on AWS S3
     * @param {string} base64 Base64 of Image
     * @param {string} folder Folder name to save Image e.g: 'imagens/perfils'
     * @param {string} filename Filename of Image whiout extension (all base64 are converted to png)
     */
    upload(base64: string, folder: string, filename: string): Promise<string>;

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
    delete(photo_url: string): Promise<string>;
}

declare namespace AWSS3 {
    export interface ConstructorOptions {
        /**
         * @param {string} SECRET_ACCESS_KEY Secret Key of AWS
         */
        SECRET_ACCESS_KEY: string;

        /**
         * @param {string} ACCESS_KEY_ID Access Key of AWS
         */
        ACCESS_KEY_ID: string;

        /**
         * @param {string} S3_VERSION Version of AWS S3
         */
        S3_VERSION: string;

        /**
         * @param {string} S3_BUCKET Bucket of AWS S3
         */
        S3_BUCKET: string;

        /**
         * @param {string} S3_REGION Region of AWS S3
         */
        S3_REGION: string;
    }
}