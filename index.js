//Dependencias
const Discord = require("discord.js");
const config = require("./config.json");
//Para poder mandar imagenes
const { MessageAttachment } = require("discord.js");

//Creamos un Discord.Client nuevo, y le damos la opcion de recibir mensajes del servidor
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});

//Prefijo para el bot
const prefix = "!";



//El metodo .on, hace que discord nos envie una notificacion sobre los eventos nuevos, recibe 2 parametros
//el nombre del evento, y la funcion a realizar cuando pasa dicho evento
client.on("messageCreate", function(message) { 

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

        //Aqui a partir de la fecha actual y cuando se creo el mensaje, calculamos lo que tarda en mandar el bot su mensaje en milisegundos
        const timeTaken = Date.now() - message.createdTimestamp;
        
        //Con el metodo reply, responde al usuario que haya escrito el comando
        message.channel.send(`Pong! This message had a latency of ${timeTaken}ms.`);
        //Emoji
        message.react('🤔');
        //Prueba imagen
        const attachment = new MessageAttachment('logo.png'); //ex. https://i.imgur.com/random.jpg
        message.channel.send({files: [attachment] })

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