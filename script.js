

// navigation
const navigationalBoard = document.getElementById("navigationalBoard");

// bar
const bar = document.getElementById("beforeBar");
const barDiv = document.getElementById("bar");
bar.style.top = "-100%";

// title
const title = document.getElementById("title");
let bottomOfTitle = title.getBoundingClientRect().bottom + window.scrollY;

// family

const familialDiv = document.getElementById("familialDiv");

// linguistic

const linguisticDiv = document.getElementById("linguisticDiv");

// aspiration

const aspirationalDiv = document.getElementById("aspirationalDiv");

// paragraph

const paragraphDiv = document.getElementById("paragraph");


// scroll
let scrollTop = window.scrollY;
console.log(bottomOfTitle);


window.addEventListener('resize', () => {

    bottomOfTitle = title.getBoundingClientRect().bottom + window.scrollY;
    console.log(bottomOfTitle);

});

let defaultState = false;


window.addEventListener('scroll', () => {

    scrollTop = window.scrollY;

    const calculation = scrollTop > bottomOfTitle;

    if( calculation && !defaultState){

        runAnimation("navigationBoardAnimationForward");
        runBarAnimation("barAnimationForward");
         defaultState = true;

    } else if(!calculation && defaultState){

        runAnimation("navigationBoardAnimationReverse");
        runBarAnimation("barAnimationReverse");
        defaultState = false;

    }

    updateBar();

});

function updateBar(){

    const scrollableHeight = document.documentElement.scrollHeight - paragraphDiv.getBoundingClientRect().height;


    const scrollPercent = ((scrollTop / scrollableHeight) * 100);

    bar.style.top =  "-" + (100 - scrollPercent) + "%";

}

function runAnimation(className){

    navigationalBoard.classList.remove("navigationBoardAnimationForward", "navigationBoardAnimationReverse");
    void navigationalBoard.offsetWidth;
    navigationalBoard.classList.add(className);

}

function runBarAnimation(className){
    barDiv.classList.remove("barAnimationForward", "barAnimationReverse");
    void barDiv.offsetWidth;
    barDiv.classList.add(className);
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            runCardAnimation(entry.target, "cardAnimationForward");
        } else {
            runCardAnimation(entry.target, "cardAnimationReverse");
        }
    });
}, {threshold: 0.2});

observer.observe(aspirationalDiv);
observer.observe(linguisticDiv);
observer.observe(familialDiv);
observer.observe(paragraphDiv);


function runCardAnimation(obj, className){

    obj.classList.remove("cardAnimationForward", "cardAnimationReverse");
    void obj.offsetWidth;
    obj.classList.add(className);

}


//buttons

function aspirationButton(){
    aspirationalDiv.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}

function familialButton(){
    familialDiv.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });

}

function linguisticButton(){
    linguisticDiv.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}

function paragraphButton(){
    paragraphDiv.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    })
}