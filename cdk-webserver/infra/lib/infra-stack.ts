import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from "aws-cdk-lib/aws-ec2"
import { readFileSync } from 'fs';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

  //VPC(Virtual Private Cloud) and subnets.
  
  // Netgateways should be 0 for learners because 
  // it takes charges per hour and created automatically if you don't specify.
  
    const vpc = new ec2.Vpc(this, "vpcDemo", {
      vpcName:"vpc_demo",
      ipAddresses:ec2.IpAddresses.cidr("10.0.0.0/16"),
      natGateways:0,
    })
    // Security Group
    const demoSG = new ec2.SecurityGroup(this,"demoSG", {
      vpc:vpc,
      securityGroupName:"allow http traffic",
      allowAllOutbound:true,
    })
    demoSG.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), 'allow http traffic')
    // EC2 Instance
    const demoEC = new ec2.Instance(this, "demoEC2",{
      vpc:vpc,
      vpcSubnets:{subnetType:ec2.SubnetType.PUBLIC},
      securityGroup:demoSG,
      instanceType:ec2.InstanceType.of(ec2.InstanceClass.T2,ec2.InstanceSize.MICRO),
      machineImage:ec2.MachineImage.latestAmazonLinux2(),
      keyName:"UdemyCourse",
    })
    
    //userData
    const userData = readFileSync('./lib/userdata.sh', 'utf-8')
    demoEC.addUserData(userData)
  }
}
