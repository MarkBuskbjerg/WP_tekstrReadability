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
