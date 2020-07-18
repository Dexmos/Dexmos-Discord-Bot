const linkImages = require("./utils/linkImages.json");

module.exports = {
    DisplayMeme: function(receivedMessage, argument) {
        return displayMeme(receivedMessage, argument);
    },
    ListMeme: function(stringMessage) {
        return listMeme(stringMessage);
    }
};

function displayMeme(receivedMessage, argument) {    
    for (let i = 0; linkImages.MemeCommands[i] != undefined; i++) {
        if (argument.toLowerCase() === linkImages.MemeCommands[i].argument.toLowerCase()) {
            receivedMessage.channel.send("", {files: [linkImages.MemeCommands[i].path]}).catch(console.error);
            return;
        }
    }
}

function listMeme(stringMessage) {
    for (let i = 0; linkImages.MemeCommands[i] != undefined; i++) {
        stringMessage += "`" + linkImages.MemeCommands[i].argument + "` : " + linkImages.MemeCommands[i].description + "\n";
    }
    return (stringMessage);
}