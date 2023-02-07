# attini-cdk-examples
Examples of how to build an Attini deployment plan using the AWS CDK. Each example
contains a CDK app project that can be synthesised in to a deployment plan template.
The project uses the custom [Attini constructs](https://github.com/attini-cloud-solutions/attini-cdk-constructs)
to create the Attini specific resources.


## Prerequisites
In order to run the examples you will need:

1. The [AWS CLI installed](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).
2. The Attini CLI Installed and the Attini framework onboarded in your AWS Account. See the [get started guide](https://attini.io/guides/get-started/).
3. The [AWS CDK installed](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html).


## Run the examples

To create a distribution from the examples and deploy it, run the "attini deploy run" command. For example:

```Bash
attini deploy run ./typescript
```

Alternatively, you can create a distribution that can be shared and deployed later. To do so,
run the "attini dist package" command. For example:

```Bash
attini dist package ./typescript
```

The distribution will be located in the attini_dist folder.
It can then be deployed by using the "attini deploy run" command. For example:

```Bash
attini deploy run ./typescript/attini_dist/typescript-cdk-demo.zip
```

The CDK is only required for packaging the distribution, not for deploying it. 
