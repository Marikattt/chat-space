json.user_name  @message.user.name
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")
json.content @message.content
json.image_tag @message.image.url
