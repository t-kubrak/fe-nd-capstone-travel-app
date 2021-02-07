async function handleSubmit(formData) {
    console.log(formData);

    const responseData = await fetch('http://localhost:8081/trip', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: formData,
    });
}

export { handleSubmit }
