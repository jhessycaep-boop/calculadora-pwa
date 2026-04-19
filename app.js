const display = document.getElementById("display");

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
    display.value = Function('return ' + display.value)();
  } catch {
    display.value = "Erro";
  }
}

// Registrar Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}
