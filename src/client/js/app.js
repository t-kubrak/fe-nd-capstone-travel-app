function addTrip(json) {
    const city = document.createElement('p');
    city.innerText = json.city;
    city.classList.add('city');
    const date = document.createElement('p');
    date.innerText = json.date;
    date.classList.add('date');
    const weatherDesc = document.createElement('p');
    weatherDesc.innerText = json.weatherDesc;
    weatherDesc.classList.add('weatherDesc');
    const temperature = document.createElement('p');
    temperature.innerText = `${json.temperature}°C`;
    temperature.classList.add('temperature');
    const image = document.createElement('img');
    image.setAttribute('src', json.imageUrl);

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.appendChild(city);
    cardDiv.appendChild(date);
    cardDiv.appendChild(weatherDesc);
    cardDiv.appendChild(temperature);
    cardDiv.appendChild(image);

    const fragment = document.createDocumentFragment();
    fragment.appendChild(cardDiv);
    document.getElementById('trips').appendChild(fragment);
}

async function handleSubmit(formData) {
    try {
        document.querySelector('#trips .error').innerText = '';

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
