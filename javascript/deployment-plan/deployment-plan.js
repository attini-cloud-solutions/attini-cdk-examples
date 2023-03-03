#!/usr/bin/env node

const cdk = require('aws-cdk-lib');
const {AttiniDeploymentPlanStack, AttiniRunner, AttiniRunnerJob, DeploymentPlan, AttiniCdk, AttiniPayload} = require("@attini/cdk");
const {stackId} = require("../bin/demo-app");
const {DemoAppStack} = require("../lib/demo-app-stack");

class DeploymentPlanAppStack extends AttiniDeploymentPlanStack {

    constructor(scope, id, props) {
        super(scope, id, props);

        let attiniRunner = new AttiniRunner(this, 'DemoRunner', {
            runnerConfiguration: {
                idleTimeToLive: 3600 // container will terminate after being idle for 1 hour
            }
        });

        const deployCdkApp = new AttiniCdk(this, 'DeployCdkApp', {
            runner: attiniRunner.runnerName,
            buildCommands: 'npm install',
            path: './'
        })


        let echoSnsResource = new AttiniRunnerJob(this, 'GoodbyeWorld', {
            runner: attiniRunner.runnerName,
            environment: {
                ENV: AttiniPayload.environment(),
                SNS_ARN: deployCdkApp.getOutput(stackId, DemoAppStack.snsTopicOutputKey)
            },
            commands: ['echo "topic with arn ${SNS_ARN} was deployed to ${ENV}"']
        });


        new DeploymentPlan(this, 'DemoDeploymentPlan', {
            definition: deployCdkApp.next(echoSnsResource)
        })
    }
}
const app = new cdk.App();
new DeploymentPlanAppStack(app, 'DeploymentPlanAppStack', {});
