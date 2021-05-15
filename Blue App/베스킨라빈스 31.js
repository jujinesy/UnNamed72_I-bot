/*
베스킨라빈스 31 게임을 하세요.
최상단의 administrator에 관리자 이름 넣으세요.
중간에 if문에 room == "하고싶은방" 부분을 없애거나 봇을 돌릴 방으로 맞추세요.
한번에 최대 3명까지 베라31을 각자 할 수 있습니다.
*/



const scriptName="베라.js";

var administrator = []; //관리자 목록

var single_1 = true; //서버 사용가능 여부
var single_2 = true;
var single_3 = true;

var player_s1 = ""; //각 게임별 플레이어명
var player_s2 = "";
var player_s3 = "";

var num_s1 = 0; //현재 마지막 숫자
var num_s2 = 0;
var num_s3 = 0;


function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId){

if(administrator.indexOf(sender) != -1) {

	if(msg.indexOf("!서버종료") == 0) {
		if(!single_1 && !single_2 && !single_3) {
			return replier.reply("종료할 서버가 없습니다.")
		}
		else if(msg.split(" ")[1] === "s1") {
			reset(single_1);
			return replier.reply
		}
		else if(msg.split(" ")[1] === "s2") {
			reset(single_2);
			return
		}
		else if(msg.split(" ")[1] === "s3") {
			reset(single_3);
			return
		}
		else return replier.reply("잘못된 명령어 입니다.");
	}

	if(msg === "!베라31 사용자") {
		replier.reply("≪I-bot 베스킨라빈스31 게임 사용자≫\n• 1번 싱글서버: " + player_s1 + "\n• 2번 싱글서버: " + player_s2 + "\n• 3번 싱글서버: " + player_s3);
	}
}

if(room === "하고싶은방") {
	if(msg === "!베라31") {
		replier.reply("I-bot(아이봇)이 운영하는 베스킨라빈스31 미니 게임입니다!\n\n게임방법: 봇과 1대1로 평범한 베스킨라빈스31을 합니다.\n봇부터 시작해 1부터 한번에 최대 3개의 숫자를 외칩니다. 먼저 31을 외치는 사람이 지게 됩니다.\n(명령어 형식: 1 2 3, 4 5, 6)\n\n기타명령어:\n• !베라31: 베라31 게임에 대한 설명을 보여줍니다.\n• !베라31 서버: 각 서버의 상태를 보여줍니다.\n• !베라31 싱글: 1인용 베스킨라빈스 31 게임을 시작합니다.\n• !베라31 종료: 현재 진행중인 게임을 종료합니다.\n\n관리자용 명령어: !서버종료 xx, !베라31 사용자");
	}

	if(msg === "!베라31 서버") {
		replier.reply("≪I-bot 베스킨라빈스 31 게임 서버상황≫\n\n• 1번 싱글서버: " + playable(single_1) + "\n" + "• 2번 싱글서버: " + playable(single_2) + "\n" + "• 3번 싱글서버: " + playable(single_3));
	}


	//싱글서버 할당
	if(msg === "!베라31 싱글" && sender !== player_s1 && sender !== player_s2 && sender !== player_s3) {
		if(single_1) {
			single_1 = false;
			player_s1 = sender;
			replier.reply(player_s1 + "님의 베스킨라빈스31 싱글 게임이 1번 서버에서 시작되었습니다.\n저부터 시작할께요.");
			return replier.reply("싱글 1번 서버 (" + player_s1 + ")\n" + random_num(single_1, num_s1));
		}
		else if(single_2) {
			single_2 = false;
			player_s2 = sender;
			replier.reply(player_s2 + "님의 베스킨라빈스31 싱글 게임이 2번 서버에서 시작되었습니다.\n저부터 시작할께요.");
			return replier.reply("싱글 2번 서버 (" + player_s2 + ")\n" + random_num(single_2, num_s2));
		}
		else if(single_3) {
			single_3 = false;
			player_s3 = sender;
			replier.reply(player_s3 + "님의 베스킨라빈스31 싱글 게임이 3번 서버에서 시작되었습니다.\n저부터 시작할께요.");
			return replier.reply("싱글 3번 서버 (" + player_s3 + ")\n" + random_num(single_3, num_s3));
		}
		else return replier.reply("현재 모든 싱글서버가 사용 중입니다.\n나중에 다시 시도해주세요.");
	}
	else if(msg === "!베라31 싱글") return replier.reply("이미 게임을 플레이 중이에요.")

	//싱글서버 1번
	if(sender === player_s1 && parseInt(msg) === num_s1 + 1) {
		if(msg === number_checker(num_s1, 1) || msg === number_checker(num_s1, 2) || msg === number_checker(num_s1, 3)) {
			latest_num(single_1, msg)
	
			if(win1(msg)) {
				replier.reply("싱글 1번 서버 (" + player_s1 + ")\n" + win2(msg));
			}
			else if(msg.indexOf("30") != -1) {
				replier.reply("싱글 1번 서버 (" + player_s1 + ")\n31");
				replier.reply("싱글 1번 서버 (" + player_s1 + ")\n이런! 제 패배네요. 수고하셨습니다, " + player_s1 + "님.");
				reset(single_1);
			}
			else if(msg === "31") {
				replier.reply("싱글 1번 서버 (" + player_s1 + ")\n제가 이겼네요!\n수고하셨습니다, " + player_s1 + "님.");
				reset(single_1);
			}
			else replier.reply("싱글 1번 서버 (" + player_s1 + ")\n" + random_num(single_1, num_s1));
		}
		else replier.reply("싱글 1번 서버 (" + player_s1 + ")\n잘못된 입력 방법 혹은 게임 방식입니다.");
	}

	else if(sender === player_s1 && msg === "!베라31 종료") {
		replier.reply(player_s1 + "님의 게임이 종료되었습니다.");
		reset(single_1);
	}


	//싱글서버 2번
	if(sender === player_s2 && parseInt(msg) === num_s2 + 1) {
		if(msg === number_checker(num_s2, 1) || msg === number_checker(num_s2, 2) || msg === number_checker(num_s2, 3)) {
			latest_num(single_2, msg)
			
			if(win1(msg)) {
				replier.reply("싱글 2번 서버 (" + player_s2 + ")\n" + win2(msg));
			}
			else if(msg.indexOf("30") != -1) {
				replier.reply("싱글 2번 서버 (" + player_s2 + ")\n31");
				replier.reply("싱글 2번 서버 (" + player_s2 + ")\n이런! 제 패배네요. 수고하셨습니다, " + player_s2 + "님.");
				reset(single_2);
			}
			else if(msg === "31") {
				replier.reply("싱글 2번 서버 (" + player_s2 + ")\n제가 이겼네요!\n수고하셨습니다, " + player_s2 + "님.");
				reset(single_2);
			}
			else replier.reply("싱글 2번 서버 (" + player_s2 + ")\n" + random_num(single_2, num_s2));
		}
		else replier.reply("싱글 2번 서버 (" + player_s2 + ")\n잘못된 입력 방법 혹은 게임 방식입니다.");
	}

	else if(sender === player_s2 && msg === "!베라31 종료") {
		replier.reply(player_s2 + "님의 게임이 종료되었습니다.");
		reset(single_2);
	}


	//싱글서버 3번
	if(sender === player_s3 && parseInt(msg) === num_s3 + 1) {
		if(msg === number_checker(num_s3, 1) || msg === number_checker(num_s3, 2) || msg === number_checker(num_s3, 3)) {
			latest_num(single_3, msg)
		
			if(win1(msg)) {
				replier.reply("싱글 3번 서버 (" + player_s3 + ")\n" + win2(msg));
			}
			else if(msg.indexOf("30") != -1) {
				replier.reply("싱글 3번 서버 (" + player_s3 + ")\n31");
				replier.reply("싱글 3번 서버 (" + player_s3 + ")\n이런! 제 패배네요. 수고하셨습니다, " + player_s3 + "님.");
				reset(single_3);
			}
			else if(msg === "31") {
				replier.reply("싱글 3번 서버 (" + player_s3 + ")\n제가 이겼네요!\n수고하셨습니다, " + player_s3 + "님.");
				reset(single_3);
			}
			else replier.reply("싱글 3번 서버 (" + player_s3 + ")\n" + random_num(single_3, num_s3));
		}
		else replier.reply("싱글 3번 서버 (" + player_s3 + ")\n잘못된 입력 방법 혹은 게임 방식입니다.");
	}

	else if(sender === player_s3 && msg === "!베라31 종료") {
		replier.reply(player_s3 + "님의 게임이 종료되었습니다.");
		reset(single_3);
	}
}
}


//상대가 낸 가장 최근 숫자를 찾아주는 식
function latest_num(server, message) {
	let num = 0;

	if(parseInt(message) == message) {
		num = parseInt(message);
	}
	else num = parseInt(message.split(" ")[message.split(" ").length - 1]);


	if(server === single_1) {
		return num_s1 = num;
	}
	else if(server === single_2) {
		return num_s2 = num;
	}
	else if(server === single_3) {
		return num_s3 = num;
	}
}

//랜덤한 갯수의 숫자를 뱉는 것
function random_num(server, last_number) {
	let count = Math.floor(Math.random() * 3);
	let adding = "";
	let print = "";
	for(i = 0; i <= count; i++) {
		adding = last_number + i + 1;
		print += adding + " ";
	}

	if(server === single_1) {
		num_s1 = last_number + count + 1;
	}
	else if(server === single_2) {
		num_s2 = last_number + count + 1;
	}
	else if(server === single_3){
		num_s3 = last_number + count + 1;
	}

	return print.slice(0, -1);
}

//상대가 낼 수 있는 조합을 보여줌
function number_checker(my_last_number, opponent_count) {
	let last = "";
	for(i = 0; i < opponent_count; i++) {
		last += my_last_number + i + 1 + " ";
	}
	return last.slice(0, -1);
}

//이길 수 있을 때 마지막 1턴, 고정응답
function win1(message) {
	if(message.indexOf("27") != -1 && message.indexOf("28") == -1) return true;
	else if(message.indexOf("28") != -1 && message.indexOf("29") == -1) return true;
	else if(message.indexOf("29") != -1 && message.indexOf("30") == -1) return true;
	else return false;
}

//이길 수 있을 때 마지막 1턴, 고정응답
function win2(message) {
	if(message.indexOf("27") != -1 && message.indexOf("28") == -1) return "28 29 30";
	else if(message.indexOf("28") != -1 && message.indexOf("29") == -1) return "29 30";
	else if(message.indexOf("29") != -1 && message.indexOf("30") == -1) return "30";
}

//서버 초기화
function reset(server) {
	if(server === single_1) {
		single_1 = true;
		player_s1 = "";
		num_s1 = 0;
	}
	else if(server === single_2) {
		single_2 = true;
		player_s2 = "";
		num_s2 = 0;
	}
	else if(server === single_3) {
		single_3 = true;
		player_s3 = "";
		num_s3 = 0;
	}
}

//서버 가용 여부
function playable(server) {
	if(server) return "플레이 가능";
	else return "이미 사용중";
}
