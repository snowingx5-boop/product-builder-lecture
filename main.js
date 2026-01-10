
const generateBtn = document.getElementById('generate');
const numberSpans = document.querySelectorAll('.number');
const themeToggle = document.getElementById('theme-toggle');

function generateNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    numberSpans.forEach((span, index) => {
        span.style.animation = 'none'; // Reset animation
        void span.offsetWidth; // Trigger reflow
        span.style.animation = ''; // Re-enable animation
        span.textContent = sortedNumbers[index];
    });
}

function toggleTheme() {
    if (themeToggle.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
}

// On load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.checked = true;
}

generateBtn.addEventListener('click', generateNumbers);
themeToggle.addEventListener('change', toggleTheme);

// Initial generation
generateNumbers();
