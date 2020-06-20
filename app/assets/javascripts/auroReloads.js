$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="message" data-message-id=${message.id}>
          <div class="upper-message">
            <div class="upper-message__member">
              ${message.user_name}
            </div>
            <div class="upper-message__date">
              ${message.created_at}
            </div>
          </div>
          <div class="lower-message">
            <p class="text">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="message" data-message-id=${message.id}>
        <div class="upper-message">
          <div class="upper-message__member">
            ${message.user_name}
          </div>
          <div class="upper-message__date">
            ${message.created_at}
          </div>
        </div>
        <div class="lower-message">
          <p class="text">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }


  let reloadMessages = function () {
    let last_message_id = $('.message:last').data("message-id");

    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })

    .done(function(message) {
      if (reloadMessages.length !== 0) {
        let insertHTML = '';

        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messageField').append(insertHTML);
        $('.MessageField').animate({ scrollTop: $('.MessageField')[0].scrollHeight});
      }
    })

    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});