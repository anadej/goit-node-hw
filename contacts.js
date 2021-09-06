const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "/db/contact.json");

// TODO: задокументировать каждую функцию
const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    const res = JSON.parse(contacts);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const res = await listContacts();
    return res.filter((contact) => contact.id === contactId);
  } catch (error) {
    console.log(`error`, error);
  }
};

const removeContact = async (contactId) => {
  try {
    const res = await listContacts();
    const newArr = res.filter((contact) => contact.id != contactId);
    const newContacts = JSON.stringify(newArr);
    await fs.writeFile(contactsPath, newContacts);
  } catch (error) {
    console.log(`error`, error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const res = await listContacts();
    const newContact = { id: shortid.generate(), name, email, phone };
    const newContacts = JSON.stringify([...res, newContact]);
    await fs.writeFile(contactsPath, newContacts);
  } catch (error) {
    console.log(`error`, error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
