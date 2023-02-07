const {DeploymentPlanStack, AttiniRunner, AttiniRunnerJob, DeploymentPlan} = require("@attini/cdk");

class DeploymentPlanAppStack extends DeploymentPlanStack {


  constructor(scope, id, props) {
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

module.exports = { DeploymentPlanAppStack }
