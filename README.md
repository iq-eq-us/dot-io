# Introduction

Dot I/O is a free, open source, web based training tool designed to forever change the way we learn to type.

Instead of measuring digital literacy with a single, all encompassing metric (words per minute), Dot I/O will measure your progress via six multivariate metrics: (tWPM, sWPM, ChM, CPM, StM, CM). These complementary metrics are designed to allow you to calibrate and track progress in a way that is meaningful to your specific goals, and to help you build a custom HCI profile that's just as unique as you are. With Dot I/O, you're more than just a number :crashWave: 
dot i/o is a testing/training tool for Keyboard users. It allows these users to practicing their typing, trigrams, and chording.

Dot I/O features some cutting-edge capabilities especially designed for the next generation of intelligent peripherals. Dot I/O is the first ever training tool with the ability to utilize the CCOS Serial API to establish a direct connection to your device while you practice. This means custom tailored practice sessions can be automatically generated from your embedded memory & history, that your custom constituent chord inputs can be highlighted on a virtual device in real-time, and that you can access advanced configuration options for your device directly inside of the web interface. That's just what is already available, and only scratches the surface of what will be possible.

# How to Support

NOTICE: You need to sign your commits or your PR will be blocked. See [this article](https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification#gpg-commit-signature-verification) for the steps.

In general, we follow the "fork-and-pull" Git workflow.


 1. **Fork** the repo on GitHub
 2. **Clone** the project to your own machine
 3. **Commit** changes to your own branch
 4. **Push** your work back up to your fork
 5. Submit a **Pull request** so that we can review your changes. In this request please put in a summary of the changes. (all pull requests will be reviewed every Friday)

NOTE: Be sure to merge the latest from "upstream" before making a pull request!

To join our active discord please click here: https://discord.gg/rWBuHeR9yU. To get the Developer Role within the discord please ping '@iq-eq Rep'


# Dependency Installation

After you have successfully downloaded the source code for the Launchpad project, navigate to the root directory in your preferred terminal application. I prefer to use the integrated terminal inside of VSCode, the recommended IDE for working with this project. Once there, run the `npm install` command to install all of the required dependencies for Launchpad to run. The output should look something similar to this:

```bash
$ npm install

> postinstall
> cd ci-cd && npm install


up to date, audited 14 packages in 1s

6 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

up to date, audited 1222 packages in 4s

123 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

As long as there are no error messages present, you can assume the previous step was successful.

# Running Locally

To run the project locally on your development machine, navigate back to the root directory of the project, and run the `npm start` command. This will execute the `start` script located in the [package.json]file in your root directory. This will in turn execute `snowpack dev`, snowpack being the frontend build tool that bundles and serves your project.

If successful, you should see something similar to the following output:

```
$ npm start

> start
> snowpack dev

[11:42:12] [snowpack] Ready!
[11:42:12] [snowpack] Server started in 60ms.
[11:42:12] [snowpack] Local: http://localhost:8080
[11:42:12] [snowpack] Network: http://192.168.1.155:8080
[11:42:12] [@snowpack/plugin-typescript] 10:41:12 AM - Starting compilation in watch mode...

⠸ watching for file changes...
```

Snowpack will automatically open the local development version of the site in your preferred browser. However, if Launchpad is not opened automatically, the site can also be found at the url posted in your terminal by snowpack, most likely http://localhost:8080.

Anytime you update a file in your IDE or text editor, snowpack will pick up on your change and update the site automatically, through a feature called "Hot Reload." However, Hot Reload can be finicky at times, so it can be worth doing a manual refresh of the browser if the site is not behaving like you expect.

# Next Steps

For more information, see the articles on architecture, testing, and deployment 
