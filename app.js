const yargs = require("yargs");
const { simpanContact, listContact, detailContact, deleteContact} = require("./data/contacts");

// Menambahkan data pada contact
yargs.command ({
    command: 'add',
    describe: 'Menambahkan Contact Baru',
    builder : {
    username : {
        describe: 'input username',
        demandOption: true,
        type: 'string',
    },
    password: {
        describe: 'input password',
        demandOption: false,
        type: 'string',
    },
    email : {
        describe: 'input email',
        demandOption: true,
        type: 'string',
    }, 
 },
 
    handler(argv) {
       simpanContact(argv.username, argv.password, argv.email)
    }
}).demandCommand()


// Menampilkan daftar semua nama contact
yargs.command({
    command: 'list',
    describe: 'Menambahkan semua nama dan no HP',
    handler() {
        listContact();
    }
})


//menampilkan detail sebuah  contact
yargs.command ({
    command: 'detail',
    describe : 'Menampilkan detail sebuah contact',
    builder: {
        username: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        detailContact(argv.username)
    }
})


// Menghapus contact berdasarkan nama
yargs.command ({
    command: 'delete',
    describe : 'Menghapus nama pada contact',
    builder: {
        username: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        deleteContact(argv.username)
    }
})

yargs.parse();
