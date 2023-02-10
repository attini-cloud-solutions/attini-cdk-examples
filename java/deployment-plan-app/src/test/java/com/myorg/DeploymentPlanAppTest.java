 package com.myorg;

 import java.util.Map;

 import org.junit.jupiter.api.Test;

 import software.amazon.awscdk.App;
 import software.amazon.awscdk.assertions.Template;
 public class DeploymentPlanAppTest {

     @Test
     public void testStack() {
         App app = new App();
         DeploymentPlanAppStack stack = new DeploymentPlanAppStack(app, "test");

         Template template = Template.fromStack(stack);

         template.hasResourceProperties("Attini::Deploy::DeploymentPlan", Map.of("DeploymentPlan", Map.of()));
     }
 }
