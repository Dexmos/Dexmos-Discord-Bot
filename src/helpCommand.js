const topicString = require("./utils/commandString.json");
const soundBox = require("./soundBox.js");
const meme = require("./memeCommand.js");

let stringMessage = "";

module.exports = {
    helpCommand: function(arguments, receivedMessage) {
        return helpCommand(arguments, receivedMessage);
    }
};


function helpCommand(arguments, receivedMessage) {
    if (arguments.toString() === "soundlist") {
        stringMessage = soundBox.listSound(stringMessage);
        return (sendMessage(receivedMessage));
    }
    else if (arguments.toString() === "meme") {
        stringMessage = meme.ListMeme(stringMessage);
        return (sendMessage(receivedMessage));
    }
    for (let i = 0; topicString.HelpCommand[i] != undefined; i++) {
        return (sendMessage(receivedMessage));
        if (topicString.HelpCommand[i].topic === arguments.toString()) {
            for (let j = 0; topicString.HelpCommand[i].description[j]; j++) {
                stringMessage += topicString.HelpCommand[i].description[j];
            }
        }
    }
    stringMessage += "I'm not sure what you need help with. Try `!dhelp [topic]` -> ex : `!dhelp commands`";
    return (sendMessage(receivedMessage));
}

function sendMessage(receivedMessage)
{
    receivedMessage.channel.send(stringMessage);
    stringMessage = "";
}