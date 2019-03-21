import {_getQuestions, _getUsers, _saveQuestion, _saveQuestionAnswer} from './_DATA';

export function getData() {
  return Promise.all([_getQuestions(), _getUsers()])
    .then(([questions, users]) => ({
      questions,
      users
    }));
}

export function saveQuestion(question) {
  return _saveQuestion(question);
}

export function answer(data) {
  return _saveQuestionAnswer(data);
}

export function formatDate(timestamp) {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString('en-US');
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString();
}

export function isBlank(s = '') {
  return s.length === 0 || !s.trim();
}

