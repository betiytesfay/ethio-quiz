import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

const questions = [

  {
    question: "What is the capital city of Ethiopia?",
    options: ["Addis Ababa", "Adama", "Bahir Dar", "Hawassa"],
    answer: "Addis Ababa",
    explanation: "Addis Ababa is the capital city of Ethiopia."
  },
  {
    question: "Which one is a famous artist in Ethiopia?",
    options: ["Aster Aweke", "Abiy Ahmed", "Haile Gebre Sellasie", "None"],
    answer: "Aster Aweke",
    explanation: "Aster Aweke is a renowned Ethiopian singer."
  },
  {
    question: "Which battle ensured Ethiopia remained independent from colonial powers?",
    options: ["Battle of Adwa", "Battle of Gundet", "Battle of Gura", "Battle of Dogali"],
    answer: "Battle of Adwa",
    explanation: "The Battle of Adwa in 1896 was a decisive victory over Italy, keeping Ethiopia independent."
  },
  {
    question: "Which emperor is known for modernizing Ethiopia and building Addis Ababa universities?",
    options: ["Menelik II", "Haile Selassie", "Tewodros II", "Zera Yacob"],
    answer: "Haile Selassie",
    explanation: "Emperor Haile Selassie is famous for modernizing Ethiopia’s government, education, and infrastructure. He also established universities, including the University College of Addis Ababa, which later became Addis Ababa University."
  },
  {
    question: "Which calendar does Ethiopia use?",
    options: [
      "Gregorian",
      "Julian",
      "Ethiopian Calendar",
      "Islamic Calendar"
    ],
    answer: "Ethiopian Calendar",
    explanation:
      "Ethiopia uses its own calendar called the Ethiopian Calendar. It has 13 months ."
  },

  {
    question: "Where was coffee first discovered?",
    options: [
      "Brazil",
      "Eritrea",
      "Ethiopia",
      "Kenya"
    ],
    answer: "Ethiopia",
    explanation:
      "Coffee was first discovered in Ethiopia in Kaffa region."
  },

  {
    question: "Which Ethiopian place is famous for rock churches?",
    options: [
      "Axum",
      "Lalibela",
      "Harar",
      "Gondar"
    ],
    answer: "Lalibela",
    explanation:
      "Lalibela is famous for rock-hewn churches."
  },
  {
    question: "For how many years was Ethiopia occupied during the time of Haile Selassie?",
    options: ["0 years", "3 years", "5 years", "Never occupied"],
    answer: "5 years",
    explanation: "Italy occupied Ethiopia from 1936 to 1941, which is 5 years, during the time of Emperor Haile Selassie."
  },
  {
    question: "Which of the following was never an Ethiopian king?",
    options: ["Menelik II", "Haile Selassie", "Lalibela", "Tewodros III"],
    answer: "Tewodros III",
    explanation: "Menelik II, Haile Selassie, and Lalibela were actual Ethiopian rulers. Tewodros III never existed; it’s a fictional name inspired by Emperor Tewodros II."
  },
  {
    question: "Which language is widely spoken in Ethiopia?",
    options: [
      "English",
      "Amharic",
      "German",
      "French"
    ],
    answer: "Amharic",
    explanation:
      "Amharic is one of the main languages in Ethiopia."
  }

];


function QuestionCard({
  questionData,
  selectedAnswer,
  showResult,
  handleAnswer,
  nextQuestion,
  currentQuestion,
  totalQuestions,
  timeLeft,
  restartQuiz
}) {

  const progress = (currentQuestion + 1) / totalQuestions;
  const timerColor = timeLeft <= 5 ? "#e74c3c" : "#2e86de";

  return (

    <View>

      <View style={styles.topBar}>
        <Text style={styles.appName}>Ethio Quiz</Text>
        <Text style={styles.progress}>{currentQuestion + 1} / {totalQuestions}</Text>
      </View>

      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
      </View>

      <View style={styles.progressRow}>
        <Text style={[styles.timer, { color: timerColor }]}>⏱ {timeLeft}s</Text>
        <TouchableOpacity onPress={restartQuiz}>
          <Text style={styles.endButton}>End</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.question}>
        {currentQuestion + 1}. {questionData.question}
      </Text>

      {questionData.options.map((option, index) => (

        <TouchableOpacity
          key={index}
          style={[
            styles.option,
            showResult && option === questionData.answer && styles.correct,
            showResult && selectedAnswer === option && option !== questionData.answer && styles.wrong
          ]}
          onPress={() => handleAnswer(option)}
          disabled={showResult}
        >

          <Text style={styles.optionText}>
            {option}
          </Text>

        </TouchableOpacity>

      ))}

      {showResult && (

        <>
          <Text style={styles.feedback}>

            {selectedAnswer === questionData.answer
              ? "Correct "
              : "Wrong "}

          </Text>

          <Text style={styles.explanation}>
            {questionData.explanation}
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={nextQuestion}
          >

            <Text style={styles.buttonText}>
              Next
            </Text>

          </TouchableOpacity>

        </>

      )}

    </View>

  );

}

function ResultScreen({
  score,
  totalQuestions,
  restartQuiz
}) {

  return (

    <View>

      <Text style={styles.title}>
        Quiz Finished
      </Text>

      <Text style={styles.score}>

        Score: {score} / {totalQuestions}

      </Text>

      <Text style={styles.message}>

        {score >= 8
          ? "Excellent! You know Ethiopia very well! "
          : score >= 5
            ? "Good job! You know Ethiopia well! "
            : "Keep learning about Ethiopia! "}

      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={restartQuiz}
      >

        <Text style={styles.buttonText}>
          Restart Quiz
        </Text>

      </TouchableOpacity>

    </View>

  );

}

const TIMER_SECONDS = 15;

export default function App() {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [showHome, setShowHome] = useState(true);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const timerRef = useRef(null);

  useEffect(() => {
    if (showResult || showFinal) {
      clearInterval(timerRef.current);
      return;
    }
    setTimeLeft(TIMER_SECONDS);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setShowResult(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [currentQuestion, showFinal, showResult]);

  const handleAnswer = (option) => {
    clearInterval(timerRef.current);
    setSelectedAnswer(option);
    setShowResult(true);
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowFinal(true);
    }
  };

  const restartQuiz = () => {
    clearInterval(timerRef.current);
    setCurrentQuestion(0);
    setScore(0);
    setShowFinal(false);
    setSelectedAnswer(null);
    setShowResult(false);
    setShowHome(true);
  };



  const startQuiz = () => {
    setShowHome(false);
  };

  return (

    <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: "center", flexGrow: 1 }}>

      {showHome ? (

        <View style={styles.homeScreen}>
          <Text style={styles.homeFlag}>🇪🇹</Text>
          <Text style={styles.homeTitle}>Ethio Quiz</Text>
          <Text style={styles.homeDesc}>Test your knowledge about Ethiopia! History, culture, geography and more.</Text>
          <TouchableOpacity style={styles.startButton} onPress={startQuiz}>
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>

      ) : showFinal ? (

        <ResultScreen
          score={score}
          totalQuestions={questions.length}
          restartQuiz={restartQuiz}
        />

      ) : (
        <View>
          <QuestionCard
            questionData={questions[currentQuestion]}
            selectedAnswer={selectedAnswer}
            showResult={showResult}
            handleAnswer={handleAnswer}
            nextQuestion={nextQuestion}
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
            timeLeft={timeLeft}
            restartQuiz={restartQuiz}
          />
        </View>

      )}

    </ScrollView>

  );

}


const styles = StyleSheet.create({

  container: {

    flex: 1,

    padding: 20,

    backgroundColor: "#f5f5f5"

  },



  title: {

    fontSize: 28,

    fontWeight: "bold",

    marginBottom: 30,

    textAlign: "center"

  },



  question: {

    fontSize: 20,

    marginBottom: 20,

    fontWeight: "bold"

  },



  option: {

    backgroundColor: "white",

    padding: 15,

    marginVertical: 8,

    borderRadius: 8,

    elevation: 2

  },



  optionText: {

    fontSize: 16

  },



  correct: {

    backgroundColor: "#b6f7c1"

  },



  wrong: {

    backgroundColor: "#f7b6b6"

  },



  feedback: {

    fontSize: 18,

    marginTop: 15,

    fontWeight: "bold"

  },



  explanation: {

    fontSize: 14,

    marginVertical: 10,

    color: "#444"

  },



  button: {

    backgroundColor: "#2e86de",

    padding: 15,

    borderRadius: 8,

    marginTop: 10

  },



  buttonText: {

    color: "white",

    textAlign: "center",

    fontWeight: "bold"

  },



  score: {

    fontSize: 22,

    marginBottom: 20,

    textAlign: "center"

  },



  message: {

    fontSize: 16,

    marginBottom: 20,

    textAlign: "center"

  },



  homeScreen: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60
  },

  homeFlag: {
    fontSize: 80,
    marginBottom: 20
  },

  homeTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#2e86de",
    marginBottom: 16
  },

  homeDesc: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
    paddingHorizontal: 20
  },

  startButton: {
    backgroundColor: "#2e86de",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8
  },

  appName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2e86de"
  },

  progress: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600"
  },

  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 4
  },

  progressBarBackground: {
    height: 8,
    backgroundColor: "#ddd",
    borderRadius: 4,
    marginBottom: 8,
    overflow: "hidden"
  },

  progressBarFill: {
    height: 8,
    backgroundColor: "#2ecc71",
    borderRadius: 4
  },

  endButton: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#e74c3c"
  },

  timer: {
    fontSize: 15,
    fontWeight: "bold"
  }

});