const db = firebase.firestore();
const regName  = document.getElementById("reg-name");
const regEmail = document.getElementById("reg-email");
const regPwd   = document.getElementById("reg-password");
const regSub   = document.getElementById("reg-submit");

regSub.addEventListener("click", (event) => {
    event.preventDefault();

    console.log(regEmail.value, " - ", regPwd.value)

   firebase.auth()
   .createUserWithEmailAndPassword(regEmail.value, regPwd.value)
   .then(function (data) {
        const user = firebase.auth().currentUser;
        addRegUser(user.uid, regName.value);
        console.log("Data: ", data);
   })
   .catch(err => console.log("Error: ", err));
});

function addRegUser(userId, name) {
    db.collection("RegUsers").doc(userId).set({
        name,
        userId,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(function() {
        window.location.replace("/index.html");
    })
    .catch((err) => console.log("Error: ", err));
}