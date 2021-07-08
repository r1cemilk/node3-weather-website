const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#msg1');
const msg2 = document.querySelector('#msg2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  msg1.textContent = 'lodaing...';
  msg2.textContent = '';

  const location = search.value;

  fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        msg1.textContent = 'lodaing...';
        msg2.textContent = 'No address provided!';
      } else if (data.address === undefined) {
        msg1.textContent = 'lodaing...';
        msg2.textContent = 'Invalid location';
      } else {
        msg1.textContent = data.address;
        msg2.textContent = data.forecast;
        console.log(data.address);
        console.log(data.forecast);
      }
    });
  });
});
