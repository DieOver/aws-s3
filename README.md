# @dieover/aws-s3

```js
const AWSS3 = require('@dieover/aws-s3');

const aws = new AWSS3({
    ACCESS_KEY_ID: '',
    SECRET_ACCESS_KEY: '',
    S3_REGION: '',
    S3_BUCKET: '',
    S3_VERSION: ''
});
const image = await aws.upload('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQAB...', 'images', 'new');
const deleted = await aws.delete(image.replace('https://S3_BUCKET.s3.S3_REGION.amazonaws.com/', ''));
```

## Upload

- **BASE64**: data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQAB...
- **FOLDER**: images/something/else
    - whitout "/" in start and end of string
- **NAME**: filename
    - without extension
- **SUCCESS RETURN**: Photo URL.
- **FAILED RETURN**: Failed to save image.
```
aws.upload(base64, folder, name);
```

## Delete

- **URL**: https://S3_BUCKET.s3.S3_REGION.amazonaws.com/images/new.png
    - Juste replace domain to get key image of S3.
- **SUCCESS RETURN**: Image Deleted.
- **FAILED RETURN**: Failed to delete image.
```
aws.delete(key);
```
