import "./styles.css";

//Maker Petra
// Got help from course assistant and used course material
let table = document.getElementById("table");
let tbody = document.getElementById("tbody");
let thead = document.getElementById("thead");

let title1 = document.createElement("th");
let title2 = document.createElement("th");
let title3 = document.createElement("th");
let title4 = document.createElement("th");
title1.innerText = "Municipality";
thead.appendChild(title1);
title2.innerText = "Population";
thead.appendChild(title2);
title3.innerText = "Employment";
thead.appendChild(title3);
title4.innerText = "Employment-%";
thead.appendChild(title4);

table.appendChild(thead);
table.appendChild(tbody);

getData();

async function getData() {
  const url =
    "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff";
  const dataPromise = await fetch(url);
  const data = await dataPromise.json();
  const cityData = data.dataset.dimension.Alue.category.label;
  const cityValueJSON = data.dataset.value;

  const url2 =
    "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065";
  const empPromise = await fetch(url2);
  const empJSON = await empPromise.json();
  const empValue = empJSON.dataset.value;

  // got help from course assistent with data and loop
  let x = Object.values(cityData);

  for (let i = 0; i < x.length; i++) {
    let row = document.createElement("tr");
    let cell1 = document.createElement("td");
    let cell2 = document.createElement("td");
    let cell3 = document.createElement("td");
    let cell4 = document.createElement("td");
    let y = divide(empValue[i], cityValueJSON[i]);

    cell1.innerText = x[i];
    cell2.innerText = cityValueJSON[i];
    cell3.innerText = empValue[i];
    cell4.innerText = y + "%";
    //how to style background colcor. Help from https://www.w3schools.com/jsref/prop_style_background.asp
    if (y > 45) {
      row.style.backgroundColor = "#abffbd";
    }
    if (y < 25) {
      row.style.backgroundColor = "#ff9e9e";
    }
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);
    tbody.appendChild(row);
  }
}
function divide(a, b) {
  // how to round decimals? Help from https://www.w3schools.com/jsref/jsref_tofixed.asp
  let o = (a / b) * 100;
  return o.toFixed(2);
}
