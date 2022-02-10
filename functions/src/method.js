/**                  created by @manho MIT License 2022. 
                     Support in Google App Script 
**/

// action in Telegram.

const sendMessage = (chat_id,text,reply_markup) => {
    if(!reply_markup){
        reply_markup = ""
    } 
    return {
        "method": "sendMessage",
        "chat_id": chat_id,
        "parse_mode": "Markdown",
        "text": text, 
        "disable_web_page_preview": true,
        "reply_markup": reply_markup
    }
};

const deleteMessage = (chat_id,msg_id) => {
    return {
        "method": "deleteMessage",
        "chat_id": chat_id,
        "message_id": msg_id
    }
};

const mute = (chat_id, user_id, date) => {
    return {
        "method": 'restrictChatMember',
        "chat_id": chat_id,
        "user_id": user_id,
        "can_send_messages": false,
        "can_send_media_messages": false,
        "can_send_other_messages": false,
        "can_add_web_page_previews": false,
        "until_date": Date.now() / 1000 + date
    }
};

const unmute = (chat_id, user_id,) => {
    return {
        "method": 'restrictChatMember',
        "chat_id": chat_id,
        "user_id": user_id,
        "can_send_messages": true,
        "can_send_media_messages": true,
        "can_send_other_messages": true,
        "can_add_web_page_previews": true,
    }
};

const editMessage = (chat_id, msg_id, txt) => {
    return {
        "method": "editMessageText",
        "chat_id": chat_id,
        "message_id": msg_id, 
        "text": txt, 
        "disable_web_page_preview": true,
        "parse_mode": "Markdown"
    }
}

const answerCallBackQuery = (id, txt,) => {
    return {
        "method": "answerCallbackQuery",
		"callback_query_id": id,
		"text": txt,
		"show_alert": true
    }
}

const kick = (chat_id, user_id) => {
    return {
        "method": "kickChatMember",
        "chat_id": chat_id,
        "user_id": user_id
    }
} 
