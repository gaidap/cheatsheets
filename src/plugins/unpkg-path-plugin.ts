// Plugin to intercept and override part of esbuild bundling process to prevent access to file system for loading resources.
import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'filecache'
});

export const unpkgPathPlugin = (userInput: string) => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      // Handle root entry file of 'index.js'
      build.onResolve({filter: /(^index\.js$)/}, () => {
        return { path: 'index.js', namespace: 'a' };
      });

      // Handle modules with relative paths
      build.onResolve({filter: /^\.+\//}, (args: any) => {
        return {
          namespace: 'a',
          // final forward slash is important to get correct relative path to importer
          path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href 
        };
      });

      // Handle modules main file
      build.onResolve({ filter: /.*/ }, async (args: any) => {      
        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`
        };
      });
 
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: userInput,
          };
        }

        const cacheHit = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
        if (cacheHit) {
          return cacheHit;
        }
        const {data, request} = await axios.get(args.path);     
        const result: esbuild.OnLoadResult | null = {
          loader: 'jsx',
          contents: data,
          // extract base dir for imported file, e.g. http://.../test-pkg/src/index.js -> /test-pkg/src
          resolveDir: new URL('./', request.responseURL).pathname  
        };
        await fileCache.setItem(args.path, result);
        return result;
      });
    },
  };
};