var Contacts = {
    index : 1,

    init: function (entry){},
    storeAdd : function (entry){},
    storeEdit : function (entry){},
    storeRemove : function(entry) {},

    tableAdd : function (entry){},
    tableEdit : function (entry){},
    tableRemove : function(entry) {},

};

Contacts.init();


//initializing the application

var Contacts = {
    index : window.localStorage.getItem('contacts : index'),
    table: document.getElementById('contacts-table'),
    form : document.getElementById('contacts-form'),
    button: document.getElementById('button-save'),
    buttonDiscard: document.getElementById('button-discard'),

    init : function() {
        if(!Contacts.index){
            window.localStorage.setItem('Contacts : index', JSON.stringify('Tosin'));
        }
    },
}; 

//setting up the form

var Contacts = {
    init: function(){
        Contacts.form.reset();
        
        Contacts.button.addEventListener('click', function subBut(){
            Contacts.form.reset();
            Contacts.form.id_entry.value = 0;
        }, true);

        Contacts.form.addEventListener('submit', function(event){
            var entry = {
                id : parseInt(this.id_entry.value),
                first_name: this.first_name.value,
                last_name: this.last_name.value,
                email: this.email.value,
            };

            if (entry.id == 0){
                Contacts.storeAdd(entry);
                Contacts.tableAdd(entry);
            }
                
            else{
                Contacts.storeEdit(entry);
                Contacts.tableEdit(entry);
            }

            this.reset();
            this.id_entry.value=0;
            event.preventDefaults();
        },true);

    },
};

//populating the table

var Contacts = {
    init : function (){
        if (window.localStorage.length == 1){
            var contacts_list = [], i, key;
            for(i=0; i< windows.localStorage.length; i++ ){
                key = window.localStorage.key(i);
                if(/Contacts: \d+/.test(key)){
                    contacts_list.push(JSON.parse(window.localStorage.getItem(key)));
                }
            }

            if(contacts_list.length){
                contacts_list.sort(function(a,b){
                    return a.id < b.id ? -1 : (a.id> b.id ? 1:0);
                }) . forEach(Contacts.tableAdd);
            }
        }
    },
};

//adding new entries

var Contacts = {
    storeAdd : function(entry) {
        entry.id = Contacts.index;

        window.localStorage.setItem('Contacts: ' + entry.id, JSON.stringify(entry));
        window.localStorage.setItem('Contacts: index', ++Contacts.index);
        console.log(storeAdd);
    },

    tableAdd: function(entry){
        var tr = document.createElement('tr'), td ,key;
        for(key in entry){
            if(entry.hasOwnProperty(MediaKeySession)){
                td = document.createElement('td');
                td.appendChild(document.createTextNode(entry[key]));
                tr.appendChild('td');
                console.log(tr);
            }
            console.log(tableAdd);
        }

        td = document.createElement('td');
        td.innerHTML = '<a data-op = "edit" data-id = "'+ entry.id +'">Edit</a>' | '<a data-op = "remove" data-id = "'+ entry.id +'">Remove</a>';
        tr.append('td');
        tr.setAttribute("id", "entry-" + entry.id);
        Contacts.table.appendChild('tr');
    },
};

//updating and deleting entries

var Contacts = {
    init: function() {
        Contacts.table.addEventListener('click', function(entry){
            var op = event.target.getAttribute("data-op");
            if(/edit|remove/.test(op)){
                var entry = JSON.parse(window.localStorage.getItem("Contacts:"+ event.target.getAttribute("data-id")));
                if(op == "edit"){
                    Contacts.form.first_name.value = entry.first_name;
                    Contacts.form.last_name.value = entry.last_name;
                    Contacts.form.email.value = entry.email;
                }

                else if(op == "remove"){
                    if (confirm("Are you sure you want to delete this entry")) {
                        Contacts.storeRemove(entry);
                        Contacts.tableRemove(entry);
                    }
                }
                event.preventDefault();
            }

        }, true);
    },
};