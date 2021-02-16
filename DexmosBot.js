const Discord = require('discord.js');
const DexBot = new Discord.Client();
let LeagueAPI = require('leagueapiwrapper');
LeagueAPI = new LeagueAPI(process.env.RiotAPIKey, Region.EUW);
let schedule = require('node-schedule');

// _______________________ MY_SRC _______________________

const riotElo = require("./src/LeagueOfLegends/leagueOfLegendsEloCommand.js");

const help = require("./src/helpCommand.js");
const reactToMessage = require("./src/emoteReactingToMessage.js");
const soundBox = require("./src/soundBox.js");
const meme = require("./src/memeCommand.js");

//const emoteID = require("./src/utils/emoteID.json"); // All ID are from our discord server. Use \:[name]: in discord chat to get your emote ID

let canSpeak = false;
let connection;

DexBot.on('ready', () => {
/*    // List servers the bot is connected to
    console.log("Servers:");
    DexBot.guilds.cache.forEach((guild) => {
        console.log(" - " + guild.name);

        // List all channels
        guild.channels.cache.forEach((channel) => {
            console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`);
        });
    });*/
    console.log("DexmosBot is ready!")
});


DexBot.on('message', async (receivedMessage) => {
    // Prevent bot from responding to its own messages
    if (receivedMessage.author == DexBot.user) {
        return;
    }

    if (receivedMessage.content.startsWith("!d")) {
        console.log("I received command = " + receivedMessage);
        processCommand(receivedMessage);
        return;
    }

    if (receivedMessage.mentions.has(DexBot.user.id)) {
        receivedMessage.channel.send("Woof ! 🐺");
        return;
    }

    reactToMessage.checkMessageToReact(receivedMessage);
});

async function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1); // Remove the "!d" from command
    let splitCommand = fullCommand.split(" "); // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0]; // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1); // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand);
    console.log("Arguments: " + arguments);

    // @TODO : Change the [if/else if] forest
    if (primaryCommand === "dhelp") {
        help.helpCommand(arguments, receivedMessage);
        return;
    } 
    else if (primaryCommand === "delo") {
        riotElo.riotEloCommands(receivedMessage.channel, receivedMessage.author.username.toString(), arguments.join(" "), LeagueAPI);
        return;
    }
    else if (primaryCommand === "dmeme") {
        meme.DisplayMeme(receivedMessage, arguments[0]);
        return;
    }
    else if (primaryCommand === 'djoin') {
        // Only try to join the sender's voice channel if they are in one themselves
        if (receivedMessage.member.voice.channel) {
          connection = await receivedMessage.member.voice.channel.join();
          canSpeak = true;
        } else {
          receivedMessage.reply('You need to join a voice channel first!');
        }
        return;
    }
    else if (primaryCommand === "dleave") {
        const disconnection = await receivedMessage.member.voice.channel.leave();
        canSpeak = false;
        return;
    }
    if (canSpeak) {
        soundBox.soundbox(primaryCommand, connection);
        return;
    }
    else {
        receivedMessage.channel.send("I don't understand the command. Try `!dhelp` for the command list");
        return;
    }
}

DexBot.login(process.env.token);


// Schedule Reminders

let ruleEloIchizaemon = new schedule.RecurrenceRule();
ruleEloIchizaemon.hour = 16; // + 2hours for UTC+2 (France)
ruleEloIchizaemon.minute = 00;

/*let scheduleEloIchizeamon = schedule.scheduleJob(ruleEloIchizaemon, function() {
    riotElo.reminderElo("Ichizaemon", DexBot, LeagueAPI);
});*/