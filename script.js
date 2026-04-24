const firebaseConfig = {
  apiKey: "AIzaSyAlKTvhP2_xiNTxalQnzlazWvXlnUa6i6A",
  authDomain: "moneyplant-35a61.firebaseapp.com",
  projectId: "moneyplant-35a61"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// LOGIN
function login() {
  auth.signInWithEmailAndPassword(getEmail(), getPass())
    .then(() => {
      window.location.href = "home.html";
    })
    .catch(e => setStatus(e.message));
}

// SIGNUP
function signup() {
  auth.createUserWithEmailAndPassword(getEmail(), getPass())
    .then(() => setStatus("User created"))
    .catch(e => setStatus(e.message));
}

// LOGOUT
function logout() {
  auth.signOut().then(() => {
    window.location.href = "index.html";
  });
}

// HELPERS
function getEmail() {
  return document.getElementById("email").value;
}

function getPass() {
  return document.getElementById("password").value;
}

function setStatus(msg) {
  document.getElementById("status").innerText = msg;
}