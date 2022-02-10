/**                  created by @manho MIT License 2022. 
                     Support in Google App Script 
**/
const bot = (body) => {
    if (body.message) {
        if (body.message.text) {
            if (body.message.text.indexOf("/start") >= 0) {
                return sendMessage(body.message.chat.id, getMentionName(body.message.from) + " 欢迎启动本机器人\n\n" +
                    "本机器人可以提供入群验证服务。需要管理员权限")
            } else if (body.message.text.indexOf("/help") >= 0) {
                return sendMessage(body.message.chat.id, "本机器人是一个入群验证机器人，只需要把我加入你的群中便可操作。\n\n原代码：" + github)
            }
        } else if (body.message.new_chat_member) {
            if (body.message.new_chat_member.id != bot_id) {
                if (!nameIsArabic(body.message.new_chat_member)) {
                    const qe1 = randomIntFromInterval(10, 150);
                    const qe2 = randomIntFromInterval(100, 150);
                    var answer = qe1 + qe2
                    var n1 = answer + 1;
                    var n2 = answer + 2;
                    var n3 = answer - 1;
                    var n4 = answer;
                    var n5 = answer - 2;
                    // buttons
                    const buttons = [{
                            "text": n1,
                            "callback_data": "re:false" + body.message.new_chat_member.id
                        },
                        {
                            "text": n2,
                            "callback_data": "re:false" + body.message.new_chat_member.id
                        },
                        {
                            "text": n3,
                            "callback_data": "re:false" + body.message.new_chat_member.id
                        },
                        {
                            "text": n4,
                            "callback_data": "re:true" + body.message.new_chat_member.id
                        },
                        {
                            "text": n5,
                            "callback_data": "re:false" + body.message.new_chat_member.id
                        },
                        {
                            "text": "封禁(管理员)",
                            "callback_data": "re:ban" + body.message.new_chat_member.id
                        },

                    ]
                    return [mute(body.message.chat.id, body.message.new_chat_member.id, 0), sendMessage(body.message.chat.id, getMentionName(body.message.new_chat_member) + " 欢迎加入本群，" +
                        "请根据提示完成人机验证\n\n" + qe1 + " + " + qe2 + " = ❓❓\n\n管理员点击任意按钮新成员可通过。", generateInlineKeyboardMarkup(buttons, 5)), deleteMessage(body.message.chat.id, body.message.message_id)]
                } else {
                    // kick arab. 
                    return [kick(body.message.chat.id, body.message.new_chat_member.id), sendMessage(body.message.chat.id, `本群群员无法理解阿拉伯语，已清除。${getMentionName(body.message.new_chat_member)} \n（耶，又干走了一个小清真！）}`)]
                }
            } else {
                // bot joined grp. 
                return sendMessage(body.message.chat.id, "入群验证服务已激活\n群id：" + body.message.chat.id)
            }

        } else if (body.message.left_chat_member) {
            // delete left chat msg. 
            return deleteMessage(body.message.chat.id, body.message.message_id)
        }
    } else if (body.callback_query) {
        //handle data from buttons. 
        if (body.callback_query.data.indexOf("re") >= 0) {
            const data = body.callback_query.data
            if (data.indexOf("re:false") >= 0) {
                if (body.callback_query.from.id != data.replace("re:false", "")) {
                    if (!isAdmin(body.callback_query.from.id, body.callback_query.message.chat.id)) {
                        // alert to some idiot people who click the unnecessary button. 
                        return answerCallBackQuery(body.callback_query.id, "又不是问你，自作多情")
                    } else {
                        // admin pass. 
                        return [editMessage(body.callback_query.message.chat.id, body.callback_query.message.message_id, "✅✅管理员通过验证"), unmute(body.callback_query.message.chat.id, data.replace("re:false", ""))]
                    }
                } else {
                    // wrong answer. 
                    return [editMessage(body.callback_query.message.chat.id, body.callback_query.message.message_id, "❌❌回答错误"), kick(body.callback_query.message.chat.id, data.replace("re:false", ""))]
                }
            } else if (data.indexOf("re:true") >= 0) {
                if (body.callback_query.from.id != data.replace("re:true", "")) {
                    if (!isAdmin(body.callback_query.from.id, body.callback_query.message.chat.id)) {
                        // alert to some idiot people who click the unnecessary button. 
                        return answerCallBackQuery(body.callback_query.id, "请无关人士不要来捣乱")
                    } else {
                        // admin pass
                        return [editMessage(body.callback_query.message.chat.id, body.callback_query.message.message_id, "✅✅管理员通过验证"), unmute(body.callback_query.message.chat.id, data.replace("re:true", ""))]
                    }
                } else {
                    // answer with correct.
                    return [unmute(body.callback_query.message.chat.id, data.replace("re:true", "")), editMessage(body.callback_query.message.chat.id, body.callback_query.message.message_id, "✅✅回答正确")]
                }
            } else if (data.indexOf("re:ban") >= 0) {
                if (isAdmin(body.callback_query.from.id, body.callback_query.message.chat.id)) {
                    // admin manual kick. 
                    return [kick(body.callback_query.message.chat.id, data.replace("re:ban", "")), editMessage(body.callback_query.message.chat.id, body.callback_query.message.message_id, "⭕⭕管理员手动封禁成功")]
                } else {
                    // Show to someone click the button but non an admin m
                    return answerCallBackQuery(body.callback_query.id, "你是管理员？")
                }
            }
        }
    }
}
