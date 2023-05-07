const allQuestions = document.querySelectorAll('.question');
const check = document.getElementById('check');

const choicesList = []; // Includes arrays of options of each question.

for (const question of allQuestions) {
    choicesList.push(question.querySelectorAll('.choice'));
}

// This loop will add the class 'active' to the clicked options of each question
for (let i = 0; i < choicesList.length; i++) {
    for (const choice of choicesList[i]) {
        choice.addEventListener('click', () => {
            for (const chosen of choicesList[i]) {
                chosen.classList.remove('active');
            }
            choice.classList.add('active');
        });
    }
}

// This function will return the results
const rightAnswers = [];
const chosedAnswers = [];

function resultsHandler() {
    // This two lines of code will make sure that the arrays won't have any duplicated values.
    // This is not about the normal duplicated values :)
    rightAnswers.length = 0;
    chosedAnswers.length = 0;

    // This nested loop will pushes the p elements with the "right" class
    for (const options of choicesList) {
        for (const option of options) {
            if (option.classList.contains('right')) {
                rightAnswers.push(option.innerHTML);
            }
        }
    }

    // This nested loop will pushes the p elements with the "active" class
    for (const options of choicesList) {
        for (const option of options) {
            if (option.classList.contains('active')) {
                chosedAnswers.push(option.innerHTML);
            }
        }
    }

    // This if check will make sure that the user won't make any mistakes.
    if (
        (rightAnswers.length === allQuestions.length ||
        rightAnswers.length === 0 && chosedAnswers.length === 0) &&
        chosedAnswers.length === 0 ||
        rightAnswers.length !== chosedAnswers.length
    ) {
        alert('Please answer to all questions!');
    } else {
        let finalResult = allQuestions.length;
        for (let j = 0; j < rightAnswers.length; j++) {
            if (rightAnswers[j] !== chosedAnswers[j]) {
                finalResult -= 1; 
            }
        }
        for (const options of choicesList) {
            for (const option of options) {
                if (option.classList.contains('right')) {
                    option.style.backgroundColor = '#06f006';
                    option.style.color = 'white';
                    option.style.outline = '5px solid #5af95a80';
                }
            }
        }
        alert(`You got ${finalResult} marks out of ${allQuestions.length}`);
    }
}

check.addEventListener('click', resultsHandler)

// This area is responsible for the carousel functionalities ---------------
const questionNum = document.querySelectorAll('.q-n');
const prev = document.querySelectorAll('.prev');
const next = document.querySelectorAll('.next');

function questionNumberHandler() {
    for (let i = 0; i < allQuestions.length; i++) {
        questionNum[i].innerHTML = i + 1;
    }
}

function generalCarouselTaskHandler() {
    allQuestions[0].classList.add('current');
    questionNumberHandler();
}

generalCarouselTaskHandler();

let index = 0;

function slideToNext() {
    if (index === allQuestions.length - 1) {
        for (const slide of allQuestions) {
            slide.classList.remove('current');
        }
        allQuestions[0].classList.add('current');
        index = 0;
    } else {
        allQuestions[index].classList.remove('current');
        allQuestions[index + 1].classList.add('current');
        index++;
    }
};

function slideToPrev() {
    if (index === 0) {
        for (const slide of allQuestions) {
            slide.classList.remove('current');
        }
        allQuestions[allQuestions.length - 1].classList.add('current');
        index = allQuestions.length - 1;
    } else {
        allQuestions[index].classList.remove('current');
        allQuestions[index - 1].classList.add('current');
        index--;
    }
};

next.forEach((nextBtn) => {
    nextBtn.addEventListener('click', slideToNext);
});

prev.forEach((prevBtn) => {
    prevBtn.addEventListener('click', slideToPrev);
});

// This area will responsible for the css changing tasks of users.
function cssChangeHandler(width, height, primaryColor, fontColor) {
    const root = document.querySelector(':root');

    if (width == null || height == null) {
        alert('You need to enter both width and height values!');
        return;
    } else {
        const questions = document.querySelectorAll('.question');
        for (const question of questions) {
            question.style.width = width + 'rem';
            question.style.height = height + 'rem';
        }
    }

    if (primaryColor == null && fontColor == null) {
        return;
    } else {
        root.style.setProperty('--color-light', fontColor);
        root.style.setProperty('--color-primary', primaryColor.toString(16));
        root.style.setProperty(
            '--color-primary-gradient', 
            `linear-gradient(144deg, ${primaryColor} 0%, ${primaryColor}52 100%)`
        );
        root.style.setProperty('--color-primary-transparent', `${primaryColor}94`)
    }
}