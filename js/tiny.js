/* global tinyMCE */
/* exported getText, words, sentences */

function getText(format) {
  if (format === 'html') {
    return tinyMCE.activeEditor.getContent({ format: 'html' });
  }
  if (format === 'text') {
    return tinyMCE.activeEditor.getContent({ format: 'text' });
  }
}

function words(text) {
  // Splits a string of text into an array of words
  return text
    .replace(/[-'.]/gi, '') // Ignores hyphens and apostrophes. Dots are here to avoid split on . in numbers.
    .split(/[^a-zA-ZæøåÆØÅ0-9]/g) // Can't use \W+ since I need to take into account danish character ÆØÅ
    .filter(Boolean);
}

function sentences(text) {
  const sentenceArray = [];
  const sentences = text
    // TODO: Match know abrreviations instead of the replaces
    .replace(/\. ([a-z])/g, ' $1')
    .replace(/\.([a-z])/g, '$1')
    .split(/\?|\!|\.|\n/g)
    .forEach(element => {
      sentenceArray.push(element.trim());
    });
  return sentenceArray.filter(Boolean);
}

function calculateLix(wordCount, longWordsCount, sentenceCount) {
  return Math.round(wordCount / sentenceCount + (longWordsCount * 100) / wordCount);
}
