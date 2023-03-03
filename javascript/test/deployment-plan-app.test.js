const cdk = require('aws-cdk-lib');
const {Template} = require('aws-cdk-lib/assertions');
const DeploymentPlanApp = require('../lib/demo-app-stack');

test('Deployment plan created', () => {
    const app = new cdk.App();

    const stack = new DeploymentPlanApp.DeploymentPlanAppStack(app, 'MyDeploymentPlanStack');

    const template = Template.fromStack(stack);

    template.hasResourceProperties('Attini::Deploy::DeploymentPlan', {DeploymentPlan: {}});
});
