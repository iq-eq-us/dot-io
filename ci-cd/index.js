/* eslint-disable */
const azdev = require('azure-devops-node-api');
const {
  PullRequestStatus,
} = require('azure-devops-node-api/interfaces/GitInterfaces');
const { AzureAPIKey } = require('./.env.js');

// your collection url
let orgUrl = 'https://dev.azure.com/caitfs3';

// let token: string = "process.env.AZURE_PERSONAL_ACCESS_TOKE"N; // e.g "cbdeb34vzyuk5l4gxc4qfczn3lko3avfkfqyb47etahq6axpcqha";
let token = AzureAPIKey;

// Right now this script isn't in working order
// So I added a return so the script does nothing but load the API key
// I want to make this add a comment to a pull request with the URL where the site is deployed
// This way we can have preview urls or something akin to it
return;

let authHandler = azdev.getPersonalAccessTokenHandler(token);
let connection = new azdev.WebApi(orgUrl, authHandler);

connection
  .connect()
  .then(async () => {
    const gitAPI = await connection.getGitApi();
    const pipelinesAPI = await connection.getBuildApi();
    const builds = await pipelinesAPI.getBuilds('CharaChorder');
    const developBuilds = builds.filter(
      (b) => b?.requestedFor?.displayName === 'Liam McMains',
    );
    const mostRecentDevelopBuild = developBuilds.sort(
      (a, b) => Date.parse(b) - Date.parse(a),
    )[0];

    if (mostRecentDevelopBuild) {
      const sourceSha = mostRecentDevelopBuild?.triggerInfo?.['ci.sourceSha'];

      const allRepos = await gitAPI.getRepositories('CharaChorder');
      const { id } = allRepos.find((r) => r.name === 'Launchpad');

      const pullRequests = await gitAPI.getPullRequests(id, {
        status: PullRequestStatus.All,
      });
      const pullRequestCorrespondingToBuild = pullRequests.filter(
        (pr) => pr?.lastMergeCommit?.commitId === sourceSha,
      )?.[0];

      // await gitAPI.createThread(
      //   {
      //     comments: [
      //       {
      //         content:
      //           '[BOT]: The site has been built and deployed at: https://proud-island-036737910.azurestaticapps.net/#/',
      //       },
      //     ],
      //   },
      //   id,
      //   pullRequestCorrespondingToBuild.pullRequestId,
      // );
    }
  })
  .catch((err) => {
    console.error(err);
  });
