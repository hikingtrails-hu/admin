import { Command } from 'commander'
import { loadDataRequest, startWorker } from '~/worker/main'

export const run = async () => {
    const program = new Command()

    program.name('admin-cli').description('Hikingtrails HU admin CLI')

    program
        .command('worker:start')
        .description('Starts Pub/Sub worker')
        .action(async () => {
            await startWorker()
        })

    program
        .command('load')
        .description('Triggers a Data Load request')
        .action(async () => {
            await loadDataRequest()
        })

    await program.parseAsync()
}
