const AWS = require('aws-sdk')
const SHARP = require("sharp")
const s3 = new AWS.S3()

const main = async (event) => {
    console.log('Event:', event)

    const object = event.Records[0].s3
    const bucket = object.bucket.name
    const file = object.object.key

    return await new Promise((resolve, reject) => {
        const params = {
            Bucket: bucket,
            Key: file
        }

        s3.getObject(params, (err, result) => {
            if(err) {
                reject(err)
            } else {
                SHARP(result.Body)
                .toFormat("png")

                resolve({})
            }
        })
    })
}