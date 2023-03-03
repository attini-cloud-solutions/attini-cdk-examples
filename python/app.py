#!/usr/bin/env python3
import aws_cdk as cdk
from demo_app_stack.demo_app_stack import DemoAppStack

app = cdk.App()

demo_app_stack = DemoAppStack(app, "DemoApp")

app.synth()
