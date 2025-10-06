// set output variable
const output = document.querySelector('#output');

// grab input so we can clear it on Random
const inputEl = document.querySelector('input');

// start hidden so it only appears after a result
output.style.display = 'none';

// input 
document.querySelector('button').addEventListener('click', () => {
    const query = document.querySelector('input').value;
    if (!query) {
        output.textContent = 'Please type a word first.';
        output.style.display = 'inline-block';
        output.classList.add('show');
        return;
    }
    getAdvice();
});

// create function to get data from database
function getAdvice() {
    const query = document.querySelector('input').value;
    const url = `https://api.adviceslip.com/advice/search/${query}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.slips && data.slips[0]) {
                output.textContent = data.slips[0].advice;
                output.style.display = 'inline-block';
                // retrigger the pop-in
                output.classList.remove('show');
                requestAnimationFrame(() => output.classList.add('show'));
            }
        })
        .catch(err => {
            output.textContent = 'Could not fetch advice.';
            output.style.display = 'inline-block';
            console.error(err);
        });
}

// listen for when random button is clicked
document.querySelector('#random').addEventListener('click', getRandomAdvice);

// create function for random advice
function getRandomAdvice() {
    // NEW: clear the input so it doesn’t look stale
    if (inputEl) inputEl.value = '';

    const randomUrl = "https://api.adviceslip.com/advice";
    fetch(randomUrl)
        .then(res => res.json())
        .then(data => {
            if (data && data.slip && data.slip.advice) {
                output.textContent = data.slip.advice;
                output.style.display = 'inline-block';
                output.classList.remove('show');
                requestAnimationFrame(() => output.classList.add('show'));
            }
        })
        .catch(() => {
            output.textContent = 'Could not fetch advice.';
            output.style.display = 'inline-block';
        });
}
