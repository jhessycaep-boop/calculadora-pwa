'use strict';

const display = document.getElementById("display");

function add(value) {
  display.value += value;
  vibrate();
}

function clearDisplay() {
  display.value = "";
  vibrate();
}

function del() {
  display.value = display.value.slice(0, -1);
  vibrate();
}

function calculate() {
  try {
    let expression = display.value
      .replace(/%/g, "/100")
      .replace(/×/g, "*")
      .replace(/÷/g, "/");
    

    let result = Function('return ' + expression)();

    if (!isFinite(result)) {
      display.value = "Erro";
      return;
    }

    saveToHistory(display.value, result);

    display.value = result;
  } catch {
    display.value = "Erro";
  }
  vibrate();
}

function saveToHistory(expression, result) {
  let history = JSON.parse(localStorage.getItem("history")) || [];

  history.unshift(`${expression} = ${result}`);

  if (history.length > 10) history.pop();

  localStorage.setItem("history", JSON.stringify(history));

  renderHistory();
}

function renderHistory() {
  let historyDiv = document.getElementById("history");
  let history = JSON.parse(localStorage.getItem("history")) || [];

  historyDiv.innerHTML = history.map(item => `<div>${item}</div>`).join("");
}

window.onload = renderHistory;

function vibrate() {
  if (navigator.vibrate) navigator.vibrate(10);
}

// Registrar Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}
