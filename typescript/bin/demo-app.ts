#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DemoAppStack } from '../lib/demo-app-stack';

const app = new cdk.App();

export const stackId = 'DemoApp'
new DemoAppStack(app, stackId, {});
