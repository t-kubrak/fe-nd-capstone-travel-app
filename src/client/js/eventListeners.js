import { handleSubmit } from './app'

const form = document.getElementById('add-trip-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = JSON.stringify(
        Object.fromEntries(new FormData(form))
    );

    handleSubmit(formData);
});