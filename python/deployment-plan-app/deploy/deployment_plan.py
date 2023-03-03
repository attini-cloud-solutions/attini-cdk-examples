from constructs import Construct
# import attini_cdk as attini
from attini_cdk import (
  AttiniDeploymentPlanStack,
  AttiniRunner,
  AttiniRunnerJob,
  DeploymentPlan,
)


class PythonStack(AttiniDeploymentPlanStack):

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
