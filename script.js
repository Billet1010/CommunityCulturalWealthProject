

// navigation
const navigationalBoard = document.getElementById("navigationalBoard");

// title
const title = document.getElementById("title");
let bottomOfTitle = title.getBoundingClientRect().bottom + window.scrollY;


// scroll
let scrollTop = window.scrollY;


window.addEventListener('resize', () => {

    bottomOfTitle = title.getBoundingClientRect().bottom + window.scrollY;

});

let defaultState = false;


window.addEventListener('scroll', () => {

    scrollTop = window.scrollY;

    const calculation = scrollTop > bottomOfTitle;

    if( calculation && !defaultState){

        runAnimation("navigationBoardAnimationForward");
         defaultState = true;

    } else if(!calculation && defaultState){

        runAnimation("navigationBoardAnimationReverse");
        defaultState = false;

    }

});

function runAnimation(className){

    navigationalBoard.classList.remove("navigationBoardAnimationForward", "navigationBoardAnimationReverse");
    void navigationalBoard.offsetWidth;
    navigationalBoard.classList.add(className);

}
