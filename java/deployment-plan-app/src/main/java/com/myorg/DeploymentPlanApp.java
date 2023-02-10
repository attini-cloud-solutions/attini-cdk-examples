package com.myorg;

import software.amazon.awscdk.App;
import software.amazon.awscdk.StackProps;
import software.amazon.awscdk.StageSynthesisOptions;

public class DeploymentPlanApp {
    public static void main(final String[] args) {
        App app = new App();

        new DeploymentPlanAppStack(app, "DeploymentPlan", StackProps.builder()
                                                                    .build());

        app.synth();
    }
}

