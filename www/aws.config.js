module.exports = {
    admin: {},
    db: {
        region: 'us-west-2',
        tableName: 'test-table',
        // this public user credential can only read specific table. controlled by IAM policy 
        readCredentials:{
            accessKeyId: 'AKIAJVMLLT2C4FCELQUQ',
            secretAccessKey: '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'
        }
    },
    s3:{}
  }
  