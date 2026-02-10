/* ==============================
   VERSION CHECK
============================== */
(async function checkForUpdates() {
    const currentVersion = "1.0";
    const versionUrl =
        "https://raw.githubusercontent.com/ivysone/Will-you-be-my-Valentine-/main/version.json";

    try {
        const response = await fetch(versionUrl);
        if (!response.ok) return;

        const data = await response.json();

        if (data.version !== currentVersion) {
            alert(data.updateMessage);
        }
    } catch (err) {
        console.warn("Update check failed.");
    }
})();


/* ==============================
   VALENTINE INTERACTION
============================== */

const messages = [
    "Are you sure?",
    "Really sure??",
    "Sure ka? 🥹",
    "Sige na 🥹",
    "🥹",
    "If you say no ulit, magtatampo me",
    ":<<",
    ":<<<<<<<<<<<<",
    "Ok fine, I will stop asking...",
    "Just kidding, say yes please! ❤️"
];

let messageIndex = 0;
let yesScale = 1;

const MAX_SCALE_MOBILE = 1.8;
const MAX_SCALE_DESKTOP = 2.5;

const noButton = document.querySelector(".no-button");
const yesButton = document.querySelector(".yes-button");

/* Make mobile taps faster */
document.querySelectorAll("button").forEach(btn => {
    btn.style.touchAction = "manipulation";
});


/* ==============================
   NO BUTTON CLICK
============================== */
function handleNoClick() {

    // Change message
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;

    // Detect device size
    const isMobile = window.innerWidth < 500;
    const maxScale = isMobile ? MAX_SCALE_MOBILE : MAX_SCALE_DESKTOP;

    // Grow YES button safely
    if (yesScale < maxScale) {
        yesScale += 0.15;
        yesButton.style.transform = `scale(${yesScale})`;
    }

    // Small playful movement on mobile
    if (isMobile) {
        const x = Math.random() * 30 - 15;
        const y = Math.random() * 20 - 10;
        noButton.style.transform = `translate(${x}px, ${y}px)`;
    }
}


/* ==============================
   YES BUTTON CLICK
============================== */
function handleYesClick() {
    document.body.style.transition = "0.5s";
    document.body.style.opacity = "0";

    setTimeout(() => {
        window.location.href = "yes_page.html";
    }, 500);
}


/* ==============================
   EVENT LISTENERS
============================== */
noButton.addEventListener("click", handleNoClick);
yesButton.addEventListener("click", handleYesClick);
