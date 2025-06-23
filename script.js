let expression = "";

function press(val) {
  const display = document.getElementById("display");
  if (display.value === "0" || display.value === "Error") {
    display.value = val;
  } else {
    display.value += val;
  }
  expression += val;
}

function clearDisplay() {
  expression = "";
  document.getElementById("display").value = "0";
}

function calculate() {
  try {
    const result = eval(expression);
    document.getElementById("display").value = result;
    expression = result.toString();
  } catch {
    document.getElementById("display").value = "Error";
    expression = "";
  }
}

function toggleDarkMode() {
  const body = document.getElementById("body");
  body.classList.toggle("dark");

  const toggleBtn = document.getElementById("toggleMode");
  toggleBtn.textContent = body.classList.contains("dark") ? "☀️ Light Mode" : "🌙 Dark Mode";
}

// Swipe gesture support
let startX, startY;

document.addEventListener("touchstart", function (e) {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

document.addEventListener("touchend", function (e) {
  let endX = e.changedTouches[0].clientX;
  let endY = e.changedTouches[0].clientY;

  let diffX = endX - startX;
  let diffY = endY - startY;

  if (Math.abs(diffX) > Math.abs(diffY)) {
    // Horizontal swipe
    if (diffX > 30) {
      press('+');
      flashSwipe('➡️ +');
    } else if (diffX < -30) {
      press('-');
      flashSwipe('⬅️ −');
    }
  } else {
    // Vertical swipe
    if (diffY < -30) {
      press('*');
      flashSwipe('⬆️ ×');
    } else if (diffY > 30) {
      press('/');
      flashSwipe('⬇️ ÷');
    }
  }
});

// Optional: flash feedback
function flashSwipe(text) {
  const overlay = document.createElement("div");
  overlay.textContent = text;
  overlay.style.position = "fixed";
  overlay.style.top = "50%";
  overlay.style.left = "50%";
  overlay.style.transform = "translate(-50%, -50%)";
  overlay.style.fontSize = "2rem";
  overlay.style.color = "#fff";
  overlay.style.background = "rgba(0,0,0,0.6)";
  overlay.style.padding = "10px 20px";
  overlay.style.borderRadius = "12px";
  overlay.style.zIndex = "999";
  overlay.style.opacity = "1";
  overlay.style.transition = "opacity 0.5s ease";

  document.body.appendChild(overlay);
  setTimeout(() => {
    overlay.style.opacity = "0";
    setTimeout(() => overlay.remove(), 500);
  }, 500);
}
