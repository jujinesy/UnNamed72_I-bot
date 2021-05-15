/*
README.md를 꼭 읽어주시기 바랍니다. 라이선스(저작권 허락)에 관한 내용이 있습니다.

'메신저 자동응답 봇' 어플용 스크립트입니다. 약간의 수정 후 다른 앱에서도 사용 가능합니다.

지정된 관리자 목록(administrator에 미리 들어가있는 닉네임들)이 관리자 인증을 받을 수 있는 소스입니다.
관리자 인증을 받으면 logged_in 목록으로 imageDB가 들어가게 되며, 관리자 인증을 받아야지만 특정 명령어를 사용할 수 있도록 설정하시면 됩니다.

로그인이 된 상태에서 계속 '관리자인증'명령어로 로그인이 가능하지만 인증여부는 계속 '인증됨'으로 유지되며, '로그아웃'을 사용하거나 봇을 재컴파일했을때 모두 로그아웃이 됩니다.
*/


const scriptName="관리자인증.js";

//변수 미리 선언
var administrator = []; //관리자 인증 가능한 사람 목록(관리자목록)
var logged_in = []; //로그인한 관리자 목록
var key; //인증요청시 비밀번호
var log_out; //로그아웃할때 쓰는 변수

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {

  if(administrator.indexOf(sender) !== -1) {
          if(msg === "관리자인증") {
              key = Math.floor(Math.random()*9000) + 1000;
              replier.reply(sender, sender + "님의 비밀번호: \n" + key);
              return replier.reply("비밀번호를 입력해주세요.");
          }
          else if(msg == key) {
              logged_in.push(java.lang.String(ImageDB.getProfileImage()).hashCode());
              key = 0;
              return replier.reply(sender + "님이 관리자로 로그인 하셨습니다.");
          }
          else if(msg === "로그아웃" && logged_in.length !== 0) {
              for(i=0; i < logged_in.length; i++) {
                  if(logged_in[i] === java.lang.String(ImageDB.getProfileImage()).hashCode()) {
                      logged_in.splice(i, 1);
                      log_out = true;
                  } else log_out = false;
              }
              if(log_out) replier.reply(sender + "님이 관리자 계정에서 로그아웃하셨습니다.");
              else replier.reply(sender + "님은 관리자 계정에 로그인되어 있지 않습니다.");
              return;
          }
          else if(msg === "로그아웃" && logged_in.length == 0) {
              replier.reply("현재 로그인 되어있는 관리자가 없습니다.");
              return;   
          }
      }
}
