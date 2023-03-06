package attini.example;

import software.amazon.awscdk.App;
import software.amazon.awscdk.StackProps;

public class DemoApp {

    // Attini will place the stack output in the payload with the
    // stack id as the key. By making the stack id public the deployment plan can access it
    // when reading the output.
    public static final String STACK_ID = "AttiniJavaDemoStack";

    public static void main(final String[] args) {
        App app = new App();
        new DemoStack(app, STACK_ID, StackProps.builder().build());
        app.synth();
    }
}

