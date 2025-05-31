import { useState, useEffect } from 'react';

export default function RespiratoryGame() {
  const [gameState, setGameState] = useState('intro');
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [diagram, setDiagram] = useState('overview');
  const [isLabelMode, setIsLabelMode] = useState(false);
  const [highlightedPart, setHighlightedPart] = useState(null);
  const [timer, setTimer] = useState(null);

  const questions = [
    {
      question: "Which structure is NOT directly involved in the respiratory support for speech?",
      options: ["Diaphragm", "Intercostal muscles", "Cricoid cartilage", "Abdominal muscles"],
      correctAnswer: 2,
      explanation: "The cricoid cartilage is part of the laryngeal structure that supports the vocal folds, not directly involved in the respiratory support mechanism for speech. The diaphragm, intercostal muscles, and abdominal muscles all contribute to respiratory support for speech production."
    },
    {
      question: "During inhalation for speech, the diaphragm:",
      options: ["Relaxes and moves upward", "Contracts and flattens", "Remains stationary", "Vibrates rapidly"],
      correctAnswer: 1,
      explanation: "During inhalation, the diaphragm contracts and flattens, increasing the volume of the thoracic cavity, which decreases air pressure in the lungs and draws air in."
    },
    {
      question: "What distinguishes speech breathing from quiet breathing?",
      options: [
        "Speech breathing has equal inhalation and exhalation phases", 
        "Speech breathing involves shorter inhalation and longer exhalation", 
        "Speech breathing uses only the diaphragm", 
        "Speech breathing requires more air volume"
      ],
      correctAnswer: 1,
      explanation: "Speech breathing is characterized by a quick inhalation phase followed by a controlled, prolonged exhalation phase during which speech sounds are produced. This contrasts with quiet breathing where inhalation and exhalation phases are more equal in duration."
    },
    {
      question: "Which of the following is a primary function of the trachea in speech production?",
      options: [
        "Sound generation", 
        "Air passage and mucociliary clearance", 
        "Vocal fold vibration", 
        "Resonance"
      ],
      correctAnswer: 1,
      explanation: "The trachea serves as an air passage connecting the larynx to the bronchi and also contains mucociliary structures that help clear mucus. It doesn't generate sound or vibrate for speech, nor does it significantly contribute to resonance."
    },
    {
      question: "Vital capacity in speech pathology refers to:",
      options: [
        "The maximum amount of air that can be exhaled after maximum inhalation", 
        "The amount of air remaining in the lungs after normal exhalation", 
        "The volume of air exchanged during normal breathing", 
        "The amount of air needed for one syllable"
      ],
      correctAnswer: 0,
      explanation: "Vital capacity is the maximum amount of air that can be exhaled after taking the deepest possible breath. It's an important measure in speech pathology as it relates to respiratory support for extended speech production."
    },
    {
      question: "The primary active muscle for forced expiration used in loud speech is:",
      options: [
        "External intercostals", 
        "Internal intercostals", 
        "Abdominal muscles", 
        "Sternocleidomastoid"
      ],
      correctAnswer: 2,
      explanation: "Abdominal muscles (including the transversus abdominis, internal and external obliques, and rectus abdominis) are primarily responsible for forced expiration, which is used in loud speech or extended utterances."
    },
    {
      question: "Subglottal pressure refers to:",
      options: [
        "Pressure above the vocal folds", 
        "Pressure below the vocal folds", 
        "Pressure in the oral cavity", 
        "Pressure in the nasal cavity"
      ],
      correctAnswer: 1,
      explanation: "Subglottal pressure is the air pressure below the vocal folds. It's crucial for speech as it provides the force needed to set the vocal folds into vibration. Variations in subglottal pressure affect loudness and other speech characteristics."
    },
    {
      question: "Which of the following best describes the relationship between the respiratory system and resonance in speech production?",
      options: [
        "The respiratory system creates resonance in the vocal tract", 
        "Respiratory system dictates resonance frequencies", 
        "Respiratory system provides the power source that enables resonance to occur", 
        "Resonance happens only in the respiratory system"
      ],
      correctAnswer: 2,
      explanation: "The respiratory system acts as the power source in speech production, providing the airflow and pressure needed for vocal fold vibration. This vibration then creates sound waves that are resonated in the vocal tract cavities."
    },
    {
      question: "Which respiratory pattern is often observed in individuals with spastic dysarthria?",
      options: [
        "Regular breathing with extended phrases", 
        "Paradoxical breathing patterns", 
        "Shallow breathing with short phrases", 
        "Excessive air wastage during speech"
      ],
      correctAnswer: 2,
      explanation: "Individuals with spastic dysarthria often demonstrate shallow breathing with reduced respiratory support leading to short phrases. This is due to increased muscle tone and reduced coordination of the respiratory musculature."
    },
    {
      question: "What happens to the lungs during inhalation?",
      options: [
        "They contract to pull in air", 
        "They expand as the thoracic cavity enlarges", 
        "They produce surfactant", 
        "They actively push out carbon dioxide"
      ],
      correctAnswer: 1,
      explanation: "During inhalation, the lungs expand passively as the thoracic cavity enlarges (due to diaphragm contraction and intercostal muscle activity). Lungs don't have muscles to contract or expand on their own."
    }
  ];

  useEffect(() => {
    if (timer) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleAnswer = (selectedIndex) => {
    if (isAnswered) return;
    
    const currentQ = questions[currentQuestion];
    setSelectedAnswer(selectedIndex);
    setIsAnswered(true);
    
    if (selectedIndex === currentQ.correctAnswer) {
      setScore(score + 1);
      setFeedbackMessage(`Correct! ${currentQ.explanation}`);
    } else {
      setFeedbackMessage(`Incorrect. ${currentQ.explanation}`);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setFeedbackMessage('');
    } else {
      setGameState('results');
    }
  };

  const restartGame = () => {
    setGameState('quiz');
    setScore(0);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setFeedbackMessage('');
  };

  const startExploration = () => {
    setGameState('explore');
    setDiagram('overview');
  };

  const startLabelingGame = () => {
    setGameState('labeling');
    setIsLabelMode(true);
    setHighlightedPart(null);
    setTimer(30);
  };

  const handlePartClick = (part) => {
    if (isLabelMode && gameState === 'labeling') {
      if (part === highlightedPart) {
        setScore(score + 1);
        getNewPartToHighlight();
      } else {
        // Wrong part selected
        setTimer((prev) => Math.max(0, prev - 3)); // Penalty: reduce time by 3 seconds
      }
    } else if (gameState === 'explore') {
      setHighlightedPart(part);
    }
  };

  const getNewPartToHighlight = () => {
    const parts = ['diaphragm', 'trachea', 'lungs', 'bronchi', 'larynx', 'pharynx'];
    const availableParts = parts.filter(p => p !== highlightedPart);
    const randomPart = availableParts[Math.floor(Math.random() * availableParts.length)];
    setHighlightedPart(randomPart);
  };

  useEffect(() => {
    if (gameState === 'labeling' && !highlightedPart) {
      getNewPartToHighlight();
    }
  }, [gameState, highlightedPart]);

  useEffect(() => {
    if (timer === 0) {
      setGameState('labelingResults');
    }
  }, [timer]);

  const respiratorySystemDiagram = () => {
    return (
      <div className="relative w-full max-w-lg mx-auto h-96 bg-gray-100 rounded-lg overflow-hidden">
        {/* Basic diagram background */}
        <div className="absolute inset-0 bg-blue-50">
          {/* Simple outline of human upper body */}
          <svg viewBox="0 0 300 400" className="w-full h-full">
            {/* Body outline */}
            <path d="M150,20 C180,20 200,40 200,60 L200,150 C240,170 260,230 260,300 L230,350 L180,370 L150,380 L120,370 L70,350 L40,300 C40,230 60,170 100,150 L100,60 C100,40 120,20 150,20 Z" 
                  fill="#f3f4f6" stroke="#666" strokeWidth="2" />
            
            {/* Pharynx */}
            <path d="M150,60 C160,60 170,65 170,75 L170,95 C170,105 160,110 150,115 C140,110 130,105 130,95 L130,75 C130,65 140,60 150,60 Z" 
                  fill={highlightedPart === 'pharynx' ? "#ff9999" : "#ffcccc"} 
                  stroke="#666" 
                  strokeWidth="1.5"
                  onClick={() => handlePartClick('pharynx')}
                  className="cursor-pointer hover:fill-red-300" />
            
            {/* Larynx */}
            <path d="M150,115 C160,115 170,120 170,130 L165,140 C160,145 155,150 150,150 C145,150 140,145 135,140 L130,130 C130,120 140,115 150,115 Z" 
                  fill={highlightedPart === 'larynx' ? "#ff9999" : "#ffcccc"}
                  stroke="#666" 
                  strokeWidth="1.5"
                  onClick={() => handlePartClick('larynx')}
                  className="cursor-pointer hover:fill-red-300" />
            
            {/* Trachea */}
            <path d="M150,150 C155,150 160,155 160,160 L160,190 C160,195 155,200 150,200 C145,200 140,195 140,190 L140,160 C140,155 145,150 150,150 Z" 
                  fill={highlightedPart === 'trachea' ? "#99ccff" : "#cce5ff"}
                  stroke="#666" 
                  strokeWidth="1.5"
                  onClick={() => handlePartClick('trachea')}
                  className="cursor-pointer hover:fill-blue-300" />
            
            {/* Bronchi */}
            <path d="M150,200 L170,220 C175,225 180,230 180,240 C180,245 175,250 170,250 C165,250 160,245 160,240 L150,200 Z" 
                  fill={highlightedPart === 'bronchi' ? "#99ccff" : "#cce5ff"}
                  stroke="#666" 
                  strokeWidth="1.5"
                  onClick={() => handlePartClick('bronchi')}
                  className="cursor-pointer hover:fill-blue-300" />
            <path d="M150,200 L130,220 C125,225 120,230 120,240 C120,245 125,250 130,250 C135,250 140,245 140,240 L150,200 Z" 
                  fill={highlightedPart === 'bronchi' ? "#99ccff" : "#cce5ff"}
                  stroke="#666" 
                  strokeWidth="1.5"
                  onClick={() => handlePartClick('bronchi')}
                  className="cursor-pointer hover:fill-blue-300" />
            
            {/* Lungs */}
            <ellipse cx="120" cy="250" rx="40" ry="60" 
                    fill={highlightedPart === 'lungs' ? "#99ff99" : "#ccffcc"}
                    stroke="#666" 
                    strokeWidth="1.5"
                    onClick={() => handlePartClick('lungs')}
                    className="cursor-pointer hover:fill-green-300" />
            <ellipse cx="180" cy="250" rx="40" ry="60" 
                    fill={highlightedPart === 'lungs' ? "#99ff99" : "#ccffcc"}
                    stroke="#666" 
                    strokeWidth="1.5"
                    onClick={() => handlePartClick('lungs')}
                    className="cursor-pointer hover:fill-green-300" />
            
            {/* Diaphragm */}
            <path d="M80,310 Q150,340 220,310" 
                  fill="none"
                  stroke={highlightedPart === 'diaphragm' ? "#ff6600" : "#ff9966"}
                  strokeWidth="5"
                  onClick={() => handlePartClick('diaphragm')}
                  className="cursor-pointer hover:stroke-orange-500" />
          </svg>
        </div>
        
        {/* Information overlay */}
        {highlightedPart && gameState === 'explore' && (
          <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4">
            <h3 className="font-bold text-lg">{highlightedPart.charAt(0).toUpperCase() + highlightedPart.slice(1)}</h3>
            <p className="text-sm">
              {highlightedPart === 'diaphragm' && "Primary muscle of respiration. When it contracts and flattens, it increases thoracic volume, creating negative pressure that draws air into the lungs. Critical for respiratory support in speech."}
              {highlightedPart === 'trachea' && "Airway connecting the larynx to the bronchi. Provides passage for airflow during both inhalation and exhalation phases of respiration for speech."}
              {highlightedPart === 'lungs' && "Primary organs of respiration where gas exchange occurs. Their elasticity provides passive recoil during exhalation, which can be used in speech production."}
              {highlightedPart === 'bronchi' && "Airways that branch from the trachea into the lungs, further dividing into bronchioles and alveoli where gas exchange occurs."}
              {highlightedPart === 'larynx' && "Voice box containing the vocal folds. Houses the glottis, which regulates airflow from the lungs and is essential for phonation."}
              {highlightedPart === 'pharynx' && "Serves as a resonating cavity for speech sounds. Connected to the oral and nasal cavities, contributing to speech articulation and resonance."}
            </p>
          </div>
        )}
        
        {/* Labeling game overlay */}
        {gameState === 'labeling' && (
          <div className="absolute top-0 left-0 right-0 bg-white bg-opacity-90 p-2 flex justify-between items-center">
            <div>
              <span className="font-bold">Find:</span> {highlightedPart && highlightedPart.charAt(0).toUpperCase() + highlightedPart.slice(1)}
            </div>
            <div>
              <span className="font-bold">Time:</span> {timer}s
            </div>
            <div>
              <span className="font-bold">Score:</span> {score}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render different game states
  const renderGameContent = () => {
    switch (gameState) {
      case 'intro':
        return (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Respiratory System Explorer</h1>
            <h2 className="text-xl mb-6">Speech Pathology Edition</h2>
            
            <p className="mb-6">Learn about respiratory anatomy and physiology as it relates to speech production through interactive learning!</p>
            
            <div className="space-y-4">
              <button 
                onClick={() => setGameState('quiz')} 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full max-w-xs hover:bg-blue-700 transition-colors"
              >
                Start Knowledge Quiz
              </button>
              
              <button 
                onClick={startExploration} 
                className="bg-green-600 text-white px-6 py-3 rounded-lg w-full max-w-xs hover:bg-green-700 transition-colors"
              >
                Explore Respiratory System
              </button>
              
              <button 
                onClick={startLabelingGame} 
                className="bg-purple-600 text-white px-6 py-3 rounded-lg w-full max-w-xs hover:bg-purple-700 transition-colors"
              >
                Speed Labeling Challenge
              </button>
            </div>
          </div>
        );
        
      case 'quiz':
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Quiz: Question {currentQuestion + 1}/{questions.length}</h2>
              <span className="bg-blue-100 px-3 py-1 rounded-lg font-semibold">Score: {score}</span>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow mb-6">
              <p className="text-lg mb-4">{questions[currentQuestion].question}</p>
              
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      isAnswered 
                        ? index === questions[currentQuestion].correctAnswer
                          ? 'bg-green-100 border-green-400'
                          : index === selectedAnswer
                            ? 'bg-red-100 border-red-400'
                            : 'bg-gray-50 border-gray-200'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                    disabled={isAnswered}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            
            {isAnswered && (
              <div className="mb-6">
                <div className={`p-4 rounded-lg ${selectedAnswer === questions[currentQuestion].correctAnswer ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  {feedbackMessage}
                </div>
                <button
                  onClick={nextQuestion}
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full"
                >
                  {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
                </button>
              </div>
            )}
          </div>
        );
        
      case 'results':
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
            
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <p className="text-xl mb-2">Your Score:</p>
              <p className="text-4xl font-bold text-blue-700 mb-2">{score}/{questions.length}</p>
              <p className="text-lg">
                {score === questions.length ? "Perfect score! Excellent understanding of respiratory concepts." :
                 score >= questions.length * 0.8 ? "Great job! You have a strong grasp of respiratory concepts." :
                 score >= questions.length * 0.6 ? "Good effort! Review the areas you missed to strengthen your knowledge." :
                 "Keep studying! Focus on reviewing the respiratory system concepts related to speech production."}
              </p>
            </div>
            
            <div className="flex flex-col space-y-3">
              <button 
                onClick={restartGame} 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Retake Quiz
              </button>
              <button 
                onClick={startExploration} 
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Explore Respiratory System
              </button>
              <button 
                onClick={() => setGameState('intro')} 
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Return to Menu
              </button>
            </div>
          </div>
        );
        
      case 'explore':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Respiratory System Explorer</h2>
            <p className="mb-4">Click on different parts of the respiratory system to learn more about their roles in speech production.</p>
            
            {respiratorySystemDiagram()}
            
            <div className="mt-6 flex justify-between">
              <button 
                onClick={() => setGameState('intro')} 
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Return to Menu
              </button>
              <button 
                onClick={startLabelingGame} 
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Try Speed Labeling Challenge
              </button>
            </div>
          </div>
        );
        
      case 'labeling':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-2">Speed Labeling Challenge</h2>
            <p className="mb-4">Find and click on the requested respiratory structure as quickly as possible!</p>
            
            {respiratorySystemDiagram()}
          </div>
        );
        
      case 'labelingResults':
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Challenge Complete!</h2>
            
            <div className="bg-purple-50 rounded-lg p-6 mb-6">
              <p className="text-xl mb-2">Your Score:</p>
              <p className="text-4xl font-bold text-purple-700 mb-2">{score}</p>
              <p className="text-lg">
                {score >= 10 ? "Amazing speed and accuracy! You're an expert in respiratory anatomy." :
                 score >= 7 ? "Great job! You have strong knowledge of respiratory structures." :
                 score >= 4 ? "Good effort! Keep practicing to improve your speed and accuracy." :
                 "Keep studying! Practice will help you identify these structures faster."}
              </p>
            </div>
            
            <div className="flex flex-col space-y-3">
              <button 
                onClick={startLabelingGame} 
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Try Again
              </button>
              <button 
                onClick={startExploration} 
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Explore Respiratory System
              </button>
              <button 
                onClick={() => setGameState('intro')} 
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Return to Menu
              </button>
            </div>
          </div>
        );
        
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 font-sans">
      {renderGameContent()}
    </div>
  );
}