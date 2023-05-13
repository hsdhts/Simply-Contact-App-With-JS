const fs = require('fs');
const validator = require('validator');

// Membuat folder data untuk menampung data contact
const dirPath = './data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath)
}

//Membuat file didalam folder data sebagai contact.json
const filePath = './data/contacts.json';
if(!fs.existsSync(filePath)){
    fs.writeFileSync(filePath,'[]', 'utf-8');
}

const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf8');
    const contacts = JSON.parse(file)
    return contacts;
}

    const simpanContact = (username,password,email) => {
    const contact = {username, password,email}
    const contacts = loadContact () ;
        
    //Cek agar nama tidak duplikat
    const duplikat = contacts.find((contact) => contact.username === username);
    if(duplikat) {
        console.log('Nama sudah digunakan, silahkan gunakan nama lain!')
        return false;
    }

    // Cek validator email
    if(email){
        if(!validator.isEmail(email)) {
            console.log('Email sudah digunakan, silahkan gunakan nama lain!')
            return false;
        }
    }

    contacts.push(contact);
    fs.writeFileSync('data/contacts.json',  JSON.stringify(contacts));
    
console.log('Input data is Success')
}

// Mengetahui list data contact
const listContact = () => {
    const contacts = loadContact();
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.username} - ${contact.password}`);
    })
}

// Menelusuri detail Contact
function detailContact(username) {
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.username === username);
    if (contact) {
      console.log(contact);
    } else {
      console.log(`Contact dengan nama ${username} tidak ditemukan`);
    }
}

// Menghapus Contact
const deleteContact = (username) => {
    const contacts = loadContact();
    const newContacts = contacts.filter((contact) => contact.username.toLowerCase() !== username.toLowerCase());
 
    if(contacts.length === newContacts.length) {
        console.log(`${username} tidak ditemukan`);
        return false;
    }
 
    fs.writeFileSync('data/contacts.json',  JSON.stringify(newContacts));
    
    console.log(`${username} berhasil dihapus`);
}

module.exports = {simpanContact, listContact, detailContact, deleteContact};

