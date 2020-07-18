const json = require("./utils/linkSoundBox.json")

module.exports = {
    soundbox: function(primaryCommand, connection) {
        return soundbox(primaryCommand, connection);
    },
    listSound: function(stringMessage) {
        return listSound(stringMessage);
    }
};

function soundbox(primaryCommand, connection) {
    for (let i = 0; json.SoundCommands[i] != undefined; i++) {
        if (primaryCommand === json.SoundCommands[i].command) {
            const dispatcher = connection.play(json.SoundCommands[i].path, {volume: json.SoundCommands[i].volume});
            return;
        }
    }
}

function listSound(stringMessage) {
    for (let i = 0; json.SoundCommands[i] != undefined; i++) {
        stringMessage += "`" + json.SoundCommands[i].command + "` : " + json.SoundCommands[i].description + "\n";
    }
    return (stringMessage);
}