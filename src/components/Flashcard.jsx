import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAppFunctions } from '../AppFunctions';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import './Flashcard.css';

function Flashcard({ flashcards, timer, handleResultData }) {
  const { userName } = useAppFunctions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [result, setResult] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [count, setCount] = useState(1);
  const [certificateID, setCertificateID] = useState('');

  useEffect(() => {
    setCertificateID(generateCertificateID());
  }, []);

  const handleAnswerClick = (questionId, selectedIndex) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionId]: selectedIndex,
    }));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setCount((prevCount) => prevCount + 1);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
    setCount((prevCount) => prevCount - 1);
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    const selectedAnswersCopy = { ...selectedAnswers };

    flashcards.forEach((flashcard) => {
      const questionId = flashcard.id;
      const correctAnswerIndex = flashcard.correctAnswer;

      if (selectedAnswersCopy.hasOwnProperty(questionId)) {
        const userAnswerIndex = selectedAnswersCopy[questionId];
        const isCorrect = userAnswerIndex === correctAnswerIndex;

        if (isCorrect) {
          correctAnswers++;
        }

        selectedAnswersCopy[questionId] = { userAnswerIndex, isCorrect };
      }
    });

    setScore(correctAnswers);
    setResult(true);
  };

  const handleSlide = (direction) => {
    setIsVisible(false);

    setTimeout(() => {
      if (direction === 'next') {
        handleNext();
      } else if (direction === 'previous') {
        handlePrevious();
      }

      setIsVisible(true);
    }, 500);
  };

  const generateCertificateID = () => {
    return 'CERT-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const downloadCertificate = () => {
    const input = document.getElementById('certificate-content');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('certificate.pdf');
    });
  };

  return (
    <>
      {timer ? (
        <div id="timesUp">
          <div id="timeout-view">
            <h4>{`Time's up!`}</h4>
            <h4>{(score / 10) * 100}%</h4>
            <button onClick={() => handleResultData(userName, (score / 10) * 100, flashcards[0].topic)}>Submit</button>
          </div>
        </div>
      ) : !flashcards[currentIndex] ? (
        <p id="no-flashcards">No flashcards found. We are working on it.</p>
      ) : (
        result ? (
          <div id="certificate">
            <div id="certificate-content">
              <h2>Certificate of Achievement</h2>
              <h3><strong>{userName}</strong></h3>
              <h4>has successfully completed the quiz in {flashcards[0].topic}</h4>
              <table>
                <thead>
                  <tr>
                    <th>Total questions</th>
                    <th>Correct answers</th>
                    <th>Wrong / not attempted answers</th>
                    <th>Accuracy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>10</td>
                    <td>{score}</td>
                    <td>{10 - score}</td>
                    <td>{(score / 10) * 100}%</td>
                  </tr>
                </tbody>
              </table>
              <div id="certificate-footer">
                <span>Aryan Maurya (Owner/CEO)</span>
                <span>Certificate ID: {certificateID}</span>
              </div>
              <button onClick={() => handleResultData(userName, (score / 10) * 100, flashcards[0].topic)}>Exit</button>
              <button onClick={downloadCertificate}>Download</button>
            </div>
          </div>
        ) : (
          <>
            <div id="flashcard" className={isVisible ? '' : 'hidden'}>
              <h4>Q.{count}- {flashcards[currentIndex].question}</h4>
              <ul>
                {flashcards[currentIndex].answers.map((answer, index) => (
                  <li key={index}>
                    <input
                      type="radio"
                      id={`answer-${index}`}
                      name={`answer-${flashcards[currentIndex].id}`}
                      value={index}
                      checked={selectedAnswers[flashcards[currentIndex].id] === index}
                      onChange={() => handleAnswerClick(flashcards[currentIndex].id, index)}
                    />
                    <label htmlFor={`answer-${index}`}>{answer}</label>
                  </li>
                ))}
              </ul>
            </div>
            <div id="controls">
              {currentIndex > 0 && (
                <button onClick={() => handleSlide('previous')}>Previous</button>
              )}
              {currentIndex < flashcards.length - 1 ? (
                <button onClick={() => handleSlide('next')}>Next</button>
              ) : (
                <button onClick={handleSubmit}>Submit</button>
              )}
            </div>
          </>
        )
      )}
    </>
  );
}

Flashcard.propTypes = {
  flashcards: PropTypes.array,
  timer: PropTypes.string,
  handleResultData: PropTypes.func
};

export default Flashcard;