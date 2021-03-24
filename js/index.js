  // Your web app's Firebase configuration
  var firebaseConfig = {
      apiKey: "AIzaSyDIjey6qSWuZ3bMyJvCbjpGUjwfdjG-ko0",
      authDomain: "dashboard-84a76.firebaseapp.com",
      databaseURL: "https://dashboard-84a76.firebaseio.com",
      projectId: "dashboard-84a76",
      storageBucket: "dashboard-84a76.appspot.com",
      messagingSenderId: "210552530619",
      appId: "1:210552530619:web:3610fa9dd9bfa531a4eb9e",
      measurementId: "G-W8TE09FJQ1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();


  //console.log(firebase)



  function login() {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;

      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {


          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;

          toastr.warning(errorMessage)
              // ...
      });
  }


  function signup() {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      var displayName = document.getElementById('username').value;

      firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
          //  successful.
          firebase.auth().onAuthStateChanged(function(user) {
              if (user) {
                  user.updateProfile({
                      displayName: displayName,
                      photoURL: "assets/images/avatar/demi.jpg"
                  }).then(function() {
                      toastr.success("Account created Successfully")
                          // Update successful.
                  }).catch(function(error) {
                      console.log(error)
                  });

              } else {
                  console.log("signed out")
                      //window.location.href = "index.html";
              }
          })
      }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
      });

  }





  $('#login').click(function() {
      login();


      //straigh to bern's dashboard if its bern. and disable the main dashboard
      firebase.auth().onAuthStateChanged(function(user) {
          if ((user.displayName).includes('Bern')) {
              document.getElementById("homePageLink").hidden = true;
              window.location.href = "bern.html";

          } else if ((user.displayName).includes('Event')) {
              document.getElementById("homePageLink").hidden = true;
              window.location.href = "naadei.html";

          } else {
              console.log("signed out")
                  //window.location.href = "index.html";
          }
      });

  });



  $('#createAccount').click(function() {
      signup();

  })