/**                  created by @manho MIT License 2022. 
                     Support in Google App Script 
**/

// fetch 
const fetch = (link) =>	{
    return UrlFetchApp.fetch(link)
} 
const fetchingWebhook = () => {
    const res = fetch("api.telegram.org/bot"+token+"/setWebhook?url="+gasLink)
    Logger.log(res)
}
const getUpdatesWebhook = () => {
    const res = fetch("api.telegram.org/bot"+token+"/getUpdates")
    Logger.log(res)
}
const deletewebhook = () => {
    const res = fetch("api.telegram.org/bot"+token+"/deletewebhook")
    Logger.log(res)
}
// debug 
//var testList2 = '{"update_id":427275035,"message":{"message_id":211,"from":{"id":539065210,"is_bot":false,"first_name":"Yufeng Deng","last_name":"峰哥","username":"fennng","language_code":"en-US"},"chat":{"id":"1381836444","first_name":"Yufeng Deng","last_name":"峰哥","username":"fennng","type":"private"},"date":1540807486,"text":"/start","entities":[{"offset":0,"length":5,"type":"bot_command"}]}}';
//var isDebug = false;
 
//function debug() {
//  e = {};
//  e.postData = {};
//  e.postData.contents = testList2;
//  doPost(e);
//}
