const charLengthSlider = document.getElementById('char-length-slider');
const charLengthValue = document.getElementById('char-length-value');

charLengthSlider.addEventListener('input', () => {
    // Update the displayed character length value
    charLengthValue.textContent = charLengthSlider.value;

    // Calculate the percentage of the slider's progress
    const value = (charLengthSlider.value - charLengthSlider.min) / (charLengthSlider.max - charLengthSlider.min) * 100;

    // Apply the gradient to the slider track
    charLengthSlider.style.background = `linear-gradient(to right, var(--strong) ${value}%, var(--black) ${value}%)`;
});

document.getElementById('generate-button').addEventListener('click', generatePassword);

function generatePassword() {
    const charLength = parseInt(document.getElementById('char-length-slider').value);
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeLowercase = document.getElementById('lowercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSymbols = document.getElementById('symbols').checked;

    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    let charSet = '';
    let generatedPassword = '';

    if (includeUppercase) charSet += uppercaseChars;
    if (includeLowercase) charSet += lowercaseChars;
    if (includeNumbers) charSet += numberChars;
    if (includeSymbols) charSet += symbolChars;

    if (charSet.length === 0 || charLength === 0) {
        alert('Please select at least one character type and set a valid character length.');
        return;
    }

    for (let i = 0; i < charLength; i++) {
        const randomIndex = Math.floor(Math.random() * charSet.length);
        generatedPassword += charSet[randomIndex];
    }

    document.getElementById('generated-password').textContent = generatedPassword;
    evaluatePasswordStrength(generatedPassword);
}

function evaluatePasswordStrength(password) {
    const strengthText = document.getElementById('strength-level-text');
    const tooWeak = document.getElementById('tooWeak');
    const weak = document.getElementById('weak');
    const medium = document.getElementById('medium');
    const strong = document.getElementById('strong');

    // Reset all strength levels
    tooWeak.classList.remove('tooWeak');
    weak.classList.remove('weak');
    medium.classList.remove('medium');
    strong.classList.remove('strong');

    let strength = 0;

    if (password.length >= 8) strength++; // Length is decent
    if (/[A-Z]/.test(password)) strength++; // Contains uppercase
    if (/[a-z]/.test(password)) strength++; // Contains lowercase
    if (/[0-9]/.test(password)) strength++; // Contains numbers
    if (/[^A-Za-z0-9]/.test(password)) strength++; // Contains symbols

    // Set strength indicators based on the calculated strength
    if (password.length < 8 || strength === 1) {
        strengthText.textContent = 'Too Weak';
        tooWeak.classList.add('tooWeak');
    } else if (strength === 2) {
        strengthText.textContent = 'Weak';
        tooWeak.classList.add('weak');
        weak.classList.add('weak');
    } else if (strength === 3) {
        strengthText.textContent = 'Medium';
        tooWeak.classList.add('medium');
        weak.classList.add('medium');
        medium.classList.add('medium');
    } else if (strength >= 4) {
        strengthText.textContent = 'Strong';
        tooWeak.classList.add('strong');
        weak.classList.add('strong');
        medium.classList.add('strong');
        strong.classList.add('strong');
    }
}

// Initial state: Ensure strength boxes are empty
window.addEventListener('load', () => {
    document.getElementById('tooWeak').classList.remove('tooWeak');
    document.getElementById('weak').classList.remove('weak');
    document.getElementById('medium').classList.remove('medium');
    document.getElementById('strong').classList.remove('strong');
});