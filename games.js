
// Define the game class

class Game {
    constructor(title, publisher, players, time, rating) {
        this.title = title
        this.publisher = publisher
        this.players = players
        this.time = time
        this.rating = rating  
    }
   
};

class UI {
    static displayGames() {
        const games = Store.getGames();

        games.forEach((game) => UI.addGameToLibrary(game));
    }

    static addGameToLibrary(game) {
        const list = document.querySelector('#library-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${game.title}</td>
        <td>${game.publisher}</td>
        <td>${game.players}</td>
        <td>${game.time}</td>
        <td>${game.rating}</td>
        <td><a href="#" class="delete">Remove</a></td>
        `;

        list.appendChild(row);
    }

    static deleteGame(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div')
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const shelf = document.querySelector('.shelf');
        const form = document.querySelector('#game-form');
        shelf.insertBefore(div, form);

        // timeout after 5 sec
        setTimeout(() => document.querySelector('.alert').remove(), 5000);
    }

    static clearInput() {
        document.querySelector('#title').value = '';
        document.querySelector('#publisher').value = '';
        document.querySelector('#players').value = '';
        document.querySelector('#time').value = '';
        document.querySelector('#rating').value = '';
    };
}

// STORAGE

class Store {
    static getGames() {
        let games;
        if(localStorage.getItem('games') === null) {
            games = [];
        } else {
            games = JSON.parse(localStorage.getItem('games'));
        } 
        
        return games;
    }

    static addGame(game) {
        const games = Store.getGames();

        games.push(game);

        localStorage.setItem("games", JSON.stringify(games));
    }

    static removeGame(title) {
        const games = Store.getGames();

        books.ForEach((game, title) => {
            if(book.title === title) {
                games.splice(index, 1);
            }
        });

        localStorage.setItem("games", JSON.stringify(games));
    }
}



// display the games when called

document.addEventListener('DOMContentLoaded', UI.displayGames);

// add a new game to library

document.querySelector('#game-form').addEventListener('submit', (e)=> {

    // prevent actual submit
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const publisher = document.querySelector('#publisher').value;
    const players = document.querySelector('#players').value;
    const time = document.querySelector('#time').value;
    const rating = document.querySelector('#rating').value;

    // validate all feilds

    if(title === '' || publisher === '' || players === '' || time === '' || rating === '' ) {
        UI.showAlert('Please fill in all fields', "fail");    
    } else {

        // create new game
        const game = new Game(title, publisher, players, time, rating);

        // add game to UI
        UI.addGameToLibrary(game);

        //add game to library
        Store.addGame(game);

        // confirmation alert
        UI.showAlert("Game added to library!", "pass");

        // clear input after submit
        UI.clearInput();
    }
});


// remove game from library

document.querySelector('#library-list').addEventListener('click', (e) => {
    UI.deleteGame(e.target)

    // remove game from localstorage
    Store.removeGame(title);


    // confirmation message
    UI.showAlert("Game removed successfully", "pass");

});

