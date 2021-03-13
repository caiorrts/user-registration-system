const btnLogin  = document.getElementById("btn-login");
const logEmail  = document.getElementById("log-email");
const logPwd    = document.getElementById("log-pwd");

btnLogin.addEventListener("click", () => {

    firebase.auth().signInWithEmailAndPassword(logEmail.value, logPwd.value)
    .then((user) => {
        window.location.replace("/user-list.html");
        console.log("User Login: ", user);
    })
    .catch((error) => {
        window.location.replace("/index.html");
        console.log("Error: ", error);
    });
    
    // firebase.auth().onAuthStateChanged(function(user) {
    //     console.log(user);
    //     if (user) {
    //         //window.location.replace("/user-list.html");
    //     } else {
    //         console.log(user);
    //         //window.location.replace("/index.html");
    //     }
    // });
})