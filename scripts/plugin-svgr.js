import svgr from '@svgr/core';
import fs from 'fs';

export default (options = {}) => ({
  name: 'svgr',
  setup(build) {
    build.onLoad({ filter: /\.svg$/ }, async (args) => {
      const svg = await fs.promises.readFile(args.path, 'utf8');
      const contents = await svgr.default(
        svg,
        { ...options },
        { filePath: args.path },
      );
      return {
        contents: contents.replace(/import.*"react";/, ''),
        loader: 'jsx',
      };
    });
  },
});
