

const generatePassword = () => {
  const length = document.getElementById('length').value;
  const includeLower = document.getElementById('includeLower').checked;
  const includeUpper = document.getElementById('includeUpper').checked;
  const includeNumbers = document.getElementById('includeNumbers').checked;
  const includeSymbols = document.getElementById('includeSymbols').checked;

  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+{}[]|:;<>,.?/~`-=";

  let charset = "";
  if (includeLower) charset += lower;
  if (includeUpper) charset += upper;
  if (includeNumbers) charset += numbers;
  if (includeSymbols) charset += symbols;

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomChar = charset.charAt(Math.floor(Math.random() * charset.length));
    password += randomChar;
  }

  const passwordDisplay = document.getElementById('passwordDisplay');
  passwordDisplay.classList.remove('hidden');
  passwordDisplay.innerText = password;

  updateStrength(password);
  saveToHistory(password);
};

function updateStrength(pass) {
  const strength = document.getElementById('strengthDisplay');
  if (pass.length < 6) strength.innerText = "Weak";
  else if (pass.length < 10) strength.innerText = "Moderate";
  else strength.innerText = "Strong";
}

function copyPassword() {
  const pass = document.getElementById('passwordDisplay').innerText;
  navigator.clipboard.writeText(pass);
  alert("Password copied to clipboard");
}

function downloadPassword() {
  const pass = document.getElementById('passwordDisplay').innerText;
  const blob = new Blob([pass], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = "password.txt";
  link.click();
}

function toggleDarkMode() {
  document.body.classList.toggle('dark');
}

function toggleVisibility() {
  const passwordDisplay = document.getElementById('passwordDisplay');
  passwordDisplay.style.userSelect = passwordDisplay.style.userSelect === 'none' ? 'auto' : 'none';
}

function saveToHistory(password) {
  let history = JSON.parse(localStorage.getItem('passHistory')) || [];
  history.unshift(password);
  if (history.length > 5) history = history.slice(0, 5);
  localStorage.setItem('passHistory', JSON.stringify(history));
  displayHistory();
}

function displayHistory() {
  const history = JSON.parse(localStorage.getItem('passHistory')) || [];
  const list = document.getElementById('historyList');
  list.innerHTML = '';
  history.forEach(pass => {
    const li = document.createElement('li');
    li.innerText = pass;
    list.appendChild(li);
  });
}

displayHistory();
