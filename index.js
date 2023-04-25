const questions = [
    {
        question: 'Who became the MVP of the NBA finals 2017?',
        answers: ['Stephen Curry', 'LeBron James', 'Kawhi Leonard', 'Klay Thompson'],
        correct: 2


    },
    {
        question: 'Who won the NBA Play-Off 2021?',
        answers: ['San Antonio Spurs', 'Cleveland Cavaliers', 'Phoenix Suns', 'Milwaukee Bucks'],
        correct: 4
        

    },
    {
        question: 'In which arena did Steph Curry break Ray Allen`s record?',
        answers: ['Madison Square Garden', 'Barclays center', 'Crypto.com Arena', 'TD Garden'],
        correct: 1

    },
    {
        question: 'Who won the NBA Play-Off 2013?',
        answers: ['Los Angeles Lakers', 'Cleavland Cavaliers', 'Miami Heat', 'Boston Celtics'],
        correct: 3

    },
    {
        question: 'Who has the most triple-doubles in NBA history?',
        answers: ['Russell Westbrook', 'Nikola Jokić', 'Michel Jordan', 'Udonis Haslem'],
        correct: 1

    },
    {
        question: 'Who scored the most points in one game in NBA histor?',
        answers: ['Devin Booker', 'Kareem Abdul-Jabbar', 'Wilt Chamberlain', 'Bill Russel'],
        correct: 3

    },
    {
        question: 'Which California NBA team has won the most championships?',
        answers: ['Golden State Warriors', 'Los Angeles Lakers', 'Los Angeles Clippers', 'Sacramento Kings'],
        correct: 2

    },

]

const headerContainer = document.querySelector('#header')
const listContainer = document.querySelector('#list')
const submitBtn = document.querySelector('#submit')

let points = 0 
let questionIndex = 0


cleanerOfPage()
showQuestion()
submitBtn.onclick = checkAnswer


function cleanerOfPage(){
    headerContainer.innerHTML = ''
    listContainer.innerHTML = ''
}
function showQuestion(){
    // Вопрос

    const headerTemplate = `<h2 class="title">%title%</h2>`
    const title = headerTemplate.replace('%title%', questions[questionIndex]['question'])
    headerContainer.innerHTML = title


    let answerNumber = 1
    // Варианты ответов
    for(AnswerText of questions[questionIndex]['answers']){
        //AnswerText

        const questionTemplate = `
        <li>
            <label>
                <input value="%number%" type="radio" class="answer" name="answer" />
                <span>%answer%</span>
            </label>
        </li>`
        const option = questionTemplate.replace('%answer%', AnswerText).replace('%number%', answerNumber)
        listContainer.innerHTML += option
        answerNumber++
    }


}

function checkAnswer(){
    const checkedRadio = listContainer.querySelector('input[type="radio"]:checked')


    const userAnswer = parseInt(checkedRadio.value)

    if(questions[questionIndex]['correct'] === userAnswer){
        points++
    }

    if(questions.length - 1 !== questionIndex){
        questionIndex++
        cleanerOfPage()
        showQuestion()
        return
    }
    else{
        cleanerOfPage()
        showResults()
    }


}

function showResults(){
    const resultsTemplate = `
        <h2 class="title">%title%</h2>
        <h3 class="summary">%message%</h3>
        <p class="result">%result%</p>`

    let title, meassage, percentage
    
    percentage = Math.round(points/questions.length*100)

    if(percentage === 100){
        title = 'You`re a really NBA fan!'
        meassage = `Your result is ${percentage}%`
    }
    else if(percentage >= 80){
        title = 'Excellent'
        meassage = `Your result is ${percentage}%`
    }
    else if(percentage < 79 && percentage > 50){
        title = 'Not bad'
        meassage = `Your result is ${percentage}%`
    }
    else /* if(percentage < 50)*/{
        title = 'Watch more NBA'
        meassage = `Your result is ${percentage}%`
    }

    const finalMessage = resultsTemplate.replace('%title%', title).replace('%message%', meassage).replace('%result%', percentage)
    headerContainer.innerHTML = finalMessage
    console.log(headerContainer)

    submitBtn.blur()
    submitBtn.innerHTML = 'Restart'
    submitBtn.onclick = () => history.go()
}
