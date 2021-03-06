$(function(){
function buildHTML(message){
  Message = message.content ? message.content : ('');
  Image = message.image.url ? message.image.url : ('');

  var html = `<div class = "message" data-id=${message.id}>
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
                    <img src = '${Image}'>
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
      $('.new_message')[0].reset();
      $('.form__submit').attr('disabled', false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })  
     .fail(function(){
       alert('error');
    });
  });
  $(function() {
   function update(){
    var message_id = $('.message:last').data('id');
    var group_id = $('.left-header__title').data('id');
    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: message_id, group_id: group_id.to_i}
    })
    .done(function(data){
      var insertHTML = '';
        data.forEach(function(message){
          insertHTML += buildHTML(message); 
          $('.messages').append(insertHTML);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        })
      })
      .fail(function(){
        alert('error');
      });
     };
  setInterval(update, 5000);
 });
});
