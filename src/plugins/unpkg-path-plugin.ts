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
        } else if (args.path === 'tiny-test-pkg') { 
          return { path: 'https://unpkg.com/tiny-test-pkg@1.0.0/index.js', namespace: 'a' };
        }
      });
 
      // Hook into the loading process while bundling, with very simple example.
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);
 
        // Beware, hardcoded imaginary files below.
        if (args.path === 'index.js') {
          // if esbuild get instruction to look up for something called index.js return stuff below.
          return {
            loader: 'jsx',
            contents: `
              const message =  require('tiny-test-pkg');
              console.log(message);
            `,
          };
        }
        // forward url from intercepted resolve to unpkg.com with help of axios
        const {data} = await axios.get(args.path);
        return {
          loader: 'jsx',
          contents: data
        };
      });
    },
  };
};