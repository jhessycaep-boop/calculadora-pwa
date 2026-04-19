const display = document.getElementById("display");

document.addEventListener('touchmove', function(e) {
  e.preventDefault();
}, { passive: false });

function add(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function del() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    let expression = display.value.replace(/%/g, "/100");

    let result = Function('return ' + expression)();

    if (!isFinite(result)) {
      display.value = "Erro";
      return;
    }

    display.value = result;
  } catch {
    display.value = "Erro";
  }
}

// Registrar Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}
