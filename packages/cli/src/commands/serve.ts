import path from 'path';
import { Command, option } from 'commander';
import { serve } from 'local-api';

enum ServeErrors {
  EADDRINUSE = 'EADDRINUSE'
}

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Starts server and opens a file for editing. The filename is optional and defaults to notebook.js.')
  .option('-p, --port <number>', 'Port on which server is listening.', '4005')
  .action(async (filename = 'notebook.js', options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(parseInt(options.port), path.basename(filename), dir); 
      console.log(
        `Opened ${filename}. Please navigate to http://localhost:${options.port} use Cheatsheets.`
        );
    } catch (error) {
      if(error.code === ServeErrors.EADDRINUSE) {
        console.error('Port is in use. Try running on a different port.');
      } else{
        console.error('There was an unexpected problem: ', error.message);
      }
      process.exit(1);
    }
  });
