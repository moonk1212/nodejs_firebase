
var firebaseConfig = {
  apiKey: "",
  authDomain: "test1-5127e.firebaseapp.com",
  databaseURL: "https://test1-5127e.firebaseio.com",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


$(document).ready(function ($) {
  firebase.auth().onAuthStateChanged(function (user) {
    var cu = window.location.href;
    var n1 = cu.indexOf('auth/login');
    if (user) {
      if (n1 > 1) {
        window.open('../../', '_self', false);

      }
      else {
        console.log(user);
        $("#lblemail").text(user.email);
      }
    } else {
      if (n1 < 1) {
        window.open('./auth/login/', '_self', false);
      }
    }

  });
});
function logout() {
  firebase.auth().signOut().then(function () {

  }, function (error) {
    //Do nothing
  });

}
function signup() {
  firebase.auth().createUserWithEmailAndPassword($("#txtemail").val(), $("#txtpasswd").val()).then(function (user) {

  }).catch(function (error) { // Handle Errors here. 
    var errorCode = error.code;
    var errorMessage = error.message;
    //  swal("Oops!!", error.message, 'error'); 
    alert(error.message);
  });
  firebase.auth().signOut().then(function () {
  }, function (error) {
    //DO-NOTHING 
  });
}
function login() {
  firebase.auth().signInWithEmailAndPassword($("#txtemail").val(), $("#txtpasswd").val()).then(function (result) {
    //DO-NOTHING
  }).catch(function (error) {
    // Handle Errors here.
    // console.log('err',error); 
    var errorCode = error.code;
    alert(errorCode);
  });
}
function facebooklogin() {
  var user = firebase.auth().currentUser;
  if (user) {

  } else {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
      console.log("facebook connected");
    }).catch(function (error) {
      console.log(error);
    });
  }
}
function googlelogin() {
  var user = firebase.auth().currentUser;
  if (user) {
    // 
  } else {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/plus.login');
      firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      var user = result.user;
      console.log("connected");
    }).catch(function (error) {
      console.log('error', error);
    });
  }
}
