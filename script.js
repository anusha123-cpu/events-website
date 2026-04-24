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
    .then(() => window.location.href = "home.html")
    .catch(e => setStatus(e.message));
}

// SIGNUP
function signup() {
  auth.createUserWithEmailAndPassword(getEmail(), getPass())
    .then(() => setStatus("Account created"))
    .catch(e => setStatus(e.message));
}

// LOGOUT
function logout() {
  auth.signOut().then(() => window.location.href = "index.html");
}

// LOAD EVENTS
function loadEvents() {
    console.log("Events loading...");
    html += `
  <div class="card" onclick="openEvent('${e.name.replace(/'/g, "\\'")}')">
    <h3>${e.name}</h3>
    <p>${e.date}</p>
  </div>
`;
    
  db.collection("events").onSnapshot(snapshot => {
    let html = "";

    snapshot.forEach(doc => {
      const e = doc.data();

      html += `
        <div class="card" onclick="openEvent('${e.name}')">
          <h3>${e.name}</h3>
          <p>${e.date}</p>
        </div>
      `;
    });

    document.getElementById("events").innerHTML = html;
  });
}

// OPEN EVENT
function openEvent(name) {
  console.log("Clicked:", name); // 👈 debug
  localStorage.setItem("event", name);
  window.location.href = "event.html";
}
  localStorage.setItem("event", name);
  window.location.href = "event.html";
}

// REGISTER
function register() {
  db.collection("registrations").add({
    event: localStorage.getItem("event"),
    name: val("name"),
    usn: val("usn"),
    team: val("team"),
    members: val("members"),
    branch: val("branch"),
    section: val("section")
  });

  alert("Registered successfully!");
}

// HELPERS
function getEmail() {
  return document.getElementById("email").value;
}

function getPass() {
  return document.getElementById("password").value;
}

function val(id) {
  return document.getElementById(id).value;
}

function setStatus(msg) {
  document.getElementById("status").innerText = msg;
}

// AUTO LOAD
if (window.location.pathname.includes("home.html")) {
  loadEvents();
}