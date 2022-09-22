import "./styles.css";
let table = document.getElementById("table");
let tbody = document.getElementById("tbody");
let thead = document.getElementById("thead");
let body = document.getElementById("body");

let title1 = document.createElement("th");
let title2 = document.createElement("th");
title1.innerText = "municipality";
thead.appendChild(title1);
title2.innerText = "population";
thead.appendChild(title2);

table.appendChild(thead);
table.appendChild(tbody);

body.appendChild(table);

async function getData() {
  const url =
    "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff";
  const dataPromise = await fetch(url);
  const data = await dataPromise.json();
  const cityData = data.dataset.dimension.Alue.category.label;
  const cityValueJSON = data.dataset.value;
  // got help from course assistent with data and loop
  let x = Object.values(cityData);

  for (let i = 0; i < x.length; i++) {
    let row = document.createElement("tr");
    let cell1 = document.createElement("td");
    let cell2 = document.createElement("td");

    cell1.innerText = x[i];
    cell2.innerText = cityValueJSON[i];
    row.appendChild(cell1);
    row.appendChild(cell2);
    table.appendChild(row);
  }
}

getData();
