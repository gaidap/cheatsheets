import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
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
    },
  };
};