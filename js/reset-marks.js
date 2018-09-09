/* globals markText */

// Reset marks for the editor
function triggerUpdateEditor() {
  $('#post').submit();
}

jQuery(document).ready($ => {
  let stuffIsDone = false;

  $('#post').submit(e => {
    if (stuffIsDone) {
      stuffIsDone = false; // reset flag
      return; // let the event bubble away
    }

    e.preventDefault();

    // do stuff before the post submit is run
    document.getElementById('markerState0').checked = true;
    markText();
    // alert('finish doing stuff!!');

    stuffIsDone = true; // set flag

    setTimeout(triggerUpdateEditor, 300);
  });
});

// Reset marks when switching to HTML view
jQuery(document).ready($ => {
  let marksRemoved = false;

  function triggerHTMLEditor() {
    $('#content-html').click();
  }

  $('#content-html').on('click', e => {
    console.log('click is registrered');
    if (marksRemoved) {
      marksRemoved = false; // reset flag
      return; // let the event bubble away
    }

    e.preventDefault();

    // do lots of stuff
    document.getElementById('markerState0').checked = true;
    markText();

    marksRemoved = true; // set flag
    setTimeout(triggerHTMLEditor, 3000);
  });
});
