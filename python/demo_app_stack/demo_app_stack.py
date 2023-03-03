from aws_cdk import (
    Stack,
    CfnOutput,
    aws_sns as sns
)
from constructs import Construct


class DemoAppStack(Stack):
    sns_arn_output_key = "SnsArnOutputKey"

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        topic = sns.Topic(self, "AttiniDemoTopic",
                          topic_name="AttiniDemoTopicPy"
                          )

        CfnOutput(self, self.sns_arn_output_key,
                  value=topic.topic_arn
                  )
