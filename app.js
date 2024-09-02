//Pulls and global assigns
const upgrades = document.getElementById("upgrades");
const cookieBtn = document.getElementById("cookie-img");
const countValue = document.getElementById("count-value");
const cookiePS = document.getElementById("cookie-ps");
const lContent = document.getElementById("left-content");
const vWrapper = document.getElementById("value-wrapper");
const bContent = document.getElementById("bot-content");
const dButton = document.getElementById("dark-mode");
const lButton = document.getElementById("light-mode");

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
  try {
    //attempt to fetch the upgrade data from the API

    let promise = await fetch(
      "https://cookie-upgrade-api.vercel.app/api/upgrades"
    );

    if (!promise.ok) {
      throw new Error(`HTTP error! Status: ${promise.status}`);
    }
    let promData = await promise.json();

    promData.forEach((upgrade) => {
      //assign the values of upgrade name, cost and icrement to variables.
      let uIndex = upgrade.index;
      let uName = upgrade.name;
      let uCost = upgrade.cost;
      let uIncrease = upgrade.increase;
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

      //Pulling the recently rendered elements to manipulate in js
      const uContainers = document.querySelectorAll(".upgrade-container");
      const uValues = document.querySelectorAll(".upgrade-value");
      const uNames = document.querySelectorAll(".upgrade-name");

      dButton.addEventListener("click", () =>
        makeDark(uContainers, uValues, uNames)
      );
      lButton.addEventListener("click", () =>
        makeLight(uContainers, uValues, uNames)
      );
    });
  } catch (error) {
    console.error("Error populating upgrade data:", error);
    alert("There was an issue loading upgrade data. Please try again later.");
  }
}
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
  // if (localStorage.getItem("theme")){
  //   if(localStorage.getItem("theme")!= "light"){
  //     makeDark
  //   }
  // }
}

function makeDark(uContainers, uValues, uNames) {
  localStorage.setItem("theme", "darkmode");
  lContent.style.backgroundColor = "#3e2723";
  vWrapper.style.backgroundColor = "#880e4f";
  bContent.style.backgroundColor = "#2f4f4f";
  uContainers.forEach((uCon) => {
    uCon.style.border = "1px solid #b8860b";
    uCon.classList.add("darkmode");
  });
  uValues.forEach((value) => {
    value.style.color = "beige";
  });
  uNames.forEach((name) => {
    name.style.textShadow = "2px 1px 5px #b8860b";
    // name.style.color = "beige";
  });
}

function makeLight(uContainers, uValues, uNames) {
  localStorage.setItem("theme", "lightmode");
  lContent.style.backgroundColor = "chocolate";
  vWrapper.style.backgroundColor = "pink";
  bContent.style.backgroundColor = "slategray";

  // console.log(uContainers);
  uContainers.forEach((uCon) => {
    uCon.style.border = "1px solid goldenrod";
    // uCon.style.color = "darkslategrey";
    uCon.classList.remove("darkmode");
  });
  uValues.forEach((value) => {
    value.style.color = "darkgoldenrod";
  });
  uNames.forEach((name) => {
    name.style.textShadow = "2px 1px 5px goldenrod";
  });
}

populateUpgradeData();
