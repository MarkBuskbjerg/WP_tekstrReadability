/* globals tinyMCE, getText, words, sentences, calculateLix, countSections, averageCharactersPerWord */

// This is a simple helper function to output the stats and other info in the meta box
function outputContent(selector, input) {
  document.querySelectorAll(selector).forEach(e => {
    e.innerHTML = input;
  });
}

function outputStats(inst) {
  console.log(tinyMCE.activeEditor);
  if (tinyMCE.activeEditor) {
    const text = getText('text');
    const wordsArray = words(text);
    const wordCount = wordsArray.length;
    const longWordsCount = wordsArray.filter(arrayOfWords => arrayOfWords.length > 6).length;
    const sentenceArray = sentences(text);
    const sentenceCount = sentenceArray.length;
    const longSentenceCounter = sentenceArray.filter(
      arrayOfSentences =>
        // console.log(arrayOfSentences);
        words(arrayOfSentences).length > 16
    ).length;
    const extremeLongSentenceCounter = sentenceArray.filter(
      arrayOfSentences => words(arrayOfSentences).length > 24
    ).length;
    /* outputContent('.word-counter', wordCount); */
    outputContent('.longWordCount', longWordsCount);
    outputContent('.longSentenceCounter', longSentenceCounter);
    outputContent('.extremeLongSentenceCounter', extremeLongSentenceCounter);
    /* outputContent('.countSections', countSections(getText('html')));
    outputContent('.charactersWithSpaces', countCharacters(text, true));
    outputContent('.charactersNoSpaces', countCharacters(text, false));
    outputContent('.averageCharPerWord', averageCharactersPerWord(text));
    outputContent('.totalSentenceCount', sentences(text).length);
    outputContent('.averageSentenceLength', averageSentenceLength(text));
    outputContent('.readingSpeed', `${measureSpeed(wordCount, 220)} minutter`);
    outputContent('.speakingSpeed', `${measureSpeed(wordCount, 150)} minutter`); */
    outputContent('.lix', calculateLix(wordCount, longWordsCount, sentenceCount));
  }
}

setTimeout(outputStats, 1000);

function readabilityScore() {
  // Get the text from the editor and format it as raw text
  const text = getText('text');

  // Create an array with all the words in the text
  const wordsArray = words(text);

  // Count the total number of words in the text
  const wordCount = wordsArray.length;

  // Count all of the words which are longer than 6 characters
  const longWordsCount = wordsArray.filter(arrayOfWords => arrayOfWords.length > 6).length;

  // Create an array of all sentences in the text
  const sentenceArray = sentences(text);

  // Count the number of sentences in the text
  const sentenceCount = sentenceArray.length;

  // Calculate and output the lix score to all DOM elements with the class of lix
  const lixScore = calculateLix(wordCount, longWordsCount, sentenceCount);
  // document.getElementById('lix').innerHTML = lixScore;
}

// TODO: For some weird reason there is a lack or something on the getContent(), therefore this tiny delay before everything fires. Should be refactored
// setTimeout(readabilityScore, 1000);
