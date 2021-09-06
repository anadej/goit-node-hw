const argv = require("yargs").argv;
const functions = require("./contacts");

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      functions.listContacts().then((data) => console.table(data));
      break;
    case "get":
      functions.getContactById(id).then((data) => console.table(data));
      break;
    case "add":
      functions.addContact(name, email, phone);
      break;
    case "remove":
      functions.removeContact(id);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
