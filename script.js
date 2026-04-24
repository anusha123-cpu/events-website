// 🔥 Firebase Config
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

// LOGIN
function login() {
  auth.signInWithEmailAndPassword(getEmail(), getPassword())
    .then(() => {
      window.location.href = "home.html"; // ✅ THIS LINE DOES NAVIGATION
    })
    .catch(e => setStatus(e.message));
}

// SIGNUP
function signup() {
  auth.createUserWithEmailAndPassword(getEmail(), getPassword())
    .then(() => setStatus("User created"))
    .catch(e => setStatus(e.message));
}

// LOGOUT
function logout() {
  auth.signOut().then(() => {
    window.location.href = "index.html";
  });
}

// NAVIGATION
function goAdmin() {
  const user = auth.currentUser;
  if (user && user.email === adminEmail) {
    window.location.href = "admin.html";
  } else {
    alert("Access denied");
  }
}

// ADD EVENT
function addEvent() {
  db.collection("events").add({
    name: document.getElementById("eventName").value,
    date: document.getElementById("eventDate").value,
    type: document.getElementById("eventType").value
  });

  alert("Event added");
}

// LOAD EVENTS
function loadEvents() {
  db.collection("events").onSnapshot(snapshot => {
    let u="", p="", pa="";

    snapshot.forEach(doc => {
      const e = doc.data();

      const card = `
        <div onclick="openEvent('${e.name}')">
          <h3>${e.name}</h3>
          <p>${e.date}</p>
        </div>
      `;

      if (e.type==="upcoming") u+=card;
      if (e.type==="present") p+=card;
      if (e.type==="past") pa+=card;
    });

    if(document.getElementById("upcoming")) document.getElementById("upcoming").innerHTML=u;
    if(document.getElementById("present")) document.getElementById("present").innerHTML=p;
    if(document.getElementById("past")) document.getElementById("past").innerHTML=pa;
  });
}

// OPEN EVENT
function openEvent(name) {
  localStorage.setItem("event", name);
  window.location.href = "event.html";
}

// REGISTER
function submitRegistration() {
  const event = localStorage.getItem("event");

  db.collection("registrations").add({
    event: event,
    name: document.getElementById("name").value,
    usn: document.getElementById("usn").value,
    phone: document.getElementById("phone").value
  });

  alert("Registered!");
}

// HELPERS
function getEmail() {
  return document.getElementById("email")?.value;
}

function getPassword() {
  return document.getElementById("password")?.value;
}

function setStatus(msg) {
  if(document.getElementById("status"))
    document.getElementById("status").innerText = msg;
}

// AUTO LOAD EVENTS
if (window.location.pathname.includes("home.html")) {
  loadEvents();
}