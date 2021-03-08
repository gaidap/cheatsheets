import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'filecache'
});

export const fetchPkgPlugin = (userInput: string) => {
return {
  name: 'fetchpkg-plugin',
  setup(build: esbuild.PluginBuild) {
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
  }
};
};