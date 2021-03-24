firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        console.log(email + " logged in")
        console.log(photoURL + " Photo")
        console.log(displayName + " Name")

        document.getElementById('uname').innerHTML = displayName;
        document.getElementById('displayName').innerHTML = displayName;
        document.getElementById('displayName2').innerHTML = displayName;
        document.getElementById('displayName3').innerHTML = displayName;
        document.getElementById('emailDisplay').innerHTML = email;
        document.getElementById('emailDisplay2').innerHTML = email;

        //straight to bern's dashboard if its bern. and disable the main dashboard
        if ((user.email).includes('bern') || (user.email).includes('munch')) {
            window.location.href = "bern.html";
            //document.getElementById("naadeiDashboard").hidden = true;
            document.getElementById("homePageLink").hidden = true;
        } else if ((user.email).includes('events') || (user.email).includes('naadei')) {
            window.location.href = "naadei.html";
            //document.getElementById("bernDashboard").hidden = true;
            document.getElementById("homePageLink").hidden = true;
        } else {
            document.getElementById("bernDashboard").hidden = false;
            document.getElementById("naadeiDashboard").hidden = false;
            document.getElementById("homePageLink").hidden = false;
        }


        //setting profile pics
        if (photoURL == null || photoURL == "") {
            document.getElementById('avatar').src = "assets/images/avatar/demi.jpg";
            document.getElementById('pic').src = "assets/images/avatar/demi.jpg";
        }
        document.getElementById('avatar').src = photoURL;
        document.getElementById('pic').src = photoURL;


    } else {
        console.log("signed out")
        window.location.href = "index.html";
    }
})


function logout() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log("Signed out")
    }).catch(function(error) {
        // An error happened.
        console.log(error)
    });
}


$('#logout, #logoutTwo').click(function() {
    logout();
})