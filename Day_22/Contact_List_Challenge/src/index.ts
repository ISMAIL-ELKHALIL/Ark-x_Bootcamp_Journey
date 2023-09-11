import readline from "readline";

type contact = {
  name: string;
  number: number;
};

let contacts: Array<contact> = [];

//? Create the readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//! Add New Contact
function addNewContact() {
  let newContact: contact = {
    name: "",
    number: 0,
  };
  rl.question("What is your name : ", (name) => {
    newContact.name = name;

    rl.question("What is your number : ", (number) => {
      newContact.number = parseInt(number);

      contacts.push(newContact);
      console.log(contacts);
      startApp();
    });
  });
}
//! Show All Contacts
function showAllContacts() {
  if (contacts.length !== 0) {
    console.log(contacts, "\n");
    startApp();
  } else {
    console.log("Contact list is empty");
    startApp();
  }
}
//! Search For Contact
function searchForContact() {
  let foundContact: Array<any> = [];
  rl.question("Enter name or number to search for : \n", (searchedContact) => {
    foundContact = contacts.filter((contact) => {
      return (
        contact.name.toString().includes(searchedContact.toString()) ||
        contact.number.toString().includes(searchedContact.toString())
      );
    });
    if (foundContact.length !== 0) {
      console.log(`Found Contact \n`, foundContact);
    } else {
      console.log(`No Contact Found  \n`);
      startApp();
    }
  });
}

//! Get User Choice

function getUserChoice(choice: number) {
  switch (choice) {
    case 0:
      console.log("GoodBye"), rl.close();
      break;
    case 1:
      showAllContacts();
      break;
    case 2:
      addNewContact();
      break;
    case 3:
      searchForContact();
      break;
    default:
      console.log("Option not does not exit \n");
      startApp();
  }
}

function startApp() {
  rl.question(
    "Choose an Option \n (1) : showAllContacts \n (2) : addNewContact \n (3) : searchForContact \n (0) : exit \n",
    (option) => {
      getUserChoice(parseInt(option));
    }
  );
}

startApp();
