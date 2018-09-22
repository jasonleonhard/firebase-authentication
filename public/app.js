(function() {

  document.addEventListener('DOMContentLoaded', function() {
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
    // // The Firebase SDK is initialized and available here!
    //
    // firebase.auth().onAuthStateChanged(user => { });
    // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
    // firebase.messaging().requestPermission().then(() => { });
    // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
    //
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

    try {
      let app = firebase.app();
      let features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function');
      document.getElementById('load').innerHTML = `Firebase SDK loaded with ${features.join(', ')}`;
    } catch (e) {
      console.error(e);
      document.getElementById('load').innerHTML = 'Error loading the Firebase SDK, check the console.';
    }
  });



  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBlJaFYglpeCqND7wJGNAg3J5qa2Re4wHc",
    authDomain: "authme-96bdc.firebaseapp.com",
    databaseURL: "https://authme-96bdc.firebaseio.com",
    projectId: "authme-96bdc",
    storageBucket: "authme-96bdc.appspot.com",
    messagingSenderId: "503196286034"
  };
  firebase.initializeApp(config);

  // get elements
  const txtEmail    = document.getElementById('txtEmail')
  const txtPassword = document.getElementById('txtPassword')
  const btnSignIn   = document.getElementById('btnSignIn')
  const btnSignUp   = document.getElementById('btnSignUp')
  const btnSignOut  = document.getElementById('btnSignOut')

  // btnSignup click event listener
  btnSignUp.addEventListener('click', e => {
    const email   = txtEmail.value
    const pass    = txtPassword.value
    const auth    = firebase.auth()
    const promise = auth.createUserWithEmailAndPassword(email, pass)
    promise.catch(e => console.log(e.message))
  })

  // btnSignIn click event listener
  btnSignIn.addEventListener('click', e => {
    const email = txtEmail.value
    const pass  = txtPassword.value
    const auth  = firebase.auth()
    const promise = auth.signInWithEmailAndPassword(email, pass)
    promise.catch(e => console.log(e.message))
  })

  btnSignOut.addEventListener('click', e => {
    firebase.auth().signOut()
    console.log('Successfully Signed Out')
    btnSignIn.classList.remove('none')
    btnSignUp.classList.remove('none')
    btnSignOut.classList.add('none')
    currentUser.classList.add('none')
  })

  // sign in does not set a display name as it cannot be passed in as an option. after signin set displayName to the same as current users email
  currentUser.addEventListener('click', e => {
    var user = firebase.auth().currentUser;
    // update users profile to have display name
    user.updateProfile({
      displayName: user.email
    }).then(function() {       // Update successful.
      console.log(user.displayName)
      alert(user.displayName)
      // console.log("last signed in:", user.currentUser.metadata.lastSignInTime)
    }).catch(function(error) { // An error occured.
      console.log(error)
    });
  })

  // realtimme listener added
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      console.log(firebaseUser.email , "Signed In")
      console.log(firebaseUser)
      btnSignOut.classList.remove('none')
      btnSignIn.classList.add('none')
      btnSignUp.classList.add('none')
      currentUser.classList.remove('none')
    } else {
      console.log('Not Signed In')
    }
  })

}())
