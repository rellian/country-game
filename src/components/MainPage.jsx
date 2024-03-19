import React, { useState, useEffect } from 'react';
import './MainPage.css'
import { FaRegCopyright } from "react-icons/fa";
import think from '../assets/download.jpg';
import happy from '../assets/complete.jpg'
const CountryGuessGame = () => {
    const [countries, setCountries] = useState([]);
    const [index, setIndex] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [finished, setFinished] = useState(false);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
    const [loading, setLoading] = useState(true); // Loader state

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                // Filter out countries without flags
                const countriesWithFlags = data.filter(country => country.flags);
                const shuffledCountries = shuffleArray(countriesWithFlags);
                setCountries(shuffledCountries);
                setLoading(false)

            })
            .catch(error => console.error('Error fetching countries:', error));
    }, []);

    const handleInputChange = event => {
        setInputValue(event.target.value);
    };

    const checkAnswer = () => {
        if (!inputValue.trim()) return;
        const correctAnswer = countries[index].name.common.toLowerCase();
        const playerAnswer = inputValue.toLowerCase().trim();

        setAttempts(attempts + 1);

        if (playerAnswer === correctAnswer) {
            setScore(score + 1);
            moveNext();
        } else {
            setShowCorrectAnswer(true);
            setTimeout(() => {
                setShowCorrectAnswer(false);
                moveNext();
            }, 3000);
        }
    };

    const moveNext = () => {
        if (index === countries.length - 1) {
            setFinished(true);
        } else {
            setIndex(index + 1);
            setInputValue('');
        }
    };

    useEffect(() => {
        if (finished) {
            // Display 'Thank you for playing' message or any other completion message
            // You can handle what to do when the game is finished
            // For example, displaying a modal or redirecting to another page
        }
    }, [finished]);

    const shuffleArray = (array) => {
        // Fisher-Yates shuffle algorithm
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    return (
        <div>
            {loading ? ( // Show loader while fetching countries
                <div>Loading...</div>
            ) : finished ? ( // Display thank you message when finished
                <>
                    <img className="think-icon" src={happy} alt="" />
                    <div>Thank you for playing!</div>
                    <p>Reach out or say hello to creator @adepojuseyi5@gmail.com</p>
                </>
            ) : (
                        <div>
                            <img className="think-icon" src={think} alt="" />
                            <div className="function-box" >
                                <div className="counter-score">Score: {score}/{attempts}</div>
                                {showCorrectAnswer && (
                                    <div className="counter-answer">Correct answer: {countries[index].name.common}</div>
                                )}
                                <div className="game-container">
                                    <img src={countries[index].flags.svg} alt={"img"} style={{ width: '200px' }} />
                                    <input
                                        type="text"
                                        placeholder="Enter country name"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                    />
                                    <button onClick={checkAnswer}>Submit</button>
                                </div>
                                <div className="copyright"> <FaRegCopyright /> x-district corp. 2024</div>
                            </div>
                        </div>

                    )}
            <p>Reach out or say hello to creator adepojuseyi5@gmail.com</p>
        </div>
    );
};

export default CountryGuessGame;
