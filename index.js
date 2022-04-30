//Dependencias
const Discord = require("discord.js");
const config = require("./config.json");

//Para poder mandar imagenes
const { MessageAttachment } = require("discord.js");

//Creamos un Discord.Client nuevo, y le damos la opcion de recibir mensajes del servidor
const client = new Discord.Client({
    intents: ['GUILD_VOICE_STATES', 'GUILD_MESSAGES', 'GUILDS', 'GUILD_MESSAGE_REACTIONS']
});

//Prefijo para el bot
const prefix = "!";



//El metodo .on, hace que discord nos envie una notificacion sobre los eventos nuevos, recibe 2 parametros
//el nombre del evento, y la funcion a realizar cuando pasa dicho evento
client.on("messageCreate", async function(message) { 

    //Aqui comprueba si el mensaje es de un bot o no, si es de un bot, para el processo
    if (message.author.bot) return;

    //Aqui comprueba si el principio del mensaje empieza con el prefijo que has definido antes (!), si no para el processo
    if (!message.content.startsWith(prefix)) return;

    //Aqui elimina el prefijo y lo mete en la constante commandBody, usando slice, esto es porque no nos interesa meter el prefijo en lo que parseamos
    const commandBody = message.content.slice(prefix.length);

    //Aqui a partir de la constante commandBody, separa el string en substrings en una array , con un espacio como separacion
    const args = commandBody.split(' ');

    //Aqui con shift, borramos el primer elemento de la array anterior, ya que es el nombre del comando, y nosotros solo queremos el argumento
    //despues con toLowerCase, lo pasamos a minusculas, ya que los comandos de los bots no son sensible a las caps
    const command = args.shift().toLowerCase();

    //Comprobamos si la constante command coincide con el valor ping, si coincide procede a ejecutar el codigo.
    if (command === "ping") {

        /*const num = Math.floor(Math.random() * 3) + 1;

        switch(num){
            case 1:
                const attachment = new MessageAttachment('https://cdn.mcr.ea.com/3/images/ac394369-2801-4e09-87eb-82ca54e26254/1588018258-0x0-0-0.jpg'); 
                const sentMessage = await message.channel.send({files: [attachment] })
                await sentMessage.react('🤔');
                await sentMessage.react('😃');
                break;
            case 2:
                const attachment2 = new MessageAttachment('https://i.ytimg.com/vi/Y05wiQQbFLU/maxresdefault.jpg'); 
                const sentMessage2 = await message.channel.send({files: [attachment2] })
                await sentMessage2.react('🤔');
                await sentMessage2.react('😃');
                break;
            case 3:
                const attachment3 = new MessageAttachment('https://i.3djuegos.com/juegos/2703/mirror_s_edge/fotos/set/mirror_s_edge-584992.jpg'); 
                const sentMessage3 = await message.channel.send({files: [attachment3] })
                await sentMessage3.react('🤔');
                await sentMessage3.react('😃');
                break;
            default:
                message.channel.send("Uhh")
        }*/

        //Imagen
        const attachment = new MessageAttachment('https://cdn.mcr.ea.com/3/images/ac394369-2801-4e09-87eb-82ca54e26254/1588018258-0x0-0-0.jpg'); 
        const sentMessage = await message.channel.send({files: [attachment] })
        sentMessage.react('👍');
        //sentMessage.react('👎');
        const filter = (reaction, user) => {
             return reaction.emoji.name === '👍' && !user.bot;
        };
        const collector = sentMessage.createReactionCollector({filter, max: 2,  time: 15000 });
        collector.on('collect', (reaction, user) => {
            message.channel.send(`Collected ${reaction.emoji.name} from ${user.tag}`);
        });

        collector.on('end', collected => {
            message.channel.send(`Collected ${collected.size} items`);
            console.log(`Collected ${collected.size} items`);
        });
        

        //Aqui a partir de la fecha actual y cuando se creo el mensaje, calculamos lo que tarda en mandar el bot su mensaje en milisegundos
        const timeTaken = Date.now() - message.createdTimestamp;
        
        //Con el metodo reply, responde al usuario que haya escrito el comando
        message.channel.send(`Pong! This message had a latency of ${timeTaken}ms.`);

    }  

    //Comprobamos si la constante command coincide con el valor sum, si coincide procede a ejecutar el codigo.
    else if (command === "sum") {

        //Aqui con map y parseFloat, creamos una nueva array de ints, usando los strings en la array de args
        const numArgs = args.map(x => parseFloat(x));

        //Aqui con reduce, counter siendo el valor anterior y x el valor actual, le decimos que el valor anterior sera, este mismo mas el valor actual
        const sum = numArgs.reduce((counter, x) => counter += x);

        //Con el metodo reply, responde al usuario que haya escrito el comando
        message.reply(`The sum of all the arguments you provided is ${sum}!`);
    }
});

client.login(config.BOT_TOKEN);