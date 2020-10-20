export let people = []
export let planets = []
export let movies = []
export let starships = []
export let vehicles = []
export let species = []

function loadData(url, isMovie, isCharacter, isPlanet, isStarship, isSpecies, isVehicle) {
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
            if(isMovie) {
                setMovies(data)
            }
            else if(isCharacter){
                setPeople(data)
                loadData(data.next,false, true, false, false, false, false)
            }
            else if(isPlanet){
                setPlanets(data)
                loadData(data.next,false, false, true, false, false, false)
            }
            else if(isVehicle){
                setVehicles(data)
                loadData(data.next,false, false, false, false, false, true)
            }
            else if(isStarship){
                setStarships(data)
                loadData(data.next,false, false, false, true, false, false)
            }
            else if(isSpecies){
                setSpecies(data)
                loadData(data.next,false, false, false, false, true, false)
            }
        })
        .catch((err) => {
            console.error(err)
        })
}

function setMovies(data){
    movies.push(data.results)
}

function setPlanets(data){
    planets.push(data.results)
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

function setVehicles(data){
    vehicles.push(data.results)
}

function findObject(key, variable, byUrl){
    for(let i = 0; i < variable.length; i++){
        for(let j = 0; j< variable[i].length; j++)
        {
            let arr = variable[i]
            if(byUrl) {
                if (arr[j].url.includes(key))
                    return arr[j]
            }
            else if(!byUrl) {
                if (arr[j].name.includes(key))
                    return arr[j]
            }
        }
    }
    return null
}

function findMovie(name){
    for(let i = 0; i < movies[0].length; i++){
        let arr = movies[0][i]
        if(arr.title.includes(name))
            return i
    }
    return null
}


export {loadData, findObject, findMovie};

window.addEventListener('load',  () => {
    loadData('https://swapi.dev/api/planets/',false, false, true, false, false, false);
    loadData('https://swapi.dev/api/people/',false, true, false, false, false, false);
    loadData('https://swapi.dev/api/species/',false, false, false, false, true, false);
    loadData('https://swapi.dev/api/starships/',false, false, false, true, false, false);
    loadData('https://swapi.dev/api/vehicles/',false, false, false, false, false, true);
});

