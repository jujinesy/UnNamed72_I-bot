/*
README.md를 꼭 읽어주시기 바랍니다. 라이선스(저작권 허락)에 관한 내용이 있습니다.

'메신저 자동응답 봇' 어플용 스크립트입니다.

특정 스크립트의 전원을 키고, 끄는 스크립트입니다.
Api.on()과 Api.off()의 갯수를 늘려서 더 많은 스크립트를 한번에 통제할 수 있습니다.

여기서는 예시로 "test1.js"와 "test2.js"라는 스크립트를 끄고 켜봤습니다.
*/


const scriptName="전원.js";

//변수들 미리 선언
var botOn = true;
var administrator = [];
var command;

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
  	//명령어가 'on' 혹은 'off'일때
  if(msg == "on" || msg == "off") {
		//관리자가 'on'을 외쳤을 때
		if(administrator.indexOf(sender) !== -1 && msg === "on") {
			if(botOn == true) {	//봇이 이미 켜져 있으면
				replier.reply ("봇이 이미 작동중입니다.");
      			} else {		//봇이 켜져 있지 않으면
				botOn = true;
				Api.on("test1.js");
				Api.on("test2.js");
				replier.reply("작동을 시작합니다.");
      			}
		} else if(administrator.indexOf(sender) !== -1 && msg === "off") {	//관리자가 'off'를 외쳤을 때
			if(botOn == true) {		//봇이 켜져있으면
				botOn = false;
				Api.off("test1.js");
				Api.off("test2.js");
				replier.reply("봇이 작동을 중지합니다.");
			} else replier.reply("봇이 이미 꺼져있습니다.");		//봇이 켜져있지 않으면
		} else replier.reply("관리자가 아닙니다.");		//관리자 아닌 사람이 'on'이나 'off'를 보냈을 때
	}
}
