function newpost() {
    var user = firebase.auth().currentUser;
    if (user) {
        var d = new Date();
        var newPostKey = firebase.database().ref().child("post/").push().key;
        firebase.database().ref("post/" + newPostKey)
            .set({
                uid: user.uid,
                createdAt: d.getTime(),
                reverseCreatedAt: -d.getTime(),
                contents: $("#message").val()
            })
            .then(function (result) {
                alert("Success!");
            });
    }
}
function loadpost() {
    var user = firebase.auth().currentUser;
    if (user) {
        var ref = firebase.database().ref("post/");
        ref.orderByChild('uid').equalTo(user.uid).limitToLast(1).once('value', function (data) {
            data.forEach(function (sdata) {
                $("#message").val(sdata.val().contents);
                $("#message").attr('key', sdata.key);
            })
        });
    }
}
function updatepost() {
    //update 하는 내용
 /*   var user = firebase.auth().currentUser;
    if(user){
        var _key =$("#message").attr('key');
        var ref = firebase.database().ref('post/' + _key + "/");
        var udata = { 
            contents: $("#message").val(), 
            newvalue: '' 
        };
        ref.update(udata);
    }*/
   //set하는 내용
    var user = firebase.auth().currentUser;
    if (user) {
        var d = new Date();
        var _key = $("#message").attr('key');
        firebase.database().ref("post/" + _key)
            .set({
                uid: user.uid,
                createdAt: d.getTime(),
                reverseCreatedAt: -d.getTime(),
                contents: $("#message").val()
            })
            .then(function (result) {
                alert("Success");
            });
    }
}
function deletepost() {
    var user = firebase.auth().currentUser;
    if (user) {
        var _key = $("#message").attr('key');
        var ref = firebase.database().ref("post/" + _key + "/");
        ref.remove()
            .then(function () {
                alert("Success");
            })
            .catch(function (error) {
                console.log("Remove failed: " + error.message);
            });
    }
}