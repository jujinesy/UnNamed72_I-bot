/*
처음 if문에서 room === 지정해주세요, 혹은 없애거나.
"!주사위(숫자)"를 치면 (숫자)에 해당하는 숫자만큼의 면을 가진 주사위를 굴려서 결과를 알려줍니다.
*/


const scriptName="주사위.js";

var count;
var num;

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId){
    if(room === "방 지정") {
        if(msg.indexOf("!주사위") == 0) {
            count = parseInt(msg.slice(4));
            num = Math.floor(Math.random() * count) + 1;
            replier.reply(num + "이(가) 나왔어요!");
            return;
        }
    }
}
