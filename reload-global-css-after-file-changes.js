const fs = require('fs');
const path = require('path');

module.exports = function watchappcssPlugin(snowpackConfig) {
  const appcssPath = path.join(snowpackConfig.root || process.cwd(), 'src/assets/global.css');

  return {
    name: '@rohfle/snowpack-plugin-watchappcss',
    onChange({ filePath }) {
      if (!filePath.endsWith("global.css"))
        this.markChanged(appcssPath);
    },
  };
};