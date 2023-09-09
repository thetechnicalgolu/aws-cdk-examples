import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as s3 from "aws-cdk-lib/aws-s3"
import * as iam from "aws-cdk-lib/aws-iam"
import * as lambda from "aws-cdk-lib/aws-lambda"
import * as apigateway from "aws-cdk-lib/aws-apigateway"

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'InfraQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
    
    //S3 Bucket
    const balanceStatus = new s3.Bucket(this, "s3logicalid465463364",{
      bucketName:"balancestatus5645",
      versioned:true,
      publicReadAccess:true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS
    })

    //IAM Role
    const iamBalanceStatusRole = new iam.Role(this,"iambalancerole", {
       roleName:"bankingLambdaRole",
       description:"role for lambda to access s3 bucket",
       assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com")
     }) 
    iamBalanceStatusRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonS3FullAccess"))
  
    //Lambda Function
    const bankingLambdaFunction = new lambda.Function(this,"lambdalogicalid12323",{
      handler:"lambda_function.lambda_handler",
      runtime:lambda.Runtime.PYTHON_3_10,
      code:lambda.Code.fromAsset("../services/"),
      role:iamBalanceStatusRole,
      functionName:"bankingstatusfun"
    }) 

    // API Gateway
    const bankingapi = new apigateway.LambdaRestApi(this,"bankingresapi",{
      handler: bankingLambdaFunction,
      restApiName:"bankingRestApi",
      deploy:true,
      proxy:false
    })

    const bankstatus = bankingapi.root.addResource("bankStatus")
    bankstatus.addMethod("GET")

  }
}
