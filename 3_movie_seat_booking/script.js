const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value; //turns it to number (+)

//updates total and count
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;

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
    updateSelectedCount();
});