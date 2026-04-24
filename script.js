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
 
function loadEvents() {
  db.collection("events").onSnapshot(snapshot => {
    let html = "";

    snapshot.forEach(doc => {
      const e = doc.data();

      html += `
        <div class="card" data-name="${e.name}">
          <h3>${e.name}</h3>
          <p>${e.date}</p>
        </div>
      `;
    });

    document.getElementById("events").innerHTML = html;

    // ✅ MAKE CARDS CLICKABLE (THIS IS IMPORTANT)
    document.querySelectorAll(".card").forEach(card => {
      card.addEventListener("click", function () {
        const name = this.getAttribute("data-name");
        openEvent(name);
      });
    });
  });
}