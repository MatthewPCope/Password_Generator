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