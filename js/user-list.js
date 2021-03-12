const db = firebase.firestore();
const userList = document.getElementById("user-list");

init();

function init() {
  db.collection("Users")
    .orderBy("firstName")
    .onSnapshot(function (querySnapshot) {
        let output = "";

        querySnapshot.forEach((doc) => {
            const user = doc.data();
            output = `
                    <div class="l-user flex">
                        <div class="u-picture">IMG</div>
                        <div class="u-name">${user.firstName} ${user.lastName}</div>
                        <div class="u-email">${user.email}</div>
                        <div class="u-phone">${user.phone}</div>
                        <div class="u-address">${user.address}</div>
                    </div>`;
      });

      userList.innerHTML = output;
    });
}

/*
function getUsers() {
    db.collection("Users").orderBy("firstName").get().then(
        function (querySnapshot) {
            let output = "";

            querySnapshot.forEach((doc) => {
                const user = doc.data();
                output = `
                    <div class="l-user flex">
                        <div class="u-picture">IMG</div>
                        <div class="u-name">${user.firstName} ${user.lastName}</div>
                        <div class="u-email">${user.email}</div>
                        <div class="u-phone">${user.phone}</div>
                        <div class="u-address">${user.address}</div>
                    </div>`;
            });
            
            userList.innerHTML = output;
        }
    )
}
*/