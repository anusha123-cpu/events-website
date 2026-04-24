// 🔥 PASTE YOUR FIREBASE CONFIG HERE
const firebaseConfig = {
  apiKey: "AIzaSyAlKTvhP2_xiNTxalQnzlazWvXlnUa6i6A",
  authDomain: "moneyplant-35a61.firebaseapp.com",
  projectId: "moneyplant-35a61"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// 👑 ADMIN EMAIL
const adminEmail = "your-email@gmail.com";

// AUTH
function signup() {
  auth.createUserWithEmailAndPassword(email(), pass())
    .then(() => setStatus("User created"))
    .catch(e => setStatus(e.message));
}

function login() {
  auth.signInWithEmailAndPassword(email(), pass())
    .then(() => setStatus("Logged in"))
    .catch(e => setStatus(e.message));
}

function logout() {
  auth.signOut();
}

auth.onAuthStateChanged(user => {
  if (user) {
    setStatus("Welcome " + user.email);

    if (user.email === adminEmail) {
      document.getElementById("adminPanel").style.display = "block";
    }

    loadEvents();
  }
});

// ADD EVENT
function addEvent() {
  db.collection("events").add({
    name: document.getElementById("eventName").value,
    date: document.getElementById("eventDate").value
  });
}

// LOAD EVENTS
function loadEvents() {
  db.collection("events").onSnapshot(snapshot => {
    let html = "";

    snapshot.forEach(doc => {
      const e = doc.data();

      html += `
        <div>
          <h3>${e.name}</h3>
          <p>${e.date}</p>
          <button onclick="registerEvent('${e.name}')">Register</button>
        </div>
      `;
    });

    document.getElementById("events").innerHTML = html;
  });
}

// REGISTER
function registerEvent(eventName) {
  const user = auth.currentUser;

  db.collection("registrations").add({
    user: user.email,
    event: eventName
  });

  alert("Registered!");
}

// HELPERS
function email() {
  return document.getElementById("email").value;
}

function pass() {
  return document.getElementById("password").value;
}

function setStatus(msg) {
  document.getElementById("status").innerText = msg;
}