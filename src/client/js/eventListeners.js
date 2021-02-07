import { handleSubmit } from './app'

const form = document.getElementById('add-trip-form');
const trips = document.getElementById('trips');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = JSON.stringify(
        Object.fromEntries(new FormData(form))
    );

    handleSubmit(formData);
});

trips.addEventListener('click', (evt) => {
    if (evt.target.className === 'delete-trip') {
        trips.removeChild(evt.target.parentNode);
    }
});