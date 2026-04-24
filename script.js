// 🔥 Firebase Config (your real one)
const firebaseConfig = {
  apiKey: "AIzaSyAlKTvhP2_xiNTxalQnzlazWvXlnUa6i6A",
  authDomain: "moneyplant-35a61.firebaseapp.com",
  projectId: "moneyplant-35a61"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// 👑 ADMIN EMAIL (PUT YOUR EMAIL HERE)
const adminEmail = "yourrealemail@gmail.com";

// SIGNUP
function signup() {
  auth.createUserWithEmailAndPassword(getEmail(), getPassword())
    .then(() => setStatus("User created ✅"))
    .catch(e => setStatus(e.message));
}

// LOGIN
function login() {
  auth.signInWithEmailAndPassword(getEmail(), getPassword())
    .then(() => setStatus("Logged in ✅"))
    .catch(e => setStatus(e.message));
}

// LOGOUT
function logout() {
  auth.signOut();
  setStatus("Logged out ❌");
}

// AUTH STATE
auth.onAuthStateChanged(user => {
  if (user) {
    setStatus("Welcome " + user.email);

    if (user.email === adminEmail) {
      document.getElementById("adminPanel").style.display = "block";
    }

    loadEvents();
  } else {
    document.getElementById("adminPanel").style.display = "none";
  }
});

// ADD EVENT (ADMIN)
function addEvent() {
  const name = document.getElementById("eventName").value;
  const date = document.getElementById("eventDate").value;

  db.collection("events").add({
    name: name,
    date: date
  });

  alert("Event added!");
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

// REGISTER EVENT
function registerEvent(eventName) {
  const user = auth.currentUser;

  if (!user) {
    alert("Please login first!");
    return;
  }

  db.collection("registrations").add({
    user: user.email,
    event: eventName
  });

  alert("Registered successfully!");
}

// HELPERS
function getEmail() {
  return document.getElementById("email").value;
}

function getPassword() {
  return document.getElementById("password").value;
}

function setStatus(msg) {
  document.getElementById("status").innerText = msg;
}