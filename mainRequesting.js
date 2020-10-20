//This is the main file of the logic for the requested data of any api !


document.addEventListener("DOMContentLoaded", function() {

    document.querySelector("form").addEventListener("submit", function(event) {
        event.preventDefault();
    });

    //First we need to grab the div, where we are going to save
    //all the data from the API

    let dataDiv = document.getElementById("formatted-data");

    //We need to grab the url input to check the url
    let inputForm = document.getElementById("url");

    //We need also grab the button, to add a event listener for the click
    let buttonForm = document.getElementById("btn-form");

    buttonForm.addEventListener("click", handleClick);

    //We create the function for the handle click
    function handleClick() {

        let url = inputForm.value;

        console.log(url);

        if (checkUrl(url)) {
           
            //Now we need to fetch to that URL provided, of course if it's a valid URL
            //for a API
            //In this example i'll test this to the pokemon API
            //https://pokeapi.co/api/v2/pokemon/bulbasaur

            // fetch(url)
            //     .then(response => response.json())
            //     .then(data => console.log(data)); 
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    let data = JSON.parse(this.response);
                    console.log(data);
                    let formattedData = `
                        <p>Name: ${data.name}</p>
                        <p>Abilities:</p>
                        <p>${data.abilities.map(skill => skill.ability.name)}</p>
                    `;
                    dataDiv.innerHTML += formattedData;
                }
            }; 
            

            xhr.open("GET", url);
            xhr.send();
        }else {
            alert("That's a bad url, try again");
        }        
    }


    //I'm going to add a function to the input, a regex expression
    //that's going to check for any url and if it's valid is going
    //to return that URL
    function checkUrl(url) {
        //Regex
        let regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

        if (url.match(regex)) {
            return url;
        }else {
            return false;
        }
    }


});