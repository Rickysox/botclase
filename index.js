//Dependencias
const Discord = require("discord.js");
const config = require("./config.json");
const fetch = require("node-fetch");


//Para poder mandar imagenes
const { MessageAttachment } = require("discord.js");
const { MessageEmbed } = require('discord.js');


//Creamos un Discord.Client nuevo, y le damos la opcion de recibir mensajes del servidor
const client = new Discord.Client({
    intents: ['GUILD_VOICE_STATES', 'GUILD_MESSAGES', 'GUILDS', 'GUILD_MESSAGE_REACTIONS']
});

//Prefijo para el bot
const prefix = "!";

const imagenes = ["https://www.geekmi.news/__export/1644190196029/sites/debate/img/2022/02/06/zenitsu4.jpg_976912859.jpg","https://ae01.alicdn.com/kf/H37b625344181443798198e6c5b21c87e6.jpg", "https://areajugones.sport.es/wp-content/uploads/2021/05/imagen-2021-05-22-135309.jpg"]


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

      

       /* //Imagen
        const attachment = new MessageAttachment(imagenes[Math.floor(Math.random() * imagenes.length)]); 
        const sentMessage = await message.channel.send({files: [attachment] })
        sentMessage.react('👍');
        sentMessage.react('👎');
        const filter = (reaction, user) => {
             return reaction.emoji.name === '👍' && !user.bot;
        };
        const collector = sentMessage.createReactionCollector({filter, max: 2,  time: 15000 });
        collector.on('collect', (reaction, user) => {
            message.channel.send(`Collected ${reaction.emoji.name} from ${user.tag}`);
        });

        collector.on('end', collected => {
            message.channel.send(`Collected ${collected.size} items`);
        });*/
        

        //fetch prueba
        const response = await fetch("https://opentdb.com/api.php?amount=1&type=multiple");
        const data = await response.json();
        const nombre = data.results[0].question;
        const respuesta1 = data.results[0].correct_answer;
        const respuesta2 = data.results[0].incorrect_answers[0];
        const respuesta3 = data.results[0].incorrect_answers[1];
        const respuesta4 = data.results[0].incorrect_answers[2];
        console.log(nombre)
        console.log(data)
        console.log(data.results[0].incorrect_answers)

        const exampleEmbed = new MessageEmbed()
                .setColor('#0099ff') 
                //.setThumbnail('https://estaticos-cdn.prensaiberica.es/clip/38ee5ece-3c7e-462f-a0a9-c0dea50a66ff_9-16-aspect-ratio_default_0.jpg')
                .addFields(
                    { name: "Pregunta", value: `${nombre}` },
                    { name: '\u200B', value: '\u200B' },
                    { name: ' Respuesta 1️⃣', value: `${respuesta1}`, inline: true },
                    { name: 'Respuesta 2️⃣', value: `${respuesta2}`, inline: true },
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Respuesta 3️⃣', value: `${respuesta3}`, inline: true },
                    { name: 'Respuesta 4️⃣', value: `${respuesta4}`, inline: true },
                )
                //.addField('Inline field title', 'Some value here', true)
                .setImage(imagenes[Math.floor(Math.random() * imagenes.length)])

                const sentEmbed = await message.channel.send({ embeds: [exampleEmbed] });
                sentEmbed.react('1️⃣');
                sentEmbed.react('2️⃣');
                sentEmbed.react('3️⃣');
                sentEmbed.react('4️⃣');


            const filter = (reaction, user) => {
             return reaction.emoji.name === '1️⃣' && user.id === message.author.id && !user.bot;
        };
        const collector = sentEmbed.createReactionCollector({filter, max: 2,  time: 15000 });
        collector.on('collect', (reaction, user) => {
            message.channel.send(`Collected ${reaction.emoji.name} from ${user.tag}`);
            const usuario = `${user.tag}`;
            message.channel.send(usuario)

        });

        collector.on('end', collected => {
            message.channel.send(`Collected ${collected.size} items`);
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