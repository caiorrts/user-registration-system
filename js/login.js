const btnLogin  = document.getElementById("btn-login");
const logEmail  = document.getElementById("log-email");
const logPwd    = document.getElementById("log-pwd");

btnLogin.addEventListener("click", () => {

    firebase.auth().signInWithEmailAndPassword(logEmail.value, logPwd.value)
    .then((user) => {
        window.location.replace("https://caiorrts.github.io/user-registration-system/user-list.html");
        console.log("User Login: ", user);
    })
    .catch((error) => {
        window.location.replace("https://caiorrts.github.io/user-registration-system/");
        console.log("Error: ", error);
    });
})