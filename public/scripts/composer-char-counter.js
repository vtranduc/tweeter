$(document).ready(function() {
  // --- our code goes here ---

  //console.log('sup yo')

  $(".textbox").on("input", function(event) {

    //============================

    const wordCount = 140 - $(this).val().length;
    $(".wordCounter").text(wordCount);
    if (wordCount >= 0) {
      $(".wordCounter").css("color", "#1a568f")
      
    } else {
      $(".wordCounter").css("color", "red")
    }

    //=======================================

  });


});