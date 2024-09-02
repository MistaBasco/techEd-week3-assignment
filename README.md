# techEd-week3-assignment

This readme file was auto-generated (and dev-reviewed) by chat-gpt using the main logic of the webapp (app.js)

Assignment Reflection
Requirements Achieved
🎯 Fetch upgrade data from the provided API and at least one upgrade from the API updates the cookie count:

The game successfully fetches upgrade data from the provided API endpoint (https://cookie-upgrade-api.vercel.app/api/upgrades). Users can purchase upgrades, which effectively update the cookies per second (CPS) and the cookie count.

🎯 Ensure that functions are used effectively to keep code organized and reusable:

Functions like populateUpgradeData(), clickCookie(), updateCount(), and others are utilized to keep the code modular, organized, and reusable. Each function handles specific tasks, contributing to a clean code structure.

🎯 Implement event listeners to handle user interactions:

Event listeners are implemented for various user interactions, including clicking the cookie image, purchasing upgrades, and toggling between light and dark themes. This ensures a responsive and interactive user experience.

🎯 Use local storage to save and restore the cookie count and relevant game information:

The game state, including the cookie count and CPS, is saved to localStorage and is restored when the game is reloaded. This ensures that user progress is preserved across sessions.

🎯 Use setInterval to increment the cookie count and manage the game state each second:

The setInterval function is used to increment the cookie count based on the current CPS every second. This also triggers updates to the game state and DOM, ensuring that the game progresses smoothly over time.

Stretch Requirements

🏹 Consolidate upgrade management by managing all upgrades in a single function:

The upgrade management logic is consolidated within the populateUpgradeData() function, where upgrades are fetched, processed, and rendered in the DOM. This approach centralizes upgrade management, making the code easier to maintain.

🏹 Fantastic use of README to provide important information such as a description of the project, how to deploy, and other app information:

This README file provides a comprehensive overview of the project, including how to set it up, play the game, and understand the code structure. This documentation helps others easily understand and contribute to the project.

🏹 Implement error handling using try/catch:

Error handling is implemented using try/catch within the populateUpgradeData() function to manage potential issues when fetching data from the API. If an error occurs, an error message is logged, and the user is notified with an alert.

Additional Reflections

While I was able to meet most of the requirements and some of the stretch goals, further improvements could be made to enhance the user experience. For example, adding more animations would make the game more engaging. I purposely chose not to include sound effects as they can be incredibly annoying and most people (myself) tend to turn them off. Additionally, creating a settings menu to allow users to adjust game options like sound effects or display preferences would provide more customization options. Overall, this project has been a valuable learning experience in applying JavaScript to create interactive web applications.
#########################################################################################################################################################################
Cookie Clicker Game
This project is a simple "Cookie Clicker" game where users can accumulate cookies by clicking on a cookie image. Users can purchase upgrades to increase their cookies per second (CPS), and they can toggle between light and dark modes. The game data is saved to localStorage, so the user's progress persists across sessions.

Features
Click to Collect Cookies: Click the cookie image to increase your cookie count.
Upgrades: Purchase upgrades to automatically generate more cookies per second.
Theme Toggle: Switch between light and dark mode for a customized visual experience.
Auto-save: The game automatically saves your progress (cookie count and CPS) using localStorage.
Getting Started
Prerequisites
A modern web browser that supports JavaScript and fetch API.
Installation
Clone the repository or download the project files.
Open index.html in your web browser.
How to Play
Click the Cookie: Start by clicking on the cookie image to accumulate cookies.
Purchase Upgrades: When you have enough cookies, you can buy upgrades by clicking on the available upgrade options. Upgrades increase your CPS (cookies per second).
Switch Themes: Use the provided buttons to switch between light mode and dark mode.
Game Elements
Cookie Image: Clicking on this increases your cookie count.
Cookie Counter (cookieCounter): Displays the current number of cookies you have.
Cookies Per Second (cPerSecond): Displays how many cookies you are generating per second.
Upgrades: Available upgrades fetched from an external API, each with a cost and an increase in CPS.
Theme Buttons: Buttons to toggle between light and dark modes.
Code Overview
Global Variables
DOM Elements:

upgrades: The container for displaying available upgrades.
cookieBtn: The clickable cookie image.
countValue: Displays the current cookie count.
cookiePS: Displays the current cookies per second.
lContent, vWrapper, bContent: Elements used for theme customization.
dButton, lButton: Buttons for toggling between dark and light modes.
Game Variables:

cookieCounter: Tracks the number of cookies collected by the user.
cPerSecond: Tracks the rate at which cookies are automatically generated.
Functions
populateUpgradeData(): Fetches upgrade data from an API and dynamically generates upgrade elements in the DOM.
clickCookie(): Handles the event when the user clicks on the cookie, incrementing the cookie counter.
updateCount(): Updates the displayed cookie count.
updateCPS(): Updates the displayed cookies per second.
formatCount(count): Formats the cookies per second display.
updateAll(): Updates both the cookie count and CPS, and saves the current game state.
updateStorage(): Saves the current game state to localStorage.
loadGame(): Loads the game state from localStorage when the game starts.
makeDark(uContainers, uValues, uNames): Applies dark mode styles to the game.
makeLight(uContainers, uValues, uNames): Applies light mode styles to the game.
Event Listeners
Cookie Click: Increments the cookie counter.
Upgrade Click: Purchases an upgrade if the user has enough cookies.
Theme Toggle Buttons: Switches between light and dark mode.
API Integration
The game fetches upgrade data from the following API endpoint:

https://cookie-upgrade-api.vercel.app/api/upgrades
This API provides information about each upgrade, including its name, cost, and the increase in CPS it provides.

Error Handling
If the API call to fetch upgrade data fails, an error message is displayed to the user.
Future Improvements
Add more features such as achievements, additional upgrades, and animations.
Implement a more sophisticated save/load system with cloud storage.
Expand the theme options beyond just light and dark modes.
License
This project is open-source and available under the MIT License.
