#!/usr/bin/env node

const cdk = require('aws-cdk-lib');
const { DeploymentPlanAppStack } = require('../lib/deployment-plan-app-stack');

const app = new cdk.App();
new DeploymentPlanAppStack(app, 'DeploymentPlanAppStack', {});
