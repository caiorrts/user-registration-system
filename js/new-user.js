const db = firebase.firestore();
const userForm  = document.getElementById("user-form");
const fName     = document.getElementById("f-name");
const lName     = document.getElementById("l-name");
const email     = document.getElementById("email");
const phone     = document.getElementById("phone");
const address   = document.getElementById("address");

userForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (fName.value && lName.value && email.value) {
        addUser(fName.value, lName.value, email.value, phone.value, address.value)
        fName.value = "";
        lName.value = "";
        email.value = "";
        phone.value = "";
        address.value = "";        
    } 
});

function addUser(firstName, lastName, email, phone, address) {
    db.collection("Users")
    .add({ firstName, lastName, email, phone, address, 
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(function(docRef) {
        console.log("User added successfully, ID: ", docRef.id);
    }).catch(function(error){
        console.log(error);
    });
}