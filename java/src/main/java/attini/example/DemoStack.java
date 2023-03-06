package attini.example;

import software.amazon.awscdk.CfnOutput;
import software.amazon.awscdk.CfnOutputProps;
import software.amazon.awscdk.services.sns.Topic;
import software.amazon.awscdk.services.sns.TopicProps;
import software.constructs.Construct;
import software.amazon.awscdk.Stack;
import software.amazon.awscdk.StackProps;

public class DemoStack extends Stack {

    //Making the output key public makes it easier to read the output from the deployment plan
    public static String SNS_ARN_OUTPUT_KEY = "SnsArn";

    public DemoStack(final Construct scope, final String id) {
        this(scope, id, null);
    }

    public DemoStack(final Construct scope, final String id, final StackProps props) {
        super(scope, id, props);

        //Create a simple SNS topic. This is simply for demo purposes and could be any kind of resource.
        Topic topic = new Topic(this, "DemoSnsTopic", TopicProps.builder().topicName("DemoSnsTopicJava").build());

        new CfnOutput(this, SNS_ARN_OUTPUT_KEY, CfnOutputProps.builder().value(topic.getTopicArn()).build());
    }
}
