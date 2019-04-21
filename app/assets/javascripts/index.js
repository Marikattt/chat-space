$(function() {
var user_list = $('#user-search-result');
var users_list = $("#chat-group-users");

function appendUser(user) {
  var html = `
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
              </div>`
    user_list.append(html);
  };
function changeUser(userName, userId) {
  var html = `<div class='chat-group-user clearfix js-chat-member' id='${userId}'>
                <input name='group[user_ids][]' type='hidden' value='${userId}'>
                <p class='chat-group-user__name'>${userName}</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`
    users_list.append(html);
  };

  $("#user-search-field").on("keyup", function(e) {
    e.preventDefault();
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: {keyword: input},
      dataType: 'json'
    })
    .done(function(users) {
      $('#user-search-result').empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーはいません");
      }
    })
    .fail(function() {
      alert('ユーザー名検索に失敗しました');
    });
  });
  
  $(document).on('click', '.user-search-add', function(){
    $(this).parent().remove();
    var userName = $(this).data('userName');
    var userId = $(this).data('userId');
    changeUser(userName, userId);
  });
  
  $(document).on('click', '.user-search-remove', function(){
    $(this).parent().remove();
  });
});