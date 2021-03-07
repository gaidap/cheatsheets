// Copied from Stephen Grinder (Udemy Teacher)
// Plugin to intercept and override part of esbuild bundling process to prevent access to file system for loading resources.
import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
 
export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      // intercept bundling process by register to an event listener
      // and hook into the resolve process.
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResolve', args);
        if(args.path === 'index.js') {
            return { path: args.path, namespace: 'a' };
        } 

        const isSubPath = args.path.includes('./');
        const isSuperPath = args.path.includes('../');
        if (isSubPath || isSuperPath) {
          return {
            namespace: 'a',
            path: new URL(args.path, args.importer + '/').href // final forward slash is important to get correct relative path to importer
          };
        }
        
        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`
        };
      });
 
      // Hook into the loading process while bundling
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);
 
        // Beware, hardcoded imaginary files below.
        if (args.path === 'index.js') {
          // if esbuild get instruction to look up for something called index.js return stuff below.
          return {
            loader: 'jsx',
            contents: `
              const message =  require('nested-test-pkg');
              console.log(message);
            `,
          };
        }
        // forward url from intercepted resolve to unpkg.com with help of axios
        const {data, request} = await axios.get(args.path);
        console.log(request);
        return {
          loader: 'jsx',
          contents: data
        };
      });
    },
  };
};