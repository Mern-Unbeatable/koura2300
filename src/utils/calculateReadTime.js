const WORDS_PER_MINUTE = 200;
const MINIMUM_READ_MINUTES = 1;
const WHITESPACE_PATTERN = /\s+/;

const countWords = (text) => text.trim().split(WHITESPACE_PATTERN).length;

const countTotalWords = (paragraphs) =>
  paragraphs.reduce((total, paragraph) => total + countWords(paragraph), 0);

const calculateReadMinutes = (paragraphs) =>
  Math.max(MINIMUM_READ_MINUTES, Math.ceil(countTotalWords(paragraphs) / WORDS_PER_MINUTE));

export default calculateReadMinutes;
