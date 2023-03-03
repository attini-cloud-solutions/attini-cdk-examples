#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {
  AttiniRunner,
  AttiniRunnerJob,
  DeploymentPlan,
  AttiniDeploymentPlanStack,
  AttiniCdk,
  AttiniPayload
} from '@attini/cdk';
import { Construct } from 'constructs';
import { DemoAppStack } from '../lib/demo-app-stack';
import { stackId } from '../bin/demo-app';

class DeploymentPlanAppStack extends AttiniDeploymentPlanStack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    let attiniRunner = new AttiniRunner(this, 'DemoRunner', {
      runnerConfiguration: {
        idleTimeToLive: 3600 // container will terminate after being idle for 1 hour
      }
    });

    const deploySnsCdkStack = new AttiniCdk(this, 'DeploySnsStack', {
      path: './',
      buildCommands: 'npm install',
      runner: attiniRunner.runnerName
    })

    let echoSnsResource = new AttiniRunnerJob(this, 'GoodbyeWorld', {
      runner: attiniRunner.runnerName,
      environment: {
        SNS_ARN: deploySnsCdkStack.getOutput(stackId, DemoAppStack.SNS_ARN_OUTPUT_KEY),
        ENV: AttiniPayload.environment()
      },
      commands: ['echo "SNS topic with arn ${SNS_ARN} was deployed to ${ENV}"']
    });


    new DeploymentPlan(this, 'DemoDeploymentPlan', {
      definition: deploySnsCdkStack.next(echoSnsResource)
    })
  }
}
const app = new cdk.App();
new DeploymentPlanAppStack(app, 'DeploymentPlanAppStack', {});
