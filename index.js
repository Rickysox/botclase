//Dependencias
const Discord = require("discord.js");
const config = require("./config.json");
const fetch = require("node-fetch");
const preguntas = require("./preguntas.json");


//Para poder mandar imagenes
const { MessageAttachment } = require("discord.js");
const { MessageEmbed } = require('discord.js');


//Creamos un Discord.Client nuevo, y le damos la opcion de recibir mensajes del servidor
const client = new Discord.Client({
    intents: ['GUILD_VOICE_STATES', 'GUILD_MESSAGES', 'GUILDS', 'GUILD_MESSAGE_REACTIONS']
});

//Prefijo para el bot
const prefix = "!";

const imagenes = ["https://www.geekmi.news/__export/1644190196029/sites/debate/img/2022/02/06/zenitsu4.jpg_976912859.jpg","https://esports.as.com/2019/08/22/league-of-legends/tacticas-maestras--tft/Aatrox-Buff_1275182479_245676_1440x810.jpg", "https://areajugones.sport.es/wp-content/uploads/2021/05/imagen-2021-05-22-135309.jpg"]


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

      const i = Math.floor(Math.random() * 3);

      const array = preguntas.preguntas[i].respuestas;

      let shuffled = array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)

        //fetch prueba
        //const response = await fetch("https://opentdb.com/api.php?amount=1&type=multiple");
        //const data = await response.json();
        const nombre = preguntas.preguntas[i].pregunta;
        const respuestaCorrecta = preguntas.preguntas[i].respuestaCorrecta;
        const respuesta1 = shuffled[0];
        const respuesta2 = shuffled[1];
        const respuesta3 = shuffled[2];
        const respuesta4 = shuffled[3];
        console.log(preguntas.preguntas)
        //console.log(nombre)
        //console.log(data)
        //console.log(data.results[0].incorrect_answers)

        const exampleEmbed = new MessageEmbed()
                .setColor('#0099ff') 
                .addFields(
                    { name: "Pregunta", value: `${nombre}` },
                    { name: '\u200B', value: '\u200B' },
                    { name: ' Respuesta 1??????', value: `${respuesta1}`, inline: true },
                    { name: 'Respuesta 2??????', value: `${respuesta2}`, inline: true },
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Respuesta 3??????', value: `${respuesta3}`, inline: true },
                    { name: 'Respuesta 4??????', value: `${respuesta4}`, inline: true },
                )
                //.addField('Inline field title', 'Some value here', true)
                .setImage(imagenes[Math.floor(Math.random() * imagenes.length)])

                const sentEmbed = await message.channel.send({ embeds: [exampleEmbed] });
                sentEmbed.react('1??????');
                sentEmbed.react('2??????');
                sentEmbed.react('3??????');
                sentEmbed.react('4??????');


            const filter = (reaction, user) => {
             return (reaction.emoji.name === '1??????' || reaction.emoji.name === '2??????'  || reaction.emoji.name === '3??????'  || reaction.emoji.name === '4??????') && user.id === message.author.id && !user.bot;
        };
        const collector = sentEmbed.createReactionCollector({filter, max: 4,  time: 7000 });
        collector.on('collect', (reaction, user) => {

            message.channel.send(`Collected ${reaction.emoji.name} from ${user.tag}`);
            const usuario = `${user.tag}`;
            message.channel.send(usuario)

            switch(reaction.emoji.name){
                
                case '1??????':
                    if(respuesta1 === respuestaCorrecta)
                        message.channel.send("Bien 1")
                    else{
                        message.channel.send("Mal")
                    }
                    break;
                case '2??????':
                    if(respuesta2 === respuestaCorrecta)
                        message.channel.send("Bien 2")
                    else{
                        message.channel.send("Mal")
                    }
                    break;
                case '3??????':
                    if(respuesta3 === respuestaCorrecta)
                        message.channel.send("Bien 3")
                    else{
                        message.channel.send("Mal")
                    }
                    break;
                case '4??????':
                    if(respuesta4 === respuestaCorrecta)
                        message.channel.send("Bien 4")
                    else{
                        message.channel.send("Mal")
                    }
                    break;
            }

        });

        collector.on('end', collected => {
            message.channel.send(`Collected ${collected.size} items`);
        });

        //Aqui a partir de la fecha actual y cuando se creo el mensaje, calculamos lo que tarda en mandar el bot su mensaje en milisegundos
        const timeTaken = Date.now() - message.createdTimestamp;
        
        //Con el metodo reply, responde al usuario que haya escrito el comando
        message.channel.send(`Pong! This message had a latency of ${timeTaken}ms.`);

    }  

});

client.login(config.BOT_TOKEN);