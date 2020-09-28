people = []
planets = []
residents = []
movies = []
starships = []
species = []
vehicles = []



window.addEventListener('load',  (event) => {loadMovies('https://swapi.dev/api/films/'); loadPlanets('https://swapi.dev/api/planets/');
    loadPeople('https://swapi.dev/api/people/'); loadSpecies('https://swapi.dev/api/species/'); loadStarships('https://swapi.dev/api/starships/');
    loadVehicles('https://swapi.dev/api/vehicles/')});


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

function loadResident(url, i){
    if (i >= url.length)
        return ;
    fetch(url[i])
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            setResident(data)
            i += 1
            let details = document.getElementsByClassName('more-info')
            let htmlString = "<span onclick='findPerson("+ i +")'>"+ data.name +", </span>"
            details.item(0).innerHTML += htmlString
            loadResident(url, i)
        })
        .catch((err) => {
            console.error(err)
        })
}

function loadStarships(url){
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
            setStarships(data)
            loadStarships(data.next)
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

function loadVehicles(url){
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
            setVehicles(data)
            loadVehicles(data.next)
        })
        .catch((err) => {
            console.error(err)
        })
}

function setMovies(data){
    this.movies.push(data)
    for (let i=0; i<this.movies[0].results.length; i++)
        document.getElementsByClassName('card-header').item(i).textContent = this.movies[0].results[i].title

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

function setStarships(data){
    starships.push(data.results)

}

function setResident(data){
    residents.push(data)
}

function setVehicles(data){
    vehicles.push(data.results)
}

function addCharacters(num){
    let title = document.getElementsByClassName('filmTitle')
    title.item(0).textContent = movies[0].results[num].title

    let list = document.getElementsByClassName('list-group')
    list.item(0).innerHTML = ``;

    for(let i =0; i<movies[0].results[num].characters.length; i++){
        var char = findChar(movies[0].results[num].characters[i])
        if (char!=null) {
            list.item(0).innerHTML += `<li class="list-group-item" onclick="characterDescription(${char})">${char.name}</li>`
        }
    }
}

function addSpecies(num){
    let list = document.getElementsByClassName('list-group')
    list.item(3).innerHTML = ``
    for(let i =0; i<movies[0].results[num].species.length; i++){
        let s = findSpecies(movies[0].results[num].species[i])
        if (s!=null)
            list.item(3).innerHTML += `<li class="list-group-item">${s.name}</li>`
    }
}

function addPlanets(num){
    let list = document.getElementsByClassName('list-group')
    list.item(1).innerHTML = ``
    for(let i =0; i<movies[0].results[num].planets.length; i++){
        let s = findPlanets(movies[0].results[num].planets[i])
        if (s!=null)
            list.item(1).innerHTML += `<li class="list-group-item">${s.name}</li>`
    }
}

function addStarships(num){
    let list = document.getElementsByClassName('list-group')
    list.item(2).innerHTML = ``
    for(let i =0; i<movies[0].results[num].starships.length; i++){
        let s = findStarships(movies[0].results[num].starships[i])
        if (s!=null)
            list.item(2).innerHTML += `<li class="list-group-item">${s.name}</li>`
    }
}

function addVehicles(num){
    let list = document.getElementsByClassName('list-group')
    list.item(4).innerHTML = ``
    for(let i =0; i<movies[0].results[num].vehicles.length; i++){
        let s = findVehicles(movies[0].results[num].vehicles[i])
        if (s!=null)
            list.item(4).innerHTML += `<li class="list-group-item">${s.name}</li>`
    }
}

function findMovies(url){
    let arr = movies[0].results
    for(let i = 0; i < arr.length; i++)
        if(arr[i].url.includes(url))
            return arr[i]

    return null
}

function findChar(charUrl) {
    for(let i = 0; i < people.length; i++){
        for(let j = 0; j< people[i].length; j++)
        {
            let arr = people[i]
            if(arr[j].url.includes(charUrl))
                return arr[j]
        }
    }
    return null
}

function findSpecies(speciesURL){
    for(let i = 0; i < species.length; i++)
        if(species[i].some(item => item.url === speciesURL))
            return species[i].find(item => item.url === speciesURL)

    return null
}

function findPlanets(url){
    for(let i = 0; i < planets.length; i++)
        if(planets[i].some(item => item.url === url))
            return planets[i].find(item => item.url === url)

    return null
}

function findStarships(url){
    for(let i = 0; i < starships.length; i++)
        if(starships[i].some(item => item.url === url))
            return starships[i].find(item => item.url === url)

    return null
}

function findVehicles(url){
    for(let i = 0; i < vehicles.length; i++)
        if(vehicles[i].some(item => item.url === url))
            return vehicles[i].find(item => item.url === url)
    return null
}

function characterDescription(character) {

    let temp = []
    let title = document.getElementsByClassName('title').item(0)
    title.textContent = character.name
    let description = document.getElementsByClassName('description').item(0)
    description.innerHTML = `${character.name} made an appearance in ${character.films.length} Star Wars movies.`
    for(let i =0 ; i <character.films.length; i++) {
        temp.push(findMovies(character.films[i]))
        console.log(temp)
        description.innerHTML += temp[i].title
    }
}



document.getElementsByClassName('card-block').item(0).addEventListener('click',function (){
    addCharacters(0); addPlanets(0); addStarships(0);addVehicles(0);addSpecies(0);})
document.getElementsByClassName('card-block').item(1).addEventListener('click',function (){
    addCharacters(1); addPlanets(1); addStarships(1);addVehicles(1);addSpecies(1);})
document.getElementsByClassName('card-block').item(2).addEventListener('click',function (){
    addCharacters(2); addPlanets(2); addStarships(2);addVehicles(2);addSpecies(2);})
document.getElementsByClassName('card-block').item(3).addEventListener('click',function (){
    addCharacters(3); addPlanets(3); addStarships(3);addVehicles(3);addSpecies(3);})
document.getElementsByClassName('card-block').item(4).addEventListener('click',function (){
    addCharacters(4); addPlanets(4); addStarships(4);addVehicles(4);addSpecies(4);})
document.getElementsByClassName('card-block').item(5).addEventListener('click',function (){
    addCharacters(5); addPlanets(5); addStarships(5);addVehicles(5);addSpecies(5);})

