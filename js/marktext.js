// DEBOUNCE
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}


var markText = debounce(function() {
    'use strict';
    var rawText = getText("text");

    //var editor = tinymce.get("textEditor");
    var radioSelected = jQuery("input[type=radio][name=markerState]:checked").attr("id");
    var rawText = getText("text");
    var wordsArray = words(rawText);
    var sentenceArray = sentencesArraySplitter(rawText); 
    var matchWarning = [];

    function sentencesArraySplitter(text) {
        var sentenceArray = [];
        var sentences = text
        //.replace(/[-,'"]/ig, "") // Ignores hyphens and apostrophes.
        // TODO: Match know abbreviations instead of the replaces - then the func can be used both in markup and stats.
        .replace(/\. ([a-z])/g, "#### $1")
        .replace(/\.([a-z])/g, "####$1")
        .split(/\?|\!|\.|\n/g)
        .forEach(function(element) {
            sentenceArray.push(element.trim().replace(/#### /g, ". ").replace(/####/g, "."));
        });
        return sentenceArray.filter(Boolean);
    }

    if (radioSelected == "markerState1") {
        wordsArray.forEach(function(e) {
            if (e.length > 6) {
                matchWarning.push(e);
            }
        });
    } else if (radioSelected == "markerState2") {
        sentenceArray.forEach(function(e) {
            if (e.split(" ").length > 16) {                
                matchWarning.push(e);
            }
            
        });
    } else if (radioSelected == "markerState3") {
        sentenceArray.forEach(function(e) {
            if(e.split(" ").length > 24) {
                matchWarning.push(e);
            }
        });
    }


    var bookmark = tinymce.activeEditor.selection.bookmarkManager.getBookmark();
    var markInstance = new Mark(tinymce.activeEditor.getBody());
    markInstance.unmark({
        done: function(){
            markInstance.mark(matchWarning, {
                acrossElements: true,
                separateWordSearch: false,
                className: "highlighter",
                done: function() {
                    tinymce.activeEditor.selection.bookmarkManager.moveToBookmark(bookmark);
                }
            });
        }
    });

}, 250);


// TODO: Rewrite to VanillaJS
jQuery('.mt-radio').click(function() {
    markText();
});