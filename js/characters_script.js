var people = []
var planets = []
var movies = []
var species = []

window.addEventListener('load',  (event) => {loadMovies('https://swapi.dev/api/films/'); loadPlanets('https://swapi.dev/api/planets/');
    loadPeople('https://swapi.dev/api/people/'); loadSpecies('https://swapi.dev/api/species/');});

function loadMovies(url){
    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            setMovies(data)
        })
        .catch((err) => {
            console.error(err)
        })
}

function loadPlanets(url){
    if(!url)
        return ;
    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            setPlanets(data.results)
            loadPlanets(data.next)
        })
        .catch((err) => {
            console.error(err)
        })
}

function loadSpecies(url){
    if (!url)
    {
        console.log('done')
        return;
    }
    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            setSpecies(data)
            loadSpecies(data.next)
        })
        .catch((err) => {
            console.error(err)
        })
}

function loadPeople(url) {
    if (!url)
    {
        console.log('done')
        return;
    }
    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            setPeople(data)
            loadPeople(data.next)
        })
        .catch((err) => {
            console.error(err)
        })
}

function setMovies(data){
    movies.push(data)
}

function setPlanets(data){
    planets.push(data)
}

function setPeople(data){
    people.push(data.results)
}

function setSpecies(data){
    species.push(data.results)
}

function findChar(charUrl) {
    for(let i = 0; i < people.length; i++)
        if(people[i].some(item => item.url === charUrl))
            return people[i].find(item => item.url === charUrl)

    return null
}

function findPlanets(url){
    for(let i = 0; i < planets.length; i++)
        if(planets[i].some(item => item.url === url))
            return planets[i].find(item => item.url === url)

    return null
}

function findMovies(url) {
    let arr = movies[0].results
    for(let i = 0; i < arr.length; i++)
        if(arr[i].url.includes(url))
            return arr[i]

    return null
}

function findSpecies(speciesURL){
    for(let i = 0; i < species.length; i++)
        for(let j = 0; j< species[i].length; j++)
        {
            let arr = species[i]
            if(arr[j].url.includes(speciesURL))
                return arr[j]
        }

    return null
}

function createTable(){
    let table = document.getElementsByTagName('table').item(0)
    let tmp =""
    table.innerHTML = `<tr>
    <th>Name</th>
    <th>Homeworld</th>
    <th>Specie</th>
    <th>Movies</th>
  </tr>`

    for(let i = 0; i<people.length; i++){
        for(let j = 0; j <people[i].length; j++){
            tmp =""
            for(let k = 0; k<people[i][j].films.length; k++){
                if( k === people[i][j].films.length -1 )
                    tmp += findMovies(people[i][j].films[k]).title
                else
                    tmp += findMovies(people[i][j].films[k]).title + ", "

            }
            table.innerHTML += `<tr>
<td>${people[i][j].name}</td>
<td>${findPlanets(people[i][j].homeworld).name}</td>
<td>${findSpecies(people[i][j].species).name}</td>
<td>${tmp}</td>
</tr>`
        }
    }
}

function filterByTitle(){
    let table = document.getElementsByTagName('table').item(0)
    let tmp
    table.innerHTML = ""
    let n = 0
    while ( n < 6) {
        table.innerHTML += `
<h1>${movies[0].results[n].title}</h1>`
        table.innerHTML += `
<tr>
    <th>Name</th>
    <th>Homeworld</th>
    <th>Specie</th>
    <th>Movies</th>
  </tr>`
        for (let i = 0; i < people.length; i++) {
            for (let j = 0; j < people[i].length; j++) {
                tmp = ""
                for (let k = 0; k < people[i][j].films.length; k++) {
                    if (k === people[i][j].films.length - 1)
                        tmp += findMovies(people[i][j].films[k]).title
                    else
                        tmp += findMovies(people[i][j].films[k]).title + ", "

                }
                if(tmp.includes(movies[0].results[n].title)) {
                    table.innerHTML += `<tr>
<td>${people[i][j].name}</td>
<td>${findPlanets(people[i][j].homeworld).name}</td>
<td>${findSpecies(people[i][j].species).name}</td>
<td>${tmp}</td>
</tr>`
                }
            }
        }
        n = n + 1
    }
}

function filterByPlanet(){
    let table = document.getElementsByTagName('table').item(0)
    let tmp
    table.innerHTML = ""

    for (let page = 0; page <planets.length; page++) {
        let n = 0
        while (n < planets[page].length) {
            table.innerHTML += `
<h1>${planets[page][n].name}</h1>`
            table.innerHTML += `
<tr>
    <th>Name</th>
    <th>Homeworld</th>
    <th>Specie</th>
    <th>Movies</th>
  </tr>`
            for (let i = 0; i < people.length; i++) {
                for (let j = 0; j < people[i].length; j++) {
                    tmp = ""
                    for (let k = 0; k < people[i][j].films.length; k++) {
                        if (k === people[i][j].films.length - 1)
                            tmp += findMovies(people[i][j].films[k]).title
                        else
                            tmp += findMovies(people[i][j].films[k]).title + ", "

                    }
                    if (planets[page][n].name === findPlanets(people[i][j].homeworld).name) {
                        table.innerHTML += `<tr>
<td>${people[i][j].name}</td>
<td>${findPlanets(people[i][j].homeworld).name}</td>
<td>${findSpecies(people[i][j].species).name}</td>
<td>${tmp}</td>
</tr>`
                    }
                }
            }
            n = n + 1
        }
    }
}

function filterBySpecie(){
    let table = document.getElementsByTagName('table').item(0)
    let tmp
    table.innerHTML = ""

    for (let page = 0; page <species.length; page++) {
        let n = 0
        while (n < species[page].length) {
            table.innerHTML += `
<h1>${species[page][n].name}</h1>`
            table.innerHTML += `
<tr>
    <th>Name</th>
    <th>Homeworld</th>
    <th>Specie</th>
    <th>Movies</th>
  </tr>`
            for (let i = 0; i < people.length; i++) {
                for (let j = 0; j < people[i].length; j++) {
                    tmp = ""
                    for (let k = 0; k < people[i][j].films.length; k++) {
                        if (k === people[i][j].films.length - 1)
                            tmp += findMovies(people[i][j].films[k]).title
                        else
                            tmp += findMovies(people[i][j].films[k]).title + ", "

                    }
                    if (species[page][n].name === findSpecies(people[i][j].species).name) {
                        table.innerHTML += `<tr>
<td>${people[i][j].name}</td>
<td>${findPlanets(people[i][j].homeworld).name}</td>
<td>${findSpecies(people[i][j].species).name}</td>
<td>${tmp}</td>
</tr>`
                    }
                }
            }
            n = n + 1
        }
    }
}