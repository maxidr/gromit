var s3 = require('s3');

var client = s3.createClient({
  /*
  s3Options: {
    accessKeyId: "...",
    secretAccessKey: "...",
    // any other options are passed to new AWS.S3()
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
  },
  */
})

var uploader = client.uploadDir({
  localDir: "deployment/",
  s3Params: {
    Bucket: 'static-files-gromit',
    ACL: 'public-read'
  }
})

console.log('Uploading file to AWS...')

uploader.on('error', function(err) {
  if( err.code === 'InvalidAccessKeyId' ){
    console.error('FAIL --> ' + err.code + ': ' + err.message)
    console.info('\nChange your crendentials editing the file ~/.aws/credentials and try again\n')
  } else if( err.code === 'CredentialsError' ){
    console.error('FAIL --> ' + err.code + ': ' + err.message)
    console.info('')
    console.info('To solve the error create the file ~/.aws/credentials')
    console.info('')
    console.info('Content example: ')
    console.info('\t[default]')
    console.info('\taws_access_key_id = ...')
    console.info('\taws_secret_access_key = ...')
    console.info('')
  } else {
    console.error("Unable to upload the files: ", err.stack)
  }
})

uploader.on('end', function() { console.log("Uploading finished") })
