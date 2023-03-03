const {Stack, CfnOutput} = require("aws-cdk-lib");
const {Topic} = require("aws-cdk-lib/aws-sns");

class DemoAppStack extends Stack {

    static get snsTopicOutputKey() {
        return 'SnsArn';

    }

    constructor(scope, id, props) {
        super(scope, id, props);

        const topic = new Topic(this, 'DemoSnsTopic', {
            topicName: 'DemoSnsTopicJS'
        });


         new CfnOutput(this, DemoAppStack.snsTopicOutputKey, {value: topic.topicArn})
    }


}

module.exports = {DemoAppStack}
