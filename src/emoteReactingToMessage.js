const emoteID = require("./utils/emoteID.json");

module.exports = {
    checkMessageToReact: function(receivedMessage) {
        return checkMessageToReact(receivedMessage);
    }
};

function checkMessageToReact(receivedMessage) 
{
    let strWithoutCaps = receivedMessage.content.toLowerCase();

    if (strWithoutCaps.includes("lul")) {
        receivedMessage.react(emoteID.LUL);
    }
    if (strWithoutCaps.includes("kappa")) {
        receivedMessage.react(emoteID.Kappa);
    }
    if (strWithoutCaps.includes("ayaya")) {
        receivedMessage.react(emoteID.AYAYA);
    }
    return;
}