import path from "path";
import { Command } from "commander";
import { serve } from 'local-api'

const isProduction = process.env.NODE_ENV === 'production'

export const serveCommand = new Command()
    .command('serve [filename]')
    .description('Open a file for editing')
    .option('-p, --port <number>', 'port to run server on', '4005')
    .action(async (filename = 'notebook.js', options: { port: string }) => {
        try {
            //console.log(path.join(process.cwd(), path.dirname(filename)))
            const dir = path.join(process.cwd(), path.dirname(filename))
            //console.log(path.basename(filename))
            await serve(parseInt(options.port), path.basename(filename), dir, !isProduction)
            console.log(`Opended ${filename}. Navigate to http://localhost:${options.port} to edit the file.`)
        } catch (err: any) {
            if (err.code === 'EADDRINUSE') {
                console.log('Port is in use. Try runnding on a different port.')
            } else {
                console.log(err.message)
            }
            process.exit(1)
        }
    })