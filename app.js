//Pulls and global assigns
const upgrades = document.getElementById("upgrades");
const cookieBtn = document.getElementById("cookie-img");
const countValue = document.getElementById("count-value");
const cookiePS = document.getElementById("cookie-ps");

let cookieCounter = 100;
let cPerSecond = 0;
loadGame();
let intervalID = setInterval(() => {
  cookieCounter += cPerSecond;
  updateAll();
}, 1000);
updateCount();
updateCPS();

//Create and Populate Upgrade Data
async function populateUpgradeData() {
  let promise = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );
  let promData = await promise.json();
  //   console.log(promData);
  const uArray = [];
  promData.forEach((upgrade) => {
    //assign the values of upgrade name, cost and icrement to variables.
    let uIndex = upgrade.index;
    let uName = upgrade.name;
    let uCost = upgrade.cost;
    let uIncrease = upgrade.increase;
    // console.log(uName + " " + uCost);
    //create and format the data containers
    const costTag = document.createElement("h2");
    costTag.classList.add("upgrade-header");
    costTag.innerText = "Cost: ";
    const incTag = document.createElement("h2");
    incTag.classList.add("upgrade-header");
    incTag.innerText = "Increment: ";

    const nameDiv = document.createElement("div"); // create a div container for name elements
    nameDiv.classList.add("upgrade-name"); // give the div a class of upgrade-name
    const nameTag = document.createElement("h2"); //create an h2 tag
    nameTag.classList.add("upgrade-header");
    nameTag.innerText = uName; // populate the tag with upgradename (pulled from API)
    nameDiv.appendChild(nameTag);
    const costDiv = document.createElement("div"); // create a div container for cost elements
    costDiv.classList.add("upgrade-cost"); //giv the div a class of upgrade-cost
    costDiv.appendChild(costTag); // add the costTag div, created in global scope, to the costDiv
    const costName = document.createElement("h2");
    costName.innerText = uCost;
    costName.classList.add("upgrade-value");
    costDiv.appendChild(costName);

    const incDiv = document.createElement("div"); //create a div container for increment elements
    incDiv.classList.add("upgrade-inc"); //give the div a class of upgrade-inc
    incDiv.appendChild(incTag); // add the incTag div, created in globl scope to the incDiv
    const incValue = document.createElement("h2");
    incValue.innerText = uIncrease;
    incValue.classList.add("upgrade-value");
    incDiv.appendChild(incValue);

    const uBox = document.createElement("div");
    uBox.classList.add("upgrade-container");
    //render data containers
    uBox.appendChild(nameDiv);
    uBox.appendChild(costDiv);
    uBox.appendChild(incDiv);
    uBox.addEventListener("click", () => {
      console.log(cookieCounter + " " + uCost);
      if (cookieCounter >= uCost) {
        cookieCounter -= uCost;
        cPerSecond += uIncrease;
        updateCount();
      } else {
        let diff = uCost - cookieCounter;
        alert(`You cannot afford this! you need ${diff} more cookies!`);
      }
    });
    upgrades.appendChild(uBox); //because 'upgrades' is an element that already exists in the DOM, this will "render the upgrades"
  });
}
populateUpgradeData();

///Event Listeners

cookieBtn.addEventListener("click", clickCookie);

//Functions
function clickCookie() {
  //   cookieBtn.style.rotate = "90deg";
  cookieCounter++;
  updateCount();
}
function updateCount() {
  countValue.innerText = cookieCounter;
}
function updateCPS() {
  cookiePS.innerText = formatCount(cPerSecond);
}

function formatCount(count) {
  const countStr = String(count);
  const padding = " ".repeat(Math.max(0, 4 - countStr.length));
  return countStr + padding + "c/s";
}
function updateAll() {
  updateCount();
  updateCPS();
  updateStorage();
}
function updateStorage() {
  localStorage.setItem("cookieCount", cookieCounter);
  localStorage.setItem("cookiePS", cPerSecond);
}

function loadGame() {
  if (localStorage.getItem("cookieCount") && localStorage.getItem("cookiePS")) {
    cookieCounter = JSON.parse(localStorage.getItem("cookieCount"));
    cPerSecond = JSON.parse(localStorage.getItem("cookiePS"));
  }
}
