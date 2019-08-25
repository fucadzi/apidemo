const API_KEY = 'gEntzEl8NgmshmwCj7k3eDBWyPpCp1dU0qxjsnBelpLAoMG5Ff';
const HOST = 'restcountries-v1.p.rapidapi.com';
const URL = 'https://restcountries-v1.p.rapidapi.com';

//getting list with countries
let promise = fetch(URL + '/all', {
	'method': 'GET',
	'headers': {
		'x-rapidapi-host': HOST,
		'x-rapidapi-key': API_KEY
	}
}).catch(err => {
    console.log(err);
});

promise.then(function (data) {
    let result = data.json();
    result.then((res) => {
        drawCountryDropdown(res)
    });
});

let drawCountryDropdown = function (data) {
    let select = document.getElementById('list'); 

    data.map((country) => {
        let el = document.createElement('option');
        el.textContent = country.name;
        el.value = country.alpha2Code;
        select.appendChild(el);
    });

    select.addEventListener('change', () => {
        console.log(select.value);
        getCountryInfo(select.value);
    })

    getCountryInfo(data[0].alpha2Code);
}

let getCountryInfo = function (countryCode) {
    fetch(URL+'/alpha/' + countryCode, {
        'method': 'GET',
        'headers': {
            'x-rapidapi-host': HOST,
            'x-rapidapi-key': API_KEY
        }
    })
    .then(response => {
        response.json().then((resp) => {
            drawCountryInfo(resp);
        })
    })
    .catch(err => {
        console.log(err);
    });
}

let drawCountryInfo = function (data) {
    let countryInfo = document.getElementById('country');
    //clear place for next country info
    while(countryInfo.firstChild){
        countryInfo.removeChild(countryInfo.firstChild);
    }

    countryInfo.appendChild(createTableRow({
        caption: 'Country name',
        text: data.name,
        className: 'title'
    }));

    countryInfo.appendChild(createTableRow({
        caption: 'Capital',
        text: data.capital,
        className: 'text'
    }));

    countryInfo.appendChild(createTableRow({
        caption: 'Region',
        text: data.region,
        className: 'text'
    }));

    countryInfo.appendChild(createTableRow({
        caption: 'Languages',
        text: data.languages.join(', '),
        className: 'text'
    }));

    countryInfo.appendChild(createTableRow({
        caption: 'Currencies', 
        text: data.currencies.join(', '),
        className: 'text'
    }));

    countryInfo.appendChild(createTableRow({
        caption: 'Population',
        text: data.population,
        className: 'text'
    }));

    countryInfo.appendChild(createTableRow({
        caption: 'Area',
        text: data.area + ' km2',
        className: 'text'
    }));

    countryInfo.appendChild(createTableRow({
        caption: 'Time zones',
        text: data.timezones.join(', '),
        className: 'text'
    }));
}

let createTableRow = function (data) {
    let row = document.createElement('div');
    let firstCell = document.createElement('div');
    let secondCell = document.createElement('div');

    row.className = 'row ' + data.className;
    firstCell.textContent = data.caption;
    secondCell.textContent = data.text;

    row.appendChild(firstCell);
    row.appendChild(secondCell);
    return row;
}
