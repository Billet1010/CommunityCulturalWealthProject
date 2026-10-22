

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

//butonts

const but1 = document.getElementById("but1");
const but2 = document.getElementById("but2");
const but3 = document.getElementById("but3");
const but4 = document.getElementById("but4");


// scroll
let scrollTop = window.scrollY;

//styling constants for button
const stylingForButton = `
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 16px;
`;

// const for the button mapping
const buttonMap = new Map([
    [aspirationalDiv, but1],
    [familialDiv, but2],
    [linguisticDiv, but3],
    [paragraphDiv, but4]   
]);

//text appear m
const textMap = new Map([
    [aspirationalDiv, 
        `
            To maintain the hopes 
            and ambitions of a goal,
            through all physical and
            mental barriers. To dream
            about the possibilities
            in the future without
            real means of attaining
            the goal at current
            state.  
        `
    ],
    [familialDiv,
        `
            The cultural knowledges,    
            cultivated by family members 
            that carry a sense of community,
            history, memory, and cultural intuition. 
            Familial capital can also reach out to 
            “extended family,” who can include 
            friends, dead families, and cousins. 
            Familial capital can be fostered 
            between different “families” through 
            sports, school, and religious gatherings.
        `
    ],
    [linguisticDiv,
        `
            Networks of people and commuty 
            who provide instrumental and emotional 
            support to navigate through the hardships 
            of society's institutions. Networks 
            can help people attain their goals, 
            such as higher education, job opportunities, 
            and healthcare, as made prominent with
            People of Color, who use their social 
            capital to attain their goals.
        `
    ],
    [paragraphDiv, 
        `
            The community cultural wealth that is seen 
        in my project includes: aspirational wealth, 
        familial wealth, and social wealth. Aspirational 
        capital is the hopes and ambitions towards a 
        goal in life, even in the face of struggles
        and obstacles. Aspirational capital can also 
        extend to dreams of possibilities, even if 
        they aren't obtainable in the present state. 
        Familial capital is the wealth of culture, 
        knowledge, and memory that is nurtured through 
        the family. The family can include extended 
        family, which includes school, sports teams, 
        distant relatives, and ancestors of the past.
        Social capital is the peers and contacts that 
        can help people move through society's many 
        systems and institutions. In other words, the 
        help provided by peers can be instrumental and 
        emotional support in navigating the institutions. 
        This project is an example of my aspirations 
        to become an engineer, as I would never have 
        gotten interested in computer science or 
        computer-aided design without my aspirations; 
        my family has also nurtured me towards the 
        engineering field, supporting me on my journey. 
        By surrounding myself with many friends who 
        aspire to be engineers, they can receive 
        instrumental support with many things, 
        including this project.
        `
    ]
]);

const mappingText = new Map([

    [aspirationalDiv, 'aText'],
    [familialDiv, 'fText'],
    [linguisticDiv, 'lText'],
    [paragraphDiv, 'text']
    
]);

const mappingImage = new Map([

    [aspirationalDiv, 'aImage'],
    [familialDiv, "fImage"],
    [linguisticDiv, "lImage"],
    [paragraphDiv, '']

]);

// recalculates bottomOfTitle
window.addEventListener('resize', () => {

    bottomOfTitle = title.getBoundingClientRect().bottom + window.scrollY;

});

// function variable **important
let defaultState = false;

//updates the scroll var, and triggers bar animation when title goes away, and vice versa
window.addEventListener('scroll', () => {

    scrollTop = window.scrollY;

    const calculation = scrollTop > bottomOfTitle;

    if( calculation && !defaultState){

        runAnimation("navigationBoardAnimationForward");
        runBarAnimation("barAnimationForward");
        defaultState = true;
        but1.style = "";
        but2.style = "";
        but3.style = "";
        but4.style = "";

    } else if(!calculation && defaultState){

        runAnimation("navigationBoardAnimationReverse");
        runBarAnimation("barAnimationReverse");
        defaultState = false;
        but1.style = "";
        but2.style = "";
        but3.style = "";
        but4.style = "";

    }

    updateBar();

});

