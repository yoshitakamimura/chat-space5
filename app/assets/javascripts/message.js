$(function(){
  function buildHTML(message){

    if ( message.image ) {
      let html =
        `<div class="message">
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
            <img src=${message.image}>
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="message">
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


  $('#new_message').on('submit', function(e) {
    e.preventDefault();

    let formData = new FormData(this);
    let url = $(this).attr('action');

    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      let html = buildHTML(data);
      $('.messages').append(html);
      $('form')[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('.submit-button').prop("disabled", false);
    })

    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  return false;
  })
});