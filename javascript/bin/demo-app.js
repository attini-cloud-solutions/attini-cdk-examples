#!/usr/bin/env node

const cdk = require('aws-cdk-lib');
const {DemoAppStack} = require('../lib/demo-app-stack');

const app = new cdk.App();
const stackId = 'DemoAppStack';
new DemoAppStack(app, stackId, {});
module.exports = {stackId}
