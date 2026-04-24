// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// Signup
function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => alert("Signup successful"))
    .catch(err => alert(err.message));
}

// Login
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => window.location = "events.html")
    .catch(err => alert(err.message));
}

// Add Event (Admin only)
function addEvent() {
  const user = auth.currentUser;
  if (user && user.email === "admin@example.com") { // simple admin check
    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    db.collection("events").add({ title, date })
      .then(() => alert("Event added"));
  } else {
    alert("Only admin can add events");
  }
}

// Load Events
if (document.getElementById("events")) {
  db.collection("events").orderBy("date").onSnapshot(snapshot => {
    const eventsDiv = document.getElementById("events");
    eventsDiv.innerHTML = "";
    snapshot.forEach(doc => {
      const e = doc.data();
      const btn = `<button onclick="registerEvent('${doc.id}')">Register</button>`;
      eventsDiv.innerHTML += `<p>${e.title} - ${e.date} ${btn}</p>`;
    });
  });
}

// Register for Event
function registerEvent(eventId) {
  const user = auth.currentUser;
  if (user) {
    db.collection("registrations").add({
      eventId,
      userId: user.uid
    }).then(() => alert("Registered successfully"));
  } else {
    alert("Please login first");
  }
}
