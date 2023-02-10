package com.myorg;

import java.util.Arrays;

import attini.cdk.AttiniRunner;
import attini.cdk.AttiniRunnerJob;
import attini.cdk.AttiniRunnerJobProps;
import attini.cdk.AttiniRunnerProps;
import attini.cdk.DeploymentPlan;
import attini.cdk.DeploymentPlanProps;
import attini.cdk.DeploymentPlanStack;
import attini.cdk.RunnerConfiguration;
import software.amazon.awscdk.StackProps;
import software.constructs.Construct;


public class DeploymentPlanAppStack extends DeploymentPlanStack {
    public DeploymentPlanAppStack(final Construct scope, final String id) {
        this(scope, id, null);
    }

    public DeploymentPlanAppStack(final Construct scope, final String id, final StackProps props) {
        super(scope, id, props);

        AttiniRunner runner = new AttiniRunner(this,
                                               "DemoRunner",
                                               AttiniRunnerProps.builder()
                                                                .runnerConfiguration(RunnerConfiguration.builder()
                                                                                                        .idleTimeToLive(
                                                                                                                3600)
                                                                                                        .build())
                                                                .build());

        AttiniRunnerJob helloWorldJob = new AttiniRunnerJob(this,
                                                            "HelloWorld",
                                                            AttiniRunnerJobProps.builder()
                                                                                .runner(runner.getRunnerName())
                                                                                .commands(Arrays.asList(
                                                                                        "echo Hello world!"))
                                                                                .build());

        AttiniRunnerJob goodbyeWorldJob = new AttiniRunnerJob(this,
                                                              "GoodbyeWorld",
                                                              AttiniRunnerJobProps.builder()
                                                                                  .runner(runner.getRunnerName())
                                                                                  .commands(Arrays.asList(
                                                                                          "echo Goodbye world!"))
                                                                                  .build());

        new DeploymentPlan(this,
                           "DemoDeploymentPlan",
                           DeploymentPlanProps.builder()
                                              .definition(helloWorldJob.next(goodbyeWorldJob))
                                              .build());


    }
}
