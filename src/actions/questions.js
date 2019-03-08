export const GET_QUESTIONS = 'GET_QUESTIONS';

export function getQuestions(questions, user) {
  return {
    type: GET_QUESTIONS,
    questions,
    user
  }
}