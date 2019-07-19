$(document).ready(function() {
  loadTweet();
  posting();
  quickScroller();
});

const loadTweet = function() {
  $.ajax({
    method: 'GET',
    url: '/tweets',
    dataType: 'json'
  }).success(function(data) {
    $('#tweets-container').empty();
    renderTweets(data);
    $('.new-tweet').slideToggle();
  }).fail(function() {
  })
}


const quickScroller = function() {
  $('.quickSlider').on("click", function(event) {
    event.preventDefault();
    $('.new-tweet').slideToggle();
  })
}

const posting = function() {
  $("#newPost").on("submit", function(event) {
    event.preventDefault();
    if ($(this).serialize().length === 5) {

      $('#hiddenError1').slideDown(500, function() {
        $("#hiddenError1").delay(1000).slideToggle(500);
      });
      
      return;
    } else if ($(this).serialize().length > 145) {
      $('#hiddenError2').slideDown(500, function() {
        setTimeout(function() {
          $('#hiddenError2').slideToggle();
        }, 1000)
      });
      return;
    }
    $.ajax('/tweets', {
      type: 'POST',
      data: $(this).serialize(),
      dataType: 'text'
    }).done(
      function() {
        // location.reload(); 
///////////////////////////////////////////////////////////////////////////
        $("#tweets-container").empty();

        $('#inserted').val("");
        $(".wordCounter").text("140");

        // $(document).ready(function() {
        loadTweet();
        // })
        console.log('yaaaa')
        // //add stuffs
        // (data);------------------------------------------

      }
    ).fail(
      function(error) {
      }
      
    )
  })
}


//-----------------------------------------------------------------------------


const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


const renderTweets = function(tweets) {
  for (let i = tweets.length - 1; i >= 0; i--) {
    let rendered = createTweetElement(tweets[i]);
    $("#tweets-container").append(rendered);
  }
}

const createTweetElement = function(tweet) {
  let $tweet = $('<article>').addClass('tweet');
  // ...

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const markUp = `<section class="specificTweet">
  <div style="padding: 2%">
  <!-- <span> -->
    <header class="profiling">
      <img src=${tweet.user.avatars} style="position:relative; left: 0; max-width:20%; 
      height:auto;"/>
      <p>${tweet.user.name}</p>
      <p class="atID" style="position: absolute; right: 10%">${tweet.user.handle}</p>
    </header>
    <p class = "bodyTweet">
    ${escape(tweet.content.text)}
    </p>
    <footer class="bottomTweet">
      <div>${
        moment(new Date(tweet.created_at)
        ).fromNow()}</div>
      <div id="smallButtons">
        <button>Flag</button>
        <button>Retweet</button>
        <button>Like</button>
      </div>
    </footer>


  <!-- </span> -->

  </div>

</section>

<br>`;
  $tweet = $tweet.append(markUp)


  return $tweet;
}

