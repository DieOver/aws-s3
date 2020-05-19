# @dieover/aws-s3

`npm install @dieover/aws-s3 --save`

```js
const AWSS3 = require('@dieover/aws-s3');

const aws = new AWSS3({
    ACCESS_KEY_ID: '',
    SECRET_ACCESS_KEY: '',
    S3_REGION: '',
    S3_BUCKET: '',
    S3_VERSION: ''
});
const photo_url = await aws.upload('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQAB...', 'images', 'new');
const deleted = await aws.delete(photo_url);
```

## Upload

- **BASE64**: data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQAB...
- **FOLDER**: images/something/else
- **FILENAME**: filename
- **SUCCESS RETURN**: Photo URL.
- **FAILED RETURN**: Failed to save image.
```
aws.upload(base64, folder, filename);
```

## Delete

- **PHOTO_URL**: https://S3_BUCKET.s3-S3_REGION.amazonaws.com/images/new.png
- **SUCCESS RETURN**: Image Deleted.
- **FAILED RETURN**: Failed to delete image.
```
aws.delete(PHOTO_URL);
```
