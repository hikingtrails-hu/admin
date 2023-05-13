import { Command } from 'commander'

export const run = async () => {
    const program = new Command()

    program.name('admin-cli').description('Hikingtrails HU admin CLI')

    program
        .command('worker:start')
        .description('Starts Pub/Sub worker')
        .action(() => {
            setInterval(() => console.log('Working...'), 10000)
        })

    program.parse()
}
