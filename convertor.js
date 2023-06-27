let select = document.querySelectorAll(".currency");
let btn = document.getElementById("btn");
let input = document.getElementById("input");

function fetchCurrencies() {
  return new Promise((resolve, reject) => {
    fetch("https://api.frankfurter.app/currencies")
      .then((res) => res.json())
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
}

function displayDropDown(res) {
  let curr = Object.entries(res);
  for (let i = 0; i < curr.length; i++) {
    let opt = `<option value="${curr[i][0]}">${curr[i][0]}</option>`;
    select[0].innerHTML += opt;
    select[1].innerHTML += opt;
  }
}

function fetchConversionRate(curr1, curr2, inputVal) {
  return new Promise((resolve, reject) => {
    const host = "api.frankfurter.app";
    fetch(`https://${host}/latest?amount=${inputVal}&from=${curr1}&to=${curr2}`)
      .then((resp) => resp.json())
      .then((data) => resolve(Object.values(data.rates)[0]))
      .catch((error) => reject(error));
  });
}

fetchCurrencies()
  .then((res) => displayDropDown(res))
  .catch((error) => console.log(error));

btn.addEventListener("click", () => {
  let curr1 = select[0].value;
  let curr2 = select[1].value;
  let inputVal = input.value;
  if (curr1 === curr2) alert("Choose different currencies");
  else {
    fetchConversionRate(curr1, curr2, inputVal)
      .then((result) => (document.getElementById("result").value = result))
      .catch((error) => console.log(error));
  }
});
