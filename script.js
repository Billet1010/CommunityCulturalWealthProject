

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


window.addEventListener('resize', () => {

    bottomOfTitle = title.getBoundingClientRect().bottom + window.scrollY;

});

let defaultState = false;


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
            buttonLogic(entry.target);
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

const stylingForButton = `
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 16px;
`;

function aspirationButton(){
    aspirationalDiv.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });

    but1.style = stylingForButton;
    but2.style = "";
    but3.style = "";
    but4.style = "";
    
    [but1, but2, but3, but4].forEach(b => b.style = "");
    buttonMap.get(aspirationalDiv).style = stylingForButton;

}

function familialButton(){
    familialDiv.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });

    but1.style = "";
    but2.style = stylingForButton;
    but3.style = "";
    but4.style = "";

    [but1, but2, but3, but4].forEach(b => b.style = "");
    buttonMap.get(familialDiv).style = stylingForButton;

}

function linguisticButton(){
    linguisticDiv.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });

    but1.style = "";
    but2.style = "";
    but3.style = stylingForButton;
    but4.style = "";

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

const buttonMap = new Map([
    [aspirationalDiv, but1],
    [familialDiv, but2],
    [linguisticDiv, but3],
    [paragraphDiv, but4]   
]);

function buttonLogic(entry){
    [but1, but2, but3, but4].forEach(b => b.style = "");
    buttonMap.get(entry).style = stylingForButton;
}



//text appear
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
        `
    ]
]);

const mappingText = new Map([

    ['a', 'aText'],
    ['f', 'fText'],
    ['l', 'lText'],
    ['p', '']
    
]);

/*
function textAppearWhenEntry(entry){

    setTimeout(() => {

        const forCurrent = textMap.get(right);

        const current = document.quierySelectorAll(`${forCurrent} p`);

        current.innerText = textMap.get(entry);
    }, 2000);

}
    */