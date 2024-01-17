const { Events } = require('discord.js');

// 서버 켜진 후 작동하는 명령어
module.exports={
    name: Events.ClientReady, // 서버 시작 후 이벤트 발생
    once: true, // 단 한번만 작동하도록
    execute(client){
        console.log(`준비완료, ${client.user.tag}으로 로그인됨`)
    }
};