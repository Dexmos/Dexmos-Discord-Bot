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
    if (strWithoutCaps.includes("zpr") || strWithoutCaps.includes("zephyr")) {
        receivedMessage.channel.send("FireSprit was the problem <:Kappa:" + emoteID.Kappa + ">");
        receivedMessage.react(emoteID.Kappa);
    }
    return;
}