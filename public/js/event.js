// console.log('your web ran');

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     const data = response.json().then(data => {
//         console.log(data)
//     });

// })


// // fetch('https://stackoverflow.com/questions/47809366/can-i-use-dom-query-methods-against-a-fetch-api-response').then(response=>{
// //     response.text().then(data=>{
// //         console.log(data);
// //     })
// // });


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');




weatherForm.addEventListener('submit', e => {
    e.preventDefault();
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    const location = search.value;
    fetch('/weather?location=' + location).then(response => {
        response.json().then(data => {
            if (data.err) {
                console.log(data.err);
                messageOne.textContent = data.err;
            } else {
                console.log(data.location);
                console.log(data.forecast);
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
});