function logout() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log("Signed out")
    }).catch(function(error) {
        // An error happened.
        console.log(error)
    });
}


$('#logout').click(function() {
    logout();
});



firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        console.log(displayName + " logged in")
        document.getElementById('displayName').innerHTML = displayName;
        document.getElementById('displayName2').innerHTML = displayName;
        document.getElementById('ProfileName').innerHTML = displayName;
        document.getElementById('email').innerHTML = email;
        document.getElementById('emailDisplay').innerHTML = email;
        document.getElementById('avatar').src = photoURL;
        document.getElementById('profileAvatar').src = photoURL;
    } else {
        console.log("signed out")
        window.location.href = "index.html";
    }
})



$('#update').click(function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            user.updateProfile({
                // displayName: "Test User",
                photoURL: "assets/images/avatar/naa.jpeg"
            }).then(function() {
                console.log("Successful")
                    // Update successful.
            }).catch(function(error) {
                console.log(error)
            });

        } else {
            console.log("signed out")
            window.location.href = "index.html";
        }
    })
})