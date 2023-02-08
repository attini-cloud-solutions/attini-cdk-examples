#!/usr/bin/env python3

import aws_cdk as cdk

from python.deployment_plan import PythonStack


app = cdk.App()
PythonStack(app, "DeploymentPlanAppStack")

app.synth()
