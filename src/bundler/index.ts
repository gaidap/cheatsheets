import * as esbuild from 'esbuild-wasm';
import { fetchPkgPlugin } from './plugins/fetchpkg-plugin';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

let service: esbuild.Service;

const bundle = async (rawCode: string) => {
  // init esbuild service for bundling on demand
  if(!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  }
  
  try {
    const result = await service.build({
      define: { 'process.env.NODE_ENV': '"production"', global: 'window' },
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPkgPlugin(rawCode)],
      jsxFactory: '__React__.createElement',
      jsxFragment: '__React__.Fragment',
    });

    return {
      code:result.outputFiles[0].text, 
      error: ''
    };
  } catch (error) {
    return {
      code:'', 
      error: error.message
    }; 
  }
};

export default bundle;