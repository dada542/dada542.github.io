function $(arg) {
    return document.querySelector(arg);
}

Object.defineProperties(HTMLElement.prototype,{
    "show":{
        value:function(value="block") {
            this.style.display=value;
        }
    },
    "hide":{
        value:function() {
            this.style.display="none";
        }
    }
});

const firebaseConfig = {
    apiKey: "AIzaSyA-dTIO-_YOoW726FzSkLAQXUv-hF5wqsQ",
    authDomain: "project-only-database.firebaseapp.com",
    databaseURL: "https://project-only-database.firebaseio.com",
    projectId: "project-only-database",
    storageBucket: "project-only-database.appspot.com",
    messagingSenderId: "183785967723",
    appId: "1:183785967723:web:8aec3d87a4110c37faa12e",
    measurementId: "G-5D90CE8657"
};
firebase.initializeApp(firebaseConfig);

const database=firebase.database();
const messagesRef=database.ref("messages");
const usersRef=database.ref("users");

let name;

addEventListener("DOMContentLoaded",init);

function init() {

    $(".main").hide();
    $(".name-alert").hide();
    closeUserList();

    addEventListener("click",e=> {
        if(!$(".user-list").classList.contains("user-list_hidden")&&!$(".user-list").contains(e.target)) {
            closeUserList();
        } else if($("#userBtn").contains(e.target)) {
            openUserList();
        }
    });

    $("#sendBtn").addEventListener("click",sendMessage);
    $("#joinBtn").addEventListener("click",joinChat);
    addEventListener("keydown",e=> {
      if(name&&e.which==13) {
        sendMessage();
      }
    });

    usersRef.on("value",updateUserList);
    messagesRef.on("value",updateMessages);

    function closeUserList() {
        $(".user-list").classList.add("user-list_hidden");
    }
    function openUserList() {
        $(".user-list").classList.remove("user-list_hidden");
    }

    function sendMessage() {
        const content=$("#messageInput").value;
        if(content=="") return;
        messagesRef.push({
          content:content,
          name:name,
          timestamp:firebase.database.ServerValue.TIMESTAMP
        }).then(()=> {
          $("#messageInput").value="";
        });
    }

    function joinChat() {
      name=$("#nameInput").value;
      if(name.length<3||name.length>10) {
        $(".name-alert").innerText="Name must have 3 - 10 characters!";
        $(".name-alert").show();
      } else if(name.match(/[^a-zA-Z]/)) {
        $(".name-alert").innerText="Name may contain only letters!";
        $(".name-alert").show();
      } else {
        const key=usersRef.push(name).key;
        usersRef.child(key).onDisconnect().remove();
        $(".login").hide();
        $(".main").show();
        if($(".main").requestFullscreen) {
          $(".main").requestFullscreen();
        } else if ($(".main").mozRequestFullScreen) { /* Firefox */
          $(".main").mozRequestFullScreen();
        } else if ($(".main").webkitRequestFullscreen) { /* Chrome, Safari and Opera */
          $(".main").webkitRequestFullscreen();
        }
      }
    }

    function updateUserList(snap) {
      const users=snap.val();
      if(!users) return;
      const userList=Object.values(users).map(name=>`<li>${name}</ul>`);
      $("#userList").innerHTML=userList.join("");
    }

    function updateMessages(snap) {
      const data=snap.val();
      if(!data) return;
      const messages=Object.keys(data).map(key=>`<div class="message ${data[key].name==name?"message_mine":"message_casual"}">
          <b>${data[key].name}</b>
          <small>${new Date(data[key].timestamp).toLocaleTimeString("en-US")}</small>
          <p>${data[key].content.replace(/</g,"&lt;").replace(/>/g,"&gt;")}</p>
      </div>`);
      $(".message-container").innerHTML=messages.reverse().join("");
    }
}
