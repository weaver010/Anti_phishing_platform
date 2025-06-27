import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSimulationStore = create(
  persist(
    (set, get) => ({
      // Email simulation state
      currentQuestion: 0,
      score: 0,
      answers: {},
      isCompleted: false,
      simulationType: 'email', // 'email', 'website', etc.
      
      // Simulation history
      completedSimulations: [],
      
      // Actions
      answerQuestion: (questionIndex, userAnswer, isCorrect) => {
        const { answers, score } = get();
        
        const result = {
          userAnswer,
          isCorrect,
          timestamp: new Date().toISOString()
        };
        
        set({
          answers: {
            ...answers,
            [questionIndex]: result
          },
          score: isCorrect ? score + 1 : score
        });
      },
      
      // Move to next question
      nextQuestion: () => {
        const { currentQuestion } = get();
        set({ currentQuestion: currentQuestion + 1 });
      },
      
      // Complete simulation
      completeSimulation: (totalQuestions) => {
        const { score, simulationType } = get();
        const completionData = {
          id: Date.now(),
          type: simulationType,
          score,
          totalQuestions,
          percentage: Math.round((score / totalQuestions) * 100),
          completedAt: new Date().toISOString()
        };
        
        set(state => ({
          isCompleted: true,
          completedSimulations: [completionData, ...state.completedSimulations.slice(0, 9)] // Keep last 10
        }));
      },
      
      // Reset simulation
      resetSimulation: () => {
        set({
          currentQuestion: 0,
          score: 0,
          answers: {},
          isCompleted: false
        });
      },
      
      // Set simulation type
      setSimulationType: (type) => set({ simulationType: type }),
      
      // Get simulation results
      getResults: () => {
        const { score, answers, isCompleted } = get();
        const totalAnswered = Object.keys(answers).length;
        
        return {
          score,
          totalAnswered,
          percentage: totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0,
          isCompleted,
          answers
        };
      },
      
      // Get simulation history
      getHistory: () => get().completedSimulations,
      
      // Clear history
      clearHistory: () => set({ completedSimulations: [] }),
      
      // Get current answer for a question
      getCurrentAnswer: (questionIndex) => {
        const { answers } = get();
        return answers[questionIndex] || null;
      },
      
      // Check if question is answered
      isQuestionAnswered: (questionIndex) => {
        const { answers } = get();
        return answers.hasOwnProperty(questionIndex);
      },
      
      // Get overall simulation stats
      getOverallStats: () => {
        const { completedSimulations } = get();
        
        if (completedSimulations.length === 0) {
          return {
            totalSimulations: 0,
            averageScore: 0,
            bestScore: 0,
            recentScore: 0
          };
        }
        
        const totalSimulations = completedSimulations.length;
        const averageScore = Math.round(
          completedSimulations.reduce((sum, sim) => sum + sim.percentage, 0) / totalSimulations
        );
        const bestScore = Math.max(...completedSimulations.map(sim => sim.percentage));
        const recentScore = completedSimulations[0]?.percentage || 0;
        
        return {
          totalSimulations,
          averageScore,
          bestScore,
          recentScore
        };
      }
    }),
    {
      name: 'simulation-storage',
      partialize: (state) => ({ 
        completedSimulations: state.completedSimulations 
      }),
    }
  )
);

export default useSimulationStore;
