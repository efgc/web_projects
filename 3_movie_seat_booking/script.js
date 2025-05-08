const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value; //turns it to number (+)

//save selected movie index and price
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//updates total and count
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    //we convert the nodes to an array, then we map it
    const seatsIndex = [...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat);

    });

    //with arrow function
    //const seatsIndex = [...selectedSeats].map(seat=>[...seats].indexOf(seat));

    //we convert the selected seats array to string using   
    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));


    console.log(seatsIndex);
    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;

}

//get data from local storage and populate UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) =>{
            //check if element exists on array
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = JSON.parse(localStorage.getItem('selectedMovieIndex'));
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }

 
    
}

//seat clic event
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});

//movie select event
movieSelect.addEventListener('click', (e) => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

//initialize count and total set
updateSelectedCount();