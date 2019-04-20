$(function(){
function buildHTML(message){
  Message = message.content ? message.content : ('');
  Image = message.image_tag ? message.image_tag : ('');
  var html = `<div class = "message">
                <div class = "upper-message">
                  <div class = "upper-message__user-name"> 
                    ${message.user_name}
                  </div>
                  <div class = 'upper-message__date'> 
                    ${message.created_at}
                  </div>
                </div>
                <div class = "lower-message">
                  <p class = 'lower-message__content'> 
                    ${Message}
                  </p>           
                  <div class = 'lower-message__image'>
                    ${Image}
                  </div>
                </div>
              </div>`
  return html;
}
  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form__message')[0].reset();
      $('.hidden')[0].reset();
      $('.form__submit').attr('disabled', false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })  
     .fail(function(){
       alert('error');
    });
  });
});