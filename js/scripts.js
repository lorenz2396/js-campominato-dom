const button = document.querySelector('.button');

button.addEventListener('click',
    function(){
        const difficultSelector = document.querySelector('header > select');
        console.log(difficultSelector.value)
        
        const cellNumber = parseInt(difficultSelector.value)
        console.log(cellNumber)
        
        // let cellNumber;
        // if(difficultSelector == 'easy'){
        //    cellNumber = 100; 
        // }
        // else if(difficultSelector == 'medium'){
        //     cellNumber = 81;
        // }
        // else if(difficultSelector == 'difficult'){
        //     cellNumber = 49;
        // }

        //TODO generare 16 numeri casuali unici
        const bombs = [];
        while(bombs.length < 16){
            const newNumber = getRandomNumber(1, cellNumber)
            if (!bombs.includes(newNumber)){
                 bombs.push(newNumber);
            }
           
            console.log(bombs)
        }

        createBoard(cellNumber, bombs);

    }
);

function createBoard(cellNumber, bombs){
    console.log(bombs);
    const gridContainer = document.querySelector('.grid-container');
    gridContainer.innerHTML = '';

    for (let i = 1; i <= cellNumber; i++) {
        const newCell = createElement(i, bombs);
        newCell.classList.add('cells-' + cellNumber);

        gridContainer.append(newCell);
    }
};


function createElement(content, arr){
    const newCell = document.createElement('div');
    newCell.innerHTML = `${content}`
    newCell.classList.add('cell');
    newCell.addEventListener('click', function () {

        const clickedBombs = document.querySelectorAll('.is-bomb');  //con all sono tutti array
        const clickedNotBombs = document.querySelectorAll('.active:not(.is-bomb)');
        const totalCells = document.querySelectorAll('.cell');
        const remaingCells = totalCells.length - arr.length - clickedNotBombs.length;  // Prima di aggiunger el'ultimo click

        if(clickedBombs.length == 0 && remaingCells > 0) // Non ho cliccato su nessuna bomba
        {
            // newCell.addEventListener('click', function (e) {
            console.log(this.innerText);  //che numero c'è dentro la cella, contenuto testuale cella
            this.classList.toggle('active');

            console.log('Punteggio Attuale: ', clickedNotBombs.length);
            console.log('Celle Totali: ', totalCells.length);
            console.log('Puoi ancora cliccare su: ', remaingCells);

            if(arr.includes(parseInt(this.innerText))){
                this.classList.add('is-bomb');
                alert('Hai perso! Hai totalizzato: ' + clickedNotBombs.length + ' punti');
                
            }
            else if(remaingCells == 1){
                alert('Hai Vinto!!');
            }
        }
        else{
            console.log('Partita Terminata')
        }
    });

    return newCell;
};



function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
};