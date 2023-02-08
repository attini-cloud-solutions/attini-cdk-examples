from constructs import Construct
# import attini_cdk as attini
from attini_cdk import (
  DeploymentPlanStack,
  AttiniRunner,
  AttiniRunnerJob,
  DeploymentPlan,
  DeploymentPlan,
  # AttiniCfn,
  # AttiniSam,
)
# from aws_cdk import (
#     Duration,
#     Stack,
#     Fn,
#     aws_cloudformation as cf,
#     CfnParameter,
#     aws_stepfunctions as sfn,
#     aws_sqs as sqs,
#     aws_sns as sns,
#     aws_sns_subscriptions as subs,
# )


class PythonStack(DeploymentPlanStack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        attini_runner = AttiniRunner(self, 'DemoRunner',
            runner_configuration = {
                "idle_time_to_live": 3600 # container will terminate after being idle for 1 hour
            }
        )

        hello_world_job = AttiniRunnerJob(self, 'HelloWorld',
            runner = attini_runner.runner_name,
            commands = [ 'echo Hello world!' ]
        )

        goodbye_world_job = AttiniRunnerJob(self, 'GoodbyeWorld',
            runner = attini_runner.runner_name,
            commands = [ 'echo Goodbye world!' ]
        )

        DeploymentPlan(self, 'DemoDeploymentPlan',
            definition = hello_world_job.next(goodbye_world_job)
        )


        # queue = sqs.Queue(
        #     self, "PythonQueue",
        #     visibility_timeout=Duration.seconds(300),
        # )

        # topic = sns.Topic(
        #     self, "PythonTopic"
        # )

        # database = AttiniCfn(
        #   self, "Database",
        #   stack_name = env.value_as_string + "-database",
        #   template = "database.yaml"
        # )

        # api = AttiniSam(
        #   self, "API",
        #   stack_name = env.value_as_string + '-api-app',
        #   project = {
        #     "path": "/api-app"
        #   },
        #   parameters = {
        #     "DatabaseARN": database.get_output_path('DatabaseARN')
        #   }
        # )

        # deployment_plan = DeploymentPlan(
        #   self, "DeploymentPlan",
        #   definition = database.next(api)
        # )

        # topic.add_subscription(subs.SqsSubscription(queue))
