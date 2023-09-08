import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as s3 from "aws-cdk-lib/aws-s3"
export class CdkS3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkS3Queue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
    const s3DemoBucket = new s3.Bucket(this, "demoBucket54654", {
      bucketName:"demoBucket123456",
      versioned:true,
      publicReadAccess:true
    })
  }
}