// custom scrollbar, for the p element inside the bar
function updateBar(){

    const scrollableHeight = document.documentElement.scrollHeight - paragraphDiv.getBoundingClientRect().height;

    const scrollPercent = ((scrollTop / scrollableHeight) * 100);

    bar.style.top =  "-" + (100 - scrollPercent) + "%";

}

//important animations
    // navigational board animation, delets all animation and reapplies
    function runAnimation(className){

        navigationalBoard.classList.remove("navigationBoardAnimationForward", "navigationBoardAnimationReverse");
        void navigationalBoard.offsetWidth;
        navigationalBoard.classList.add(className);

    }

    // bar animation, deletes the animation and reapplies one animation
    function runBarAnimation(className){
        barDiv.classList.remove("barAnimationForward", "barAnimationReverse");
        void barDiv.offsetWidth;
        barDiv.classList.add(className);
    }

    // removes the animations, and reapplies
    function runCardAnimation(obj, className){

        obj.classList.remove("cardAnimationForward", "cardAnimationReverse");
        void obj.offsetWidth;
        obj.classList.add(className);

    }

    function runImageAnimation(obj, className){

        obj.classList.remove("appearAnimationForward", "appearAnimationReverse");
        void obj.offsetWidth;
        obj.classList.add(className);

    }

// const for looking at the cards when they come into view on the screen, threshold 20%
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            runCardAnimation(entry.target, "cardAnimationForward");
            buttonLogic(entry.target);
            entry.target.addEventListener('animationend', textAppearWhenEntry);
        } else {
            entry.target.removeEventListener('animationend', textAppearWhenEntry);
            runCardAnimation(entry.target, "cardAnimationReverse");
            textDisappearWhenGoAway(entry.target)
        }
    });
}, {threshold: 0.2});

// checks if the cards come into view
observer.observe(aspirationalDiv);
observer.observe(linguisticDiv);
observer.observe(familialDiv);
observer.observe(paragraphDiv);


//buttons when pressed interactions
function aspirationButton(){
    aspirationalDiv.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
    
    [but1, but2, but3, but4].forEach(b => b.style = "");
    buttonMap.get(aspirationalDiv).style = stylingForButton;

}

function familialButton(){
    familialDiv.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });

    [but1, but2, but3, but4].forEach(b => b.style = "");
    buttonMap.get(familialDiv).style = stylingForButton;

}

function linguisticButton(){
    linguisticDiv.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });

    [but1, but2, but3, but4].forEach(b => b.style = "");
    buttonMap.get(linguisticDiv).style = stylingForButton;
    
}
function paragraphButton(){
    paragraphDiv.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });

    [but1, but2, but3, but4].forEach(b => b.style = "");
    buttonMap.get(paragraphDiv).style = stylingForButton;
}



// function for styling buttons when I enter a card space.
function buttonLogic(entry){
    [but1, but2, but3, but4].forEach(b => b.style = "");
    buttonMap.get(entry).style = stylingForButton;
}


// make the text appear
function textAppearWhenEntry(entry){

        const forCurrent = mappingText.get(entry.currentTarget);

        const currentTextP = getQueryP(forCurrent);

        currentTextP.textContent = textMap.get(entry.currentTarget);
        entry.currentTarget.removeEventListener('animationend', textAppearWhenEntry);

        currentTextP.classList.add("appearAnimationForward");

        if(entry.currentTarget != paragraphDiv){
            const forCurrentImage = mappingImage.get(entry.currentTarget);
            const currentImageP = getQueryP(forCurrentImage);
            runImageAnimation(currentImageP, "appearAnimationForward");
        }

}

// make the text disappear
function textDisappearWhenGoAway(entry){

    const forCurrent = mappingText.get(entry);

    const currentTextP = getQueryP(forCurrent);

    currentTextP.textContent = "";

    currentTextP.classList.remove("appearAnimationForward");

    if(entry != paragraphDiv){
        const forCurrentImage = mappingImage.get(entry);
        const currentImageP = getQueryP(forCurrentImage);
        runImageAnimation(currentImageP, "appearAnimationReverse");
    }


}

// find the query's
function getQueryP(element){

    return document.querySelector(`#${element} p`);

}
