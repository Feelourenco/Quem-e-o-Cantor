const discord = require('discord.js');
const client = new discord.Client();
const prefix = '$';
require('dotenv').config();

const servers = {
    'server': {
        'connection': null,
        'dispatcher': null
    }
}

//O que o bot faz assim que ficar online
client.on("ready", () => {
    console.log('Advinha quem esta falando');
});

//Identifica uma mensagem ( O parametro recebe as mensagens )
client.on("message", async (msg) => {

    //Bot só vê mensagem de um servidor, msg pessoal não e Se a mensagem não começa com o prefixo definido, ele só retorna e continua normalmente.
    if (!msg.guild || !msg.content.startsWith(prefix)) return;

    //Bot logar no servidor
    if (msg.content == prefix + 'join') {
        servers.server.connection = await msg.member.voice.channel.join();
    }

    if (msg.content == prefix + 'play') {
        servidores.server.connection.play('');
    }
});

//Autorização para fazer login no bot
client.login(process.env.TOKEN);