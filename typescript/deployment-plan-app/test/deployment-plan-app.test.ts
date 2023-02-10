import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as DeploymentPlanApp from '../lib/deployment-plan-app-stack';

test('Deployment plan created', () => {
  const app = new cdk.App();

  const stack = new DeploymentPlanApp.DeploymentPlanAppStack(app, 'MyDeploymentPlanStack');

  const template = Template.fromStack(stack);

  template.hasResourceProperties('Attini::Deploy::DeploymentPlan', {DeploymentPlan: {}});
});
