#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DeploymentPlanAppStack } from '../lib/deployment-plan-app-stack';

const app = new cdk.App();
new DeploymentPlanAppStack(app, 'DeploymentPlanAppStack', {});
