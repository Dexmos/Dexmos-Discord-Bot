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
    if (strWithoutCaps.includes("pog")) {
        receivedMessage.react(emoteID.POG);
    }
    if (strWithoutCaps.includes("kappa") || strWithoutCaps.includes("fuck")) {
        receivedMessage.react(emoteID.Kappa);
    }
    if (strWithoutCaps.includes("allan")) {
        receivedMessage.react(emoteID.AllanTheBoss);
    }
    if (strWithoutCaps.includes("yan")) {
        receivedMessage.react(emoteID.Yantriggered);
    }
    if (strWithoutCaps.includes("ayaya")) {
        receivedMessage.react(emoteID.AYAYA);
    }
    if (strWithoutCaps.includes("wtf") || strWithoutCaps.includes("erh")) {
        receivedMessage.react(emoteID.WutFace);
    }
    return;
}