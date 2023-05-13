import { Command } from 'commander'
import { startWorker } from '~/worker/main'

export const run = async () => {
    const program = new Command()

    program.name('admin-cli').description('Hikingtrails HU admin CLI')

    program
        .command('worker:start')
        .description('Starts Pub/Sub worker')
        .action(async () => {
            await startWorker()
        })

    await program.parseAsync()
}
