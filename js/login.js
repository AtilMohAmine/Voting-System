const loginWithGoogleButton = document.getElementById('login-with-google');
const loginWithFacebookButton = document.getElementById('login-with-facebook');
const loginWithTwitterButton = document.getElementById('login-with-twitter');

const loginError = document.getElementById('login-error');

firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		document.location.href = './index.php';
	}
});

const Googleprovider = new firebase.auth.GoogleAuthProvider();
const Facebookprovider = new firebase.auth.FacebookAuthProvider();
Facebookprovider.addScope('email');
const twitterProvider = new firebase.auth.TwitterAuthProvider();

const login = (provider) => {
	firebase.auth()
	.signInWithPopup(provider)
	.then((result) => {
		/** @type {firebase.auth.OAuthCredential} */
		var credential = result.credential;

		// This gives you a Google Access Token. You can use it to access the Google API.
		var token = credential.accessToken;
		// The signed-in user info.
		var user = result.user;
		// ...
		document.location.href = './index.php';
	}).catch((error) => {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// The email of the user's account used.
		var email = error.email;
		// The firebase.auth.AuthCredential type that was used.
		var credential = error.credential;
		// ...
		console.log(errorMessage, errorCode, email)
		if(errorCode == "auth/account-exists-with-different-credential")
			loginError.textContent = 'البريد الإلكتروني ' + email + ' مستخدم من طرف حساب آخر';
	});
};

loginWithGoogleButton.addEventListener('click', () => {
	login(Googleprovider);
});

loginWithFacebookButton.addEventListener('click', () => {
	login(Facebookprovider);
});

loginWithTwitterButton.addEventListener('click', () => {
	login(twitterProvider);
});