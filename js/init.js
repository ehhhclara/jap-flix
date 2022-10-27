const database = "https://japceibal.github.io/japflix_api/movies-data.json";
var movies = [];

let getJSONData = function (url) {
    let result = {};
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function (response) {
            result.status = 'ok';
            result.data = response;
            return result;
        })
        .catch(function (error) {
            result.status = 'error';
            result.data = error;
            return result;
        });
}

document.addEventListener("DOMContentLoaded", function (event) {

    getJSONData(database).then(function (datos) {
        movies = datos;
        if (movies.status === "ok") {
            document.getElementById('btnBuscar').addEventListener('click', function (event) {
                let busqueda = document.getElementById('inputBuscar').value.toLowerCase()
                for (let movie of movies.data) {
                    ok1 = false
                    if (((movie.title.toLowerCase().includes(busqueda))
                        ||
                        (movie.tagline.toLowerCase().includes(busqueda))
                        ||
                        (movie.overview.toLowerCase().includes(busqueda)))
                    ) {
                        ok1 = true;
                    }
                    for (let genre of movie.genres) {
                        if (genre.name.toLowerCase().includes(busqueda)) {
                            ok1 = true
                        }

                    }
                    if (ok1 == true) {
                        let htmlContentToAppend = ``
                        htmlContentToAppend += `
                <div class="elementolista">
                <li>
                <a class="title" onclick="mostrarCanvas(${movie.id})" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">${movie.title}</a>
                
                `
                for (let count = 1; count <= 5; count++){
                    if (count <= Math.round(movie.vote_average/2)) {
                        htmlContentToAppend += `<span class="fa fa-star checked"></span>`;
                        } 
                    else {
                        htmlContentToAppend += `<span class="fa fa-star unchecked"></span>`;
                        }
                    }
                    htmlContentToAppend += ` 
                <h5 id="tagline">${movie.tagline}</h5>
                </li >
                <br>
                </div>
                    `
                    document.getElementById('lista').innerHTML += htmlContentToAppend;
            }
            
        };

            })
        }
    })
})
function mostrarCanvas(id){
    for (let movie of movies.data){
     if (movie.id==id){
        htmlContentToAppend=''
        htmlContentToAppend = `
            <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" id="botonmasinformacion"type="button" data-bs-toggle="dropdown" aria-expanded="false">
         Más información
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item">Año de lanzamiento: ${movie.release_date}</a></li>
          <li><a class="dropdown-item">Duración del largometraje: ${movie.runtime}mins</a></li>
          <li><a class="dropdown-item">Presupuesto de realización: $${movie.budget}</a></li>
          <li><a class="dropdown-item">Ganancias obtenidas: $${movie.revenue}</a></li>
        </ul>
        </div>
        <h2 id="canvatitle">${movie.title}</h2>
        <p id="canvaoverview">${movie.overview}</p>
        <hr>
        `
        for(let genre of movie.genres){
        htmlContentToAppend += `
        <span>${genre.name} -</span>
        `}
        document.getElementById('descripcion').innerHTML = htmlContentToAppend;
     }   

    }
}

