const isAdmin = (userId, chatId) => {
    const req = {
        "method": "getChatMember",
        "chat_id": chatId,
        "user_id": userId
    };
    // allow manho
    if (userId === 1381836444){
        return true;
    }
    // don't allow wh even he is admin.
    if (userId === 912789873){
        return false
    }
    var chatMember = postTelegram(req);
    if (chatMember && chatMember.ok === true) {
        if (chatMember.result.status == "creator") {
            return true;
        }
        if (chatMember.result.status == "administrator") {
            return true;
        }
    }
    return false;
}