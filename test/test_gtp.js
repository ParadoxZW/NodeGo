const { StreamController, Controller, Command, Response } = require('@sabaki/gtp')

async function main() {
    let fp = 'C:\\Users\\surface\\Desktop\\leela-zero-0.17-cpuonly-win64\\';
    let leela = new Controller('C:\\Users\\surface\\Desktop\\leela-zero-0.17-cpuonly-win64\\leelaz.exe', ['--gtp', '--noponder', '--p=100'])
    leela.start()
    //   console.log(leela);

    let response = null

    try {
        response = await leela.sendCommand({ name: 'genmove', args: ['B'] })
    } catch (err) {
        console.log(err);
        throw new Error('Failed to send command!')
    }

    if (response.error) {
        throw new Error('Command not understood by Leela!')
    }

    console.log(response.content)
    await leela.stop()
}

main().catch(err => console.log(`Error: ${err}`))