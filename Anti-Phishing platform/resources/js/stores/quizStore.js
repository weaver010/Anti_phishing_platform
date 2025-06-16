import { create } from 'zustand';

const useQuizStore = create((set, get) => ({
  // Quiz state
  isModalOpen: false,
  currentQuestion: 0,
  score: 0,
  quizCompleted: false,
  answers: [],
  
  // Quiz questions
  questions: [
    {
      question: "Is this email safe? Subject: 'Urgent: Update Your Account Now!'",
      description: "An email claiming to be from your bank asks you to click a link to update your account details immediately, with a generic greeting ('Dear Customer').",
      options: ["Safe", "Phishing"],
      correctAnswer: "Phishing",
    },
    {
      question: "Is this email safe? Subject: 'Your Order Confirmation #12345'",
      description: "An email with your recent order details, sent from a legitimate company email (e.g., orders@amazon.com), but you didn't place an order recently.",
      options: ["Safe", "Phishing"],
      correctAnswer: "Phishing",
    },
    {
      question: "Is this email safe? Subject: 'Meeting Agenda for Tomorrow'",
      description: "An email from your colleague's email address with a meeting agenda, but the email contains a suspicious attachment named 'agenda.exe'.",
      options: ["Safe", "Phishing"],
      correctAnswer: "Phishing",
    },
  ],
  
  // Actions
  setIsModalOpen: (value) => set({ isModalOpen: value }),
  
  // Handle answer
  handleAnswer: (answer) => {
    return new Promise((resolve) => {
        const { currentQuestion, questions, score, answers } = get();
        const isCorrect = answer === questions[currentQuestion].correctAnswer;
        
        // Store the answer
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = {
          question: questions[currentQuestion].question,
          answer,
          correct: isCorrect
        };
        
        if (isCorrect) {
            set({ score: score + 1 });
        }
        
        const isLastQuestion = currentQuestion === questions.length - 1;
        
        set({ 
            answers: newAnswers,
            currentQuestion: isLastQuestion ? currentQuestion : currentQuestion + 1,
            quizCompleted: isLastQuestion
        });
        
        resolve();
    });
  },

  // Get quiz results
  getQuizResults: () => {
    const { score, questions, answers } = get();
    const totalQuestions = questions.length;
    const percentage = (score / totalQuestions) * 100;
    
    let feedback;
    if (percentage === 100) {
      feedback = "Excellent! You're well-prepared to identify phishing attempts!";
    } else if (percentage >= 70) {
      feedback = "Good job! You have a solid understanding of phishing awareness, but there's room for improvement.";
    } else {
      feedback = "You might want to review the phishing awareness materials. Stay vigilant!";
    }

    // Get answer breakdown
    const answerBreakdown = answers.map((answer, index) => ({
      question: questions[index].question,
      description: questions[index].description,
      userAnswer: answer.answer,
      correctAnswer: questions[index].correctAnswer,
      isCorrect: answer.correct
    }));

    return {
      score,
      totalQuestions,
      percentage,
      feedback,
      answerBreakdown
    };
  },

  resetQuiz: () => {
    return new Promise((resolve) => {
        set({
            currentQuestion: 0,
            score: 0,
            quizCompleted: false,
            answers: []
        });
        resolve();
    });
  },
}));

export default useQuizStore;