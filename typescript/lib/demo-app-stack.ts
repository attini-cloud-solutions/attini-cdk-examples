import * as sns from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import { CfnOutput, Stack } from 'aws-cdk-lib';

export class DemoAppStack extends Stack {

  public static readonly SNS_ARN_OUTPUT_KEY: string = 'test'

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const topic = new sns.Topic(this, 'AttiniDemoTopic', {
      topicName: 'AttiniDemoTopicTS'
    });

    new CfnOutput(this, DemoAppStack.SNS_ARN_OUTPUT_KEY, {value: topic.topicArn})

  }
}
