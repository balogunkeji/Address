// contact class
class Contact {
     constructor(fname,lname,pnumber,email,family){
     this.fname = fname;
     this.lname = lname;
     this.pnumber = pnumber;
     this.email = email;
     this.family = family;
     }
}

//UI class

class UI {
    static displayContacts() {
        const contact = Store.getContacts();


        contact.forEach((contact) => UI.addContactToList(contact));
    }



    static addContactToList(contact) {

        const List = document.querySelector('#contact-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${contact.fname}</td>
        <td>${contact.lname}</td>
        <td>${contact.pnumber}</td>
        <td>${contact.email}</td>
        <td>${contact.family}</td>
        <td><a href="#" class="btn btn-danger btn-small delete">X</a></td> `;

        List.appendChild(row);
        

    }

    static deleteList(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }

        console.log(el);
    }

    static clearFields () {
     document.querySelector('#firstname').value = '';
     document.querySelector('#lastname').value ='';
     document.querySelector('#number').value = '';
     document.querySelector('#email').value = '';
     document.querySelector('#family').value = '';
    }


    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#list-form');
        container.insertBefore(div,form);


        setTimeout(() => document.querySelector('.alert').remove(),3000);
    }
    
}


// Stored class : local storage

class Store {

   static getContacts() {
    let contacts;
    if(localStorage.getItem('contacts') === null){
        contacts = [];
    }else {
        contacts = JSON.parse(localStorage.getItem('contacts'));
    }

    return contacts;

    }

    static addContact(contact){

        const contacts = Store.getContacts();
        contacts.push(contact);
        localStorage.setItem('contacts', JSON.stringify(contacts));


}


static removeContact(fname){
    const contacts = Store.getContacts() ;

    contacts.forEach((contact, index) => {
        if(contact.fname === fname){
            contacts.splice(index,1);
        }
    });

    localStorage.setItem('contacts', JSON.stringify(contacts));

}

}



//Event: display Books

document.addEventListener('DOMContentLoaded', UI.displayContacts);


//event: Add Lists

document.querySelector('#list-form').addEventListener('submit', (e) => {

    e.preventDefault();
    //Get form Values

    const fname = document.querySelector('#firstname').value;
    const lname= document.querySelector('#lastname').value;
    const pnumber = document.querySelector('#number').value;
    const email = document.querySelector('#email').value;
    const family = document.querySelector('#family').value;


    //validate

    if(fname === '' || lname === '' || pnumber === '' || email === '' || family === ''){
        UI.showAlert('Please fill in all fields', 'danger');
    } else{
        UI.showAlert('Contact Added', 'success');
    }
    

    // instantiate list

    const contact = new Contact(fname,lname, pnumber, email, family );

    // console.log(contact);

    // Add contact to UI

    UI.addContactToList(contact);

   // add contact to store

   Store.addContact(contact);

    //clearfields
    UI.clearFields();
});


//Events: Removelist

document.querySelector('#contact-list').addEventListener('click', (e) => {
    UI.deleteList(e.target);
    console.log(e);

Store.removeContact(e.target.parentElement.previousElementSibling.textContent);


    UI.showAlert('Contact Removed', 'success');


});
