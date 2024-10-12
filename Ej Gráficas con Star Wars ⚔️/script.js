//Practicaremos cómo crear gráficas con las librerías vistas en clase

//Pediremos las películas de Star Wars y pintaremos una gráfica de líneas en la que podamos ver cada una de las películas.
//En el eje X el nombre de la película
//En el eje Y año de publicación
//API ENDPOINT --> https://swapi.dev/api/films/


async function getTitleAndDate() {
    try {
        let response = await fetch(`https://swapi.dev/api/films/`)
        if (!response.ok) {
            // Si el código de respuesta no está en el rango 200-299, se lanza un error
            throw new Error('Personaje no encontrado');
        }
        //objeto de respeusta en un jeison
        let data = await response.json();
        return data.results;
    }
    catch {
        (error) => console.log("hubo un error" + error)
    };
}

getTitleAndDate().then(result => {
    console.log(result)
    let datosArray = result.map(item => {
        let title = item.title
        let anios = item.release_date.split("-")[0]

        return { title, anios }
    })
    console.log(datosArray)

    let arrTitle = datosArray.map(item => item.title)
    let arrAnios = datosArray.map(item => item.anios)

    console.log("arrTitle", arrTitle)
    console.log("arrAnios", arrAnios);

    new Chartist.Line('.ct-chart1', {
        labels: arrTitle,
        series: [arrAnios]
    }, {
        fullWidth: true,
        chartPadding: {
            right: 40
        }
    });
})

// 2 Pediremos los personajes de Star Wars y pintaremos una gráfica de barras en la que podamos ver
//En el eje X el nombre del personaje
//En el eje Y el número de películas en las que ha participado.
//API ENDPOINT --> https://swapi.dev/api/people/

async function getNameAndFilms() {
    try {
        let response = await fetch("https://swapi.dev/api/people/")
        if (!response.ok) {
            // Si el código de respuesta no está en el rango 200-299, se lanza un error
            throw new Error('Personaje no encontrado');
        }
        //objeto de respeusta en un jeison
        let data = await response.json();
        return data.results;
    }
    catch {
        (error) => console.log("hubo un error" + error)
    };
}
getNameAndFilms().then(result => {
    
    let datosArray2 = result.map(item => {
        let names = item.name
        let films = item.films.length

        return { names, films }
    })
   

    let arrNames = datosArray2.map(item => item.names)
    let arrFilms = datosArray2.map(item => item.films)

    new Chartist.Bar('.ct-chart2', {
        labels: arrNames,
        series: arrFilms
      }, {
        distributeSeries: true
      });
})
