import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AttiniRunner, AttiniRunnerJob, DeploymentPlan, DeploymentPlanStack } from '@attini/cdk';

export class DeploymentPlanAppStack extends DeploymentPlanStack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    let attiniRunner = new AttiniRunner(this, 'DemoRunner', {
      runnerConfiguration: {
        idleTimeToLive: 3600 // container will terminate after being idle for 1 hour
      }
    });

    let helloWorldJob = new AttiniRunnerJob(this, 'HelloWorld', {
      runner: attiniRunner.runnerName,
      commands: ['echo Hello world!']
    });

    let goodbyeWorldJob = new AttiniRunnerJob(this, 'GoodbyeWorld', {
      runner: attiniRunner.runnerName,
      commands: ['echo Goodbye world!']
    });


    new DeploymentPlan(this, 'DemoDeploymentPlan', {
      definition: helloWorldJob.next(goodbyeWorldJob)
    })
  }
}
