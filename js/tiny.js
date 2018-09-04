function getText(format) {
    if (format == "html") {
        return tinyMCE.activeEditor.getContent({ format: "html" });
    } else if (format == "text") {
        return tinyMCE.activeEditor.getContent({ format: "text" });
    }
}

function words(text) {
    // Splits a string of text into an array of words
    return text
        .replace(/[-'.]/ig, "") // Ignores hyphens and apostrophes. Dots are here to avoid split on . in numbers.
        .split(/[^a-zA-ZæøåÆØÅ0-9]/g) // Can't use \W+ since I need to take into account danish character ÆØÅ
        .filter(Boolean);
}

function sentences(text) {
    var sentenceArray = [];
    var sentences = text
        // TODO: Match know abrreviations instead of the replaces
        .replace(/\. ([a-z])/g, " $1")
        .replace(/\.([a-z])/g, "$1")
        .split(/\?|\!|\.|\n/g)
        .forEach(function(element) {
            sentenceArray.push(element.trim());
        });
        return sentenceArray.filter(Boolean);
}

function calculateLix(wordCount, longWordsCount, sentenceCount) {
    return Math.round((wordCount / sentenceCount) + ((longWordsCount * 100) / wordCount));
}

function outputContent(selector, input) {
    document.querySelectorAll(selector).forEach(function(selector) {
        selector.innerHTML = input;
    });
}

function readabilityScore() {
    if(tinyMCE.activeEditor.getContent()) {
        console.log(tinyMCE.activeEditor.getContent());
    }

    // Get the text from the editor and format it as raw text
    var text = getText("text");

    // Create an array with all the words in the text
    var wordsArray = words(text);

    // Count the total number of words in the text
    var wordCount = wordsArray.length;

    // Count all of the words which are longer than 6 characters
    var longWordsCount = wordsArray
        .filter(function(arrayOfWords) { return arrayOfWords.length > 6; })
        .length;
    
    // Create an array of all sentences in the text
    var sentenceArray = sentences(text);

    // Count the number of sentences in the text
    var sentenceCount = sentenceArray.length;
    
    
    // Calculate and output the lix score to all DOM elements with the class of lix
    var lixScore = calculateLix(wordCount, longWordsCount, sentenceCount);
    document.getElementById("lix").innerHTML = lixScore;
    
}

// TODO: For some weird reason there is a lack or something on the getContent(), therefore this tiny delay before everything fires. Should be refactored
setTimeout(readabilityScore, 1000);
