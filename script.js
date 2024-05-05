/**
 * Roy Jiang
 * 05/04/2024
 * 
 * This module contains event-handling functions for the gambling utilities page.
 */

(function() {
    "use strict";

    /**
     * Intialization function for the gambling utilities page. Initializes all event listeners.
     * @param none 
     * @returns none
     */
    function init() {
        let selection = qs("#util-picker");
        selection.addEventListener("change", changeUtil);

        let util = qs("#util");
        util.addEventListener("click", useUtil);

        let menuToggle = qs("header > button");
        menuToggle.addEventListener("click", toggleMenu);
    }

    /**
     * Toggles the menu visibility. If the menu is visible, hides it. If it's invisible, 
     * unhides it. 
     * @param none
     * @returns none
     */
    function toggleMenu() {
        let menu = qs("#select-side");
        if (menu.classList.contains("hidden")) {
            menu.classList.remove("hidden");
        }
        else {
            menu.classList.add("hidden");
        }
    }

    /**
     * Changes the utility being used depending on user selection. Sets a default depending 
     * on the utility chosen, and also updates classnames and alts. 
     * @param none 
     * @returns none
     */
    function changeUtil() {
        let util = qs("#util-picker").value; 
        let disp = qs("#util");
        if(util == "Dice") {
            disp.src = "assets/dice-1.svg";
            disp.alt = "Dice face 1";
            qs("#util").className = "dice";
        }
        else if(util == "Coin") {
            disp.src = "assets/tails.webp";
            disp.alt = "Coin face tails";
            qs("#util").className = "coin";
        }
        else if(util == "Card") {
            disp.src = "assets/cards/back.png";
            disp.alt = "Card";
            qs("#util").className = "card";
        }
    }

    /**
     * Scrolls to the bottom of list container/ 
     * @param none
     * @returns none
     */
    function scrollToBottom() {
        let listContainer = qs("#results > ul");
        listContainer.scrollTop = listContainer.scrollHeight;
    }

    /**
     * Utility use function. Depending on which utility is active, invokes the correct 
     * function so the utility functions as expected. 
     * @param none 
     * @returns none
     */
    function useUtil() {
        let utilUsed = qs("#util").className;
        if(utilUsed == "dice"){
            dice()
        }
        else if(utilUsed == "coin") {
            coin()
        }
        else if(utilUsed == "card") {
            card()
        }
        scrollToBottom();
    }

    /**
     * Randomly returns an integer between an inclusive range. 
     * @param {Number} min - minimum number to choose  
     * @param {Number} max - maximum number to choose
     * @returns {Number} random number between min and max, inclusive. 
     */
    function numBetween(min, max) { 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * Rolls a 6-sided dice and updates the UI to reflect the results of the roll. 
     * @param none 
     * @returns none
     */
    function dice() {
        const ROLL = numBetween(1, 6);
        let disp = qs("#util");
        disp.src = `assets/dice-${ROLL}.svg`;
        disp.alt = `Dice face ${ROLL}`;

        let results = qs("#results > ul");
        let newLi = document.createElement("li");
        newLi.textContent = `Dice: ${ROLL}`;
        results.appendChild(newLi);
    }

    /**
     * Flips a 2-sided coin and updates the UI to reflect the results of the flip. 
     * @param none 
     * @returns none
     */
    function coin() {
        const FLIP = numBetween(0, 1);
        let disp = qs("#util");

        let results = qs("#results > ul");
        let newLi = document.createElement("li");
        newLi.textContent = `Coin: `;

        if(FLIP == 0) {
            disp.src = `assets/heads.png`;
            disp.alt = "Coin face heads";
            newLi.textContent += 'Heads';
        }
        else {
            disp.src = `assets/tails.webp`;
            disp.alt = "Coin face tails";
            newLi.textContent += 'Tails';
        }
        results.appendChild(newLi);
    }

    /**
     * Draws a card from a standard 52-card deck and updates the UI to reflect 
     * the draw. 
     * @param none 
     * @returns none
     */
    function card() {
        const NUM = numBetween(1, 13); 
        const SUIT = numBetween(1, 4);
        let disp = qs("#util");
        let src = `assets/cards/${NUM}_of_`;

        let results = qs("#results > ul");
        let newLi = document.createElement("li");
        newLi.textContent = `Card: ${NUM} of `;

        if(SUIT == '1') {
            src += 'clubs.png';
            newLi.textContent += 'clubs';
        }
        else if(SUIT == '2') {
            src += 'diamonds.png';
            newLi.textContent += 'diamonds';
        }
        else if(SUIT == '3') {
            src += 'hearts.png';
            newLi.textContent += 'hearts';
        }
        else {
            src += 'spades.png';
            newLi.textContent += 'spades';
        }
        disp.src = src;
        disp.alt = newLi.textContent;
        results.appendChild(newLi);
    }

    init(); 
})();