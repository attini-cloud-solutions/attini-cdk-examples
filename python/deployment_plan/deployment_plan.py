from attini_cdk import (
    AttiniRunner,
    AttiniRunnerJob,
    DeploymentPlan,
    AttiniDeploymentPlanStack,
    AttiniCdk,
    AttiniPayload
)
from constructs import Construct
import aws_cdk as cdk
import app


class DeploymentPlanStack(AttiniDeploymentPlanStack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        demo_app_stack = app.demo_app_stack

        attini_runner = AttiniRunner(self, "DemoRunner")

        deploy_sns_sdk_stack = AttiniCdk(self, "DeploySnsStack",
                                         path="./",
                                         runner=attini_runner.runner_name
                                         )

        echo_sns_resource = AttiniRunnerJob(self, "EchoSnsResource",
                                            runner=attini_runner.runner_name,
                                            environment={
                                                "SNS_ARN": deploy_sns_sdk_stack.get_output(
                                                    demo_app_stack.artifact_id,
                                                    demo_app_stack.sns_arn_output_key
                                                ),
                                                "ENV": AttiniPayload.environment()
                                            },
                                            commands=[
                                                'echo "SNS topic with arn ${SNS_ARN} was deployed to ${ENV}"'
                                            ])

        DeploymentPlan(self, "DemoDeploymentPlan",
                       definition=deploy_sns_sdk_stack.next(echo_sns_resource)
                       )


deployment_plan_app = cdk.App()

DeploymentPlanStack(deployment_plan_app, "DeploymentPlanAppStack")

deployment_plan_app.synth()
