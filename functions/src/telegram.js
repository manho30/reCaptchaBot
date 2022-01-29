const postTelegram = (payload) => {
    const data = {
        'contentType': 'application/json',
        "method": "post",
        "muteHttpExceptions": true,
        "payload": JSON.stringify(payload)
    };
    var response, res;
    try {
        response = UrlFetchApp.fetch("https://api.telegram.org/bot" + token + "/", data);
        res = JSON.parse(response);
        Logger.log(res)
        return res;
    } catch (e) {
        return `{e}`
    }
}
const testApi = () => {
    var payload = {
        "method": "sendMessage",
        "chat_id": owner, 
        "text": "Hello World",
    }
    postTelegram(payload)
}
const doPost = (e) => {
    var body = JSON.parse(e.postData.contents);
    Logger.log(body)
    var payload = bot(body);
    if (Array.isArray(payload)) {
        payloads = payload;
    } else {
        payloads = [payload]
    }
    for (var i = 0; i < payloads.length; i++) {
        payload = payloads[i];
        if (payload) {
            var handleResponseCallBack = null;
            var delay = 0;
            if (payload.callback) {
                handleResponseCallBack = payload.callback;
                delete payload.callback;
            }
            if (payload.delay) {
                delay = payload.delay;
                delete payload.delay;
            }
            var res = postTelegram(payload);
            if (handleResponseCallBack) {
                handleResponseCallBack(res);
            }
        }
    }
}
 