const yargs = require('yargs');
const utils = require('./utils');


yargs.command({
    command: 'add',
    describe: ': add a new note',
    builder: {
        'title': {
            describe: 'title of the note',
            type: 'string',
            demandOption: true,
        },
        'body': {
            describe: 'body of the note',
            type: 'string',
            demandOption: true,
        }
    },
    handler: (argv) => {
        utils.addNote(argv.title.trim(), argv.body.trim());
    }
});

yargs.command({
    command: 'remove',
    describe: ': remove a note',
    builder: {
        'title': {
            describe: 'title of the note to remove',
            type: 'string',
            demandOption: true
        }
    },
    handler: (argv) => {
        utils.removeNote(argv.title.trim());
    }
});

yargs.command({
    command: 'list',
    describe: ': list all nodes',
    handler: () => {
        utils.listNotes();
    }
});

yargs.command({
    command: 'get',
    describe: ': get a particular note',
    builder: {
        'title': {
            describe: 'title of the note',
            type: 'string',
            demandOption: true
        }
    },
    handler: (argv) => {
        utils.getNote(argv.title.trim());
    }
})

yargs.parse()