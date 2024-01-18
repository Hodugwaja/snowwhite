const { Events } = require('discord.js');


module.exports = {
    name: Events.InteractionCreate, // 사용자가 입력하는 이벤트
    async execute(interaction){

        // 이벤트에 관련된 서버정보, 유저정보 등을 가져옴
        // console.log(interaction);
        
        // 명령어로 입력한게 아니라면 받아치기
        if(!interaction.isChatInputCommand()) return;

        //명령어 찾기
        const command = interaction.client.commands.get(interaction.commandName);

        if(!command){
            console.error(`매칭되는 명령(${interaction.commandName}) 이 존재하지 않습니다.`);
        }

        try{
            await command.execute(interaction);
            // 명령어 실행
        }catch(error){
            console.error(error);
            if(interaction.replied || interaction.deffered){
                await interaction.followUp({content : '커멘드를 작동하는데 오류가 났습니다.', ephemeral: true});
            }else{
                await interaction.reply({content : '커멘드를 작동하는데 오류가 났습니다.', ephemeral: true});
            }
        }
    }
}