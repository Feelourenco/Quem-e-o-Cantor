const discord = require('discord.js');
const { filterFormats } = require('ytdl-core');
const client = new discord.Client();
const ytdl = require('ytdl-core');
const prefix = '$';
require('dotenv').config();


const servers = {
    'server': {
        'connection': null,
        'dispatcher': null
    }
}


client.on("ready", () => {
    console.log('Advinha quem esta falando');
});

//Identifica uma mensagem
client.on("message", async (msg) => {

    //Bot só vê mensagem de um servidor, msg pessoal não | Se a mensagem não começa com o prefixo definido, ele só retorna e continua normalmente.
    if (!msg.guild || !msg.content.startsWith(prefix)) return;

    //Verifica se está em um canal de voz.
    if (!msg.member.voice.channel) {
        msg.channel.send('Você precis estar conectado no canal de voz !');
        return;
    }

    //Tocar a música
    if (msg.content.startsWith(prefix + 'play')) {
        let linkMusic = msg.content.slice(6);
        if(ytdl.validateURL(linkMusic)){
            servers.server.dispatcher = servers.server.connection.play(ytdl(linkMusic, {filter: 'audioonly'}));
        }
        else {
            msg.channel.send('Deve-se colocar um link válido do Youtube !');
        }
    }

    // Comandos
    switch(msg.content){
        case prefix + 'join': //Iniciar Bot
            try {
                servers.server.connection = await msg.member.voice.channel.join();
            } catch (error){
                console.log('Erro ao entrar em um canal de voz !');
                console.log(error);
            }
        break;
        case prefix + 'leave': //Tirar o bot da sala
            msg.member.voice.channel.leave();
            servers.server.connection = null;
            servers.server.dispatcher = null;
        break;
        case prefix + 'pause': //Pausar a Música
            servers.server.dispatcher.pause();  
        break;
        case prefix + 'resume': //Voltar a tocar a Música
            servers.server.dispatcher.resume();  
        break;
        default:
            return;
    }

});

//Autorização para fazer login no bot
client.login(process.env.TOKEN);