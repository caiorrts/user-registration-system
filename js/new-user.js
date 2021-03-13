const db = firebase.firestore();

const picture   = document.getElementById("picture");
const userForm  = document.getElementById("user-form");
const fName     = document.getElementById("f-name");
const lName     = document.getElementById("l-name");
const email     = document.getElementById("email");
const phone     = document.getElementById("phone");
const address   = document.getElementById("address");
const progress  = document.getElementById("progress");
const submit    = document.getElementById("submit");
const confUser  = document.getElementById("add-user");

let file = "";
let fileName = "";
let fileExt  = "";

picture.addEventListener("change", (e) => {
    file = e.target.files[0];
    fileName = file.name.split(".").shift();
    fileExt  = file.name.split(".").pop();
    //console.log(file)
});

userForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (fName.value && lName.value && email.value && fileName != "") {
        addUser(fName.value, lName.value, email.value, phone.value, address.value)
        fName.value = "";
        lName.value = "";
        email.value = "";
        phone.value = "";
        address.value = "";        
    } 
});

function addUser(firstName, lastName, email, phone, address) {

    if (fileName) {
        const id = db.collection("Images").doc().id;
        const storageRef = firebase.storage().ref(`images/${id}.${fileExt}`);
        const uploadTask = storageRef.put(file);
        uploadTask.on("state_changed", function(snapshot) {
            progress.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        function(error) {
            console.log(error)
        },
        function() {
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                db.collection("Users").doc(id).set({
                    firstName,
                    lastName,
                    email,
                    phone,
                    address, 
                    imgName: fileName,
                    id:id,
                    imgURL:downloadURL,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }).then(function() {
                    file = "";
                    fileName = "";
                    fileExt = "";
                    progress.value = 0;
                    userForm.reset();
                    confUser.style.display = "block";
                });
            });
        });
    }
}