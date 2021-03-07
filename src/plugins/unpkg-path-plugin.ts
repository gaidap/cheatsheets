// Copied from Stephen Grinder (Udemy Teacher)
// Plugin to intercept and override part of esbuild bundling process to prevent access to file system for loading resources.
import * as esbuild from 'esbuild-wasm';
 
export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      // intercept bundling process by register to an event listener
      // and hook into the resolve process.
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResolve', args);
        // add custom namespace to filter encapsulate imported code to prevent conflicts.
        return { path: args.path, namespace: 'a' };
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
              import message from './message';
              console.log(message);
            `,
          };
        } else {
          return {
            loader: 'jsx',
            contents: 'export default "hi there!"',
          };
        }
      });
    },
  };
};