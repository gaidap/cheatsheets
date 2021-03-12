import path from 'path';
import { Command, option } from 'commander';
import { serve } from 'local-api';

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Starts server and opens a file for editing. The filename is optional and defaults to notebook.js.')
  .option('-p, --port <number>', 'Port on which server is listening.', '4005')
  .action((filename = 'notebook.js', options: { port: string }) => {
    const dir = path.join(process.cwd(), path.dirname(filename));
    serve(parseInt(options.port), path.basename(filename), dir);
  });
