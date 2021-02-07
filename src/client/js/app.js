function addTrip(json) {
    const city = document.createElement('p');
    city.innerText = json.city;
    const date = document.createElement('p');
    date.innerText = json.date;
    const weatherDesc = document.createElement('p');
    weatherDesc.innerText = json.weatherDesc;
    const temperature = document.createElement('p');
    temperature.innerText = `${json.temperature}°C`;
    const image = document.createElement('img');
    image.setAttribute('src', json.imageUrl);

    const fragment = document.createDocumentFragment();
    fragment.appendChild(city);
    fragment.appendChild(date);
    fragment.appendChild(weatherDesc);
    fragment.appendChild(temperature);
    fragment.appendChild(image);

    document.getElementById('trips').appendChild(fragment);
}

async function handleSubmit(formData) {
    try {
        const responseData = await fetch('http://localhost:8081/trip', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: formData,
        });
        const json = await responseData.json();
        addTrip(json);
    } catch (e) {
        document.querySelector('#trips .error').innerText = `Couldn't retrieve the data for this trip`;
    }
}

export { handleSubmit }
