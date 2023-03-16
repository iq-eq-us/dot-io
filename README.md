# Introduction

dot i/o is a testing/training tool for Keyboard users. It allows these users to practing their typing, trigrams, and chording.


# Join Our Discord
To join our active discord please click the like below
https://discord.gg/rWBuHeR9yU

To get the Developer Role within the discord please ping @iq-eq Rep in the discord after you've completed an issue.




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
