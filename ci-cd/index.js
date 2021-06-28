/* eslint-disable */
require('dotenv').config();

const azdev = require('azure-devops-node-api');
const {
  PullRequestStatus,
} = require('azure-devops-node-api/interfaces/GitInterfaces');
const AzureAPIKey = process.env.AZURE_API_KEY;
const fs = require('fs');

if (!AzureAPIKey) {
  console.warn(
    'Could not run script because AzureAPIKey was not passed into program.',
  );
  process.exit();
}

// your collection url
const orgUrl = 'https://dev.azure.com/caitfs3';

// let token: string = "process.env.AZURE_PERSONAL_ACCESS_TOKE"N; // e.g "cbdeb34vzyuk5l4gxc4qfczn3lko3avfkfqyb47etahq6axpcqha";
const token = AzureAPIKey;

const authHandler = azdev.getPersonalAccessTokenHandler(token);
const connection = new azdev.WebApi(orgUrl, authHandler);
const inputBuildID = process.argv[2];

if (!inputBuildID) {
  console.warn(
    'Could not run script because BuildID was not passed into program.',
  );
  process.exit();
}

connection
  .connect()
  .then(async () => {
    // Get the build object based on the passed in buildID
    const gitAPI = await connection.getGitApi();
    const buildAPI = await connection.getBuildApi();
    const response = await buildAPI.getBuild('CharaChorder', inputBuildID);
    const ciMessage = response?.triggerInfo?.['ci.message'];

    // Get the ID of the PR that the build is associated to
    const prRegex = /Merged PR (\d*):/gm;
    const prID = prRegex.exec(ciMessage)?.[1];

    if (!prID) {
      console.warn(
        'Could not find PR that is associated with this build. Exiting...',
      );
      process.exit();
    }

    // Find the ID of the launchpad repository
    const allRepos = await gitAPI.getRepositories('CharaChorder');
    const { id: repoID } = allRepos.find((r) => r.name === 'Launchpad');

    const codeCoverage = await getCodeCoverage();

    // Create a comment on the associated PR with a link to the site.
    await gitAPI.createThread(
      {
        comments: [
          {
            content: `###**[BUILD BOT]:**\n\nThe site has been built and deployed at: https://proud-island-036737910.azurestaticapps.net${
              !!codeCoverage ? `\n\nCode Coverage: ${codeCoverage}` : ''
            }`,
          },
        ],
      },
      repoID,
      prID,
    );
  })
  .catch((err) => {
    console.error(err);
  });

const getCodeCoverage = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('test_run_output.txt', 'utf8', (err, data) => {
      if (!err) {
        const regex = /Code coverage: (\d*?\.\d*? %)/gm;
        const match = regex.exec(data);
        if (match) {
          resolve(match[1]);
        } else {
          reject();
        }
      } else {
        reject();
      }
    });
  });
};
