// Copied from Stephen Grinder (Udemy Teacher)
// Plugin to intercept and override part of esbuild bundling process to prevent access to file system for loading resources.
import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'filecache'
});

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
            // final forward slash is important to get correct relative path to importer
            path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href 
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
        // Beware, hardcoded imaginary file below. For testing purposes. Will be cleaned up soon.
        if (args.path === 'index.js') {
          // if esbuild get instruction to look up for something called index.js return stuff below.
          return {
            loader: 'jsx',
            contents: `
              import React from 'react@16.0.0';
              console.log(React);
            `,
          };
        }

        // Check first if we already fetched the file and if it is in the cache
        const cacheHit = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
      
        // If cached -> return it immediately
        if (cacheHit) {
          return cacheHit;
        }

        // forward url from intercepted resolve to unpkg.com with help of axios
        const {data, request} = await axios.get(args.path);     
        const result: esbuild.OnLoadResult | null = {
          loader: 'jsx',
          contents: data,
          // extract base dir for imported file, e.g. http://.../test-pkg/src/index.js -> /test-pkg/src
          resolveDir: new URL('./', request.responseURL).pathname  
        };

        // store response in cache to minimize requests
        await fileCache.setItem(args.path, result);
        return result;
      });
    },
  };
};