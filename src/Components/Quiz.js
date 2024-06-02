import React, { useState, useEffect } from 'react';
import '../App.css';

export default function Quiz() {
    const questions = [
        {
            question: "What is the capital of India?",
            options: ["Bangalore", "Delhi", "Kolkata", "Chennai"],
            answer: 2
        },
        {
            question: "Who is the PM of India?",
            options: ["Rahul", "Nitsh", "Akhilesh", "Modi"],
            answer: 4
        },
        {
            question: "Who won the cricket ODI World Cup 2023",
            options: ["Australia", "India", "Pakistan", "England"],
            answer: 1
        },
        {
            question: "Who won the IPL 2024",
            options: ["RCB", "SRH", "KKR", "CSK"],
            answer: 3
        }
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(5);
    const [quizCompleted, setQuizCompleted] = useState(false);

    useEffect(() => {
        let timer;
        if (timeLeft > 0) {
            timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
        } else {
            changeQuestion();
        }

        return () => clearTimeout(timer);
    }, [currentQuestion, timeLeft]);

    const changeQuestion = () => {
        const correctAnswer = questions[currentQuestion].answer;
        if (selectedOption === correctAnswer) {
            setScore(score + 1);
        }
        setSelectedOption(null);
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setTimeLeft(5); // Reset timer to 5 seconds for the next question
        } else {
            setQuizCompleted(true); // Quiz completed
        }
    }

    const handleOptionClick = (optionIndex) => {
        setSelectedOption(optionIndex + 1);
    }

    return (
        <div>
            <p className='heading-txt'>QUIZ APP</p>
            <div className='container'>
                {!quizCompleted ? (
                    <>
                        <div className='question'>
                            <span id='question-number'>{currentQuestion + 1}</span>
                            <span id='question-txt'>{questions[currentQuestion].question}</span>
                        </div>
                        <div className='option-container'>
                            {questions[currentQuestion].options.map((option, i) => (
                                <button 
                                    key={i} 
                                    className={`option-btn ${selectedOption === i + 1 ? 'checked' : ''}`}
                                    onClick={() => handleOptionClick(i)}
                                    disabled={selectedOption !== null}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                        <div className='timer'>
                            Time left: {timeLeft} seconds
                        </div>
                        <button 
                            className='next-btn' 
                            onClick={changeQuestion}
                            disabled={selectedOption === null}
                        >
                            Next
                        </button>
                    </>
                ) : (
                    <div className='final-score'>
                        <p>Your Final Score: {score}/{questions.length}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
