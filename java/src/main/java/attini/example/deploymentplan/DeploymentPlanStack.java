package attini.example.deploymentplan;

import java.util.List;
import java.util.Map;

import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import attini.cdk.AttiniCdk;
import attini.cdk.AttiniCdkProps;
import attini.cdk.AttiniDeploymentPlanStack;
import attini.cdk.AttiniPayload;
import attini.cdk.AttiniRunner;
import attini.cdk.AttiniRunnerJob;
import attini.cdk.AttiniRunnerJobProps;
import attini.cdk.AttiniRunnerProps;
import attini.cdk.DeploymentPlan;
import attini.cdk.DeploymentPlanProps;
import attini.cdk.RunnerConfiguration;
import attini.cdk.Startup;
import attini.example.DemoApp;
import attini.example.DemoStack;
import software.amazon.awscdk.App;
import software.amazon.awscdk.StackProps;
import software.constructs.Construct;

public class DeploymentPlanStack extends AttiniDeploymentPlanStack {

    protected DeploymentPlanStack(@NotNull Construct scope, @NotNull String id) {
        this(scope, id, null);
    }

    protected DeploymentPlanStack(@NotNull Construct scope,
                                  @NotNull String id,
                                  @Nullable StackProps props) {
        super(scope, id, props);

        // Create a runner that be used to deploy the CDK app and run the echo command
        // Specifying a runner is only needed if you want to add any custom configuration.
        // In this example, we install Maven when the container starts and configure how
        // long it can be idle before terminating. To optimize performance, a custom image
        // with Maven already installed could be used.
        AttiniRunner runner =
                new AttiniRunner(this,
                                 "DemoRunner",
                                 AttiniRunnerProps
                                         .builder()
                                         .startup(Startup.builder()
                                                         .commands(List.of("yum install maven -y")) //Install maven when starting the container.
                                                         .build())
                                         .runnerConfiguration(RunnerConfiguration.builder()
                                                                                 .idleTimeToLive(
                                                                                         3600)
                                                                                 .build())
                                         .build());

        // The AttiniCdk step will use the specified runner to deploy the CDK app.
        // The path is specified from root of the project.
        AttiniCdk deployCdkApp = new AttiniCdk(this,
                                               "DeployCdkApp",
                                               AttiniCdkProps.builder()
                                                             .runner(runner.getRunnerName()).path("./")
                                                             .build());


        // This step will simply echo the SNS Arn and the current environment.
        // By using the same runner as the deployCdkApp step we avoid another
        // cold start.
        AttiniRunnerJob echoSnsResource = new AttiniRunnerJob(this,
                                                              "EchoSnsResource",
                                                              AttiniRunnerJobProps.builder()
                                                                                  .environment(Map.of("ENV",
                                                                                                      AttiniPayload.environment(),
                                                                                                      "SNS_ARN",
                                                                                                      deployCdkApp.getOutput(
                                                                                                              DemoApp.STACK_ID,
                                                                                                              DemoStack.SNS_ARN_OUTPUT_KEY)))
                                                                                  .commands(List.of(
                                                                                          "echo deployed topic with arn ${SNS_ARN} to ${ENV}"))
                                                                                  .build());

        new DeploymentPlan(this,
                           "DeploymentPlan",
                           DeploymentPlanProps.builder().definition(deployCdkApp.next(echoSnsResource)).build());
    }

    public static void main(final String[] args) {
        App app = new App();

        new DeploymentPlanStack(app, "DeploymentPlanStack", StackProps.builder().build());

        app.synth();
    }

}
