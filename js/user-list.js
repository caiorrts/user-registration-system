const db         = firebase.firestore();
const storage    = firebase.storage();
const storageRef = storage.ref();

const userList = document.getElementById("user-list");
let userDel = "";
let imgDel  = "";

init();

function init() {
  db.collection("Users")
    .orderBy("firstName")
    .onSnapshot(function (querySnapshot) {
        let output = "";

        querySnapshot.forEach((doc) => {
            const user = doc.data();
            output += `
                    <div class="l-user flex flex-ai-c" id="${user.id}" >
                        <div class="u-picture" style="background-image:url('${user.imgURL}');"></div>
                        <div class="u-name">${user.firstName} ${user.lastName}</div>
                        <div class="u-email">${user.email}</div>
                        <div class="u-phone">${user.phone}</div>
                        <div class="u-address">${user.address}</div>
                        <div class="u-actions">
                            <button id="${user.id}" onClick="reply_click(this.id)">X</button>
                        </div>
                    </div>`;
      });

      userList.innerHTML = output;
    });
}

function reply_click(clicked_id) {
    
    db.collection("Users")
    .onSnapshot(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
            const user = doc.data();
            
            if (clicked_id == user.id) {
                // var str = 'one:two;three';    
                // str.split(':').pop().split(';')[0]; // returns 'two'
                imgDel = user.imgURL.split('%2F').pop().split('?')[0];
                userDel = clicked_id;
                userDelete(userDel, imgDel);
                console.log("imgDel: ", imgDel)
            }
      });
    });
}

function userDelete(id, img){
    console.log("img: ", img)
    db.collection("Users").doc(id).delete().then(function() {
        console.log("User deleted: ", id);
        
        storageRef.child('images/'+ img).delete().then(function() {
            console.log("Image deleted: ", img);
        })
        .catch((error) => console.log("Error deleting image: ", img, " - ", error));
    })
    .catch((error) => console.log("Error deleting user: ", id, " - ", error));
    
}