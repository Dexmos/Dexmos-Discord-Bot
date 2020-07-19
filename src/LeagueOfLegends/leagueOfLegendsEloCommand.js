const Discord = require('discord.js'); // For embed message
let URLEncoder = require('urlencode');
const emoteID = require("../utils/emoteID.json");

module.exports = {
    riotEloCommands: function(channel, author, arguments, LeagueAPI, receivedMessage) {
        return riotEloCommands(channel, author, arguments, LeagueAPI, receivedMessage);
    },
    reminderElo: function(summonerName, DexBot, LeagueAPI) {
        return reminderElo(summonerName, DexBot, LeagueAPI);
    }
};

function reminderElo(summonerName, DexBot, LeagueAPI) {
    let chanTosend = DexBot.channels.cache.get(process.env.reminderChannelID);

    riotEloCommands(chanTosend, "DexmosBot", summonerName, LeagueAPI, null)
}

function riotEloCommands(channel, author, summonerName, LeagueAPI, receivedMessage)
{
    let embedMessage = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('League of Legends Elo command')
    .setDescription('Asked by ' +  author);

    embedMessage.addFields(
		{ name: 'Elo of ' + summonerName, value: 'Only in 5v5 games ranked type' },
		{ name: '\u200B', value: '\u200B' },
	);
    let encoded = URLEncoder.encode(summonerName, "utf-8");

    LeagueAPI.getSummonerByName(encoded)
        .then(function(accountInfo) {
            LeagueAPI.getLeagueRanking(accountInfo).then(function(accountInfo) {
                for (let i = 0; accountInfo[i] != undefined; i++) {
                    messageEloCommand(accountInfo[i].queueType, accountInfo[i].tier, accountInfo[i].rank, accountInfo[i].leaguePoints, accountInfo[i].wins, accountInfo[i].losses, embedMessage);
                    if (receivedMessage != null || receivedMessage != undefined) {
                        reactOnElo(accountInfo[i].tier, receivedMessage);
                    }
                }
                embedMessage.addField('\u200B', '\u200B');
                embedMessage.setTimestamp();
                channel.send(embedMessage).then(DexMsgSent => {
                    DexMsgSent.react(emoteID.LUL);
                }).catch(console.log);
            }).catch();                                                                  
            //LeagueAPI.getActiveGames(accountInfo).then(console.log).catch(console.log);                                                                    
        }).catch();
}

function messageEloCommand(qType, tier, rank, leaguePoints, wins, losses, embedMessage) {
    let queueType = checkQueueType(qType);
    let tierType = checkTier(tier);
    let rankleague = checkRank(tier, rank);
    let lp = checkLeaguePoints(leaguePoints);
    let ratio = checkRatio(wins, losses);

    embedMessage.addField(queueType, tierType + rankleague + lp + ratio, true);
}

function checkRatio(wins, losses) {
    let calcPercent = (wins/(wins + losses) * 100).toFixed(1);
    let string = "\n" + wins + "W/" + losses + "L" + "\nWin ratio: " + calcPercent + "%";
    
    return (string);
}

function checkLeaguePoints(leaguePoints) {
    return (leaguePoints + " LP");
}

function checkRank(tier, rank) {
    let string;

    if (tier === "MASTER" || tier === "GRANDMASTER" || tier === "CHALLENGER") {
        string = "with "
    }
    else {
        string = (rank + " with ");
    }
    return (string);
}

function checkTier(tier) {
    let string;

    switch (tier) {
        case "IRON":
            string = "Iron <:LeagueIron:" + emoteID.LeagueIron + "> ";
            break;
        case "BRONZE":
            string = "Bronze <:LeagueBronze:" + emoteID.LeagueBronze + "> ";
            break;
        case "SILVER":
            string = "Silver <:LeagueSilver:" + emoteID.LeagueSilver + "> ";
            break;
        case "GOLD":
            string = "Gold <:LeagueGold:" + emoteID.LeagueGold + "> ";
            break;
        case "PLATINUM":
            string = "Platinum <:LeaguePlatinum:" + emoteID.LeaguePlatinum + "> ";
            break;
        case "DIAMOND":
            string = "Diamond <:LeagueDiamond:" + emoteID.LeagueDiamond + "> ";
            break;
        case "MASTER":
            string = "Master <:LeagueMaster:" + emoteID.LeagueMaster + "> ";
            break;
        case "GRANDMASTER":
            string = "Grandmaster <:LeagueGrandmaster:" + emoteID.LeagueGrandmaster + "> ";
            break;
        case "CHALLENGER":
            string = "Challenger <:LeagueChallenger:" + emoteID.LeagueChallenger + "> ";
            break;
        default:
            break;
    }
    return (string);
}

function checkQueueType(type) {
    let string;

    switch (type) {
        case "RANKED_FLEX_SR":
            string = "Flex : ";
            break;
        case "RANKED_SOLO_5x5":
            string = "Solo/duo : ";
            break;
        default:
            break;
    }
    return (string);
}

function reactOnElo(tier, receivedMessage) {
    switch (tier) {
        case "IRON":
            receivedMessage.react(emoteID.LeagueIron);
            break;
        case "BRONZE":
            receivedMessage.react(emoteID.LeagueBronze);
            break;
        case "SILVER":
            receivedMessage.react(emoteID.LeagueSilver);
            break;
        case "GOLD":
            receivedMessage.react(emoteID.LeagueGold);
            break;
        case "PLATINUM":
            receivedMessage.react(emoteID.LeaguePlatinum);
            break;
        case "DIAMOND":
            receivedMessage.react(emoteID.LeagueDiamond);
            break;
        case "MASTER":
            receivedMessage.react(emoteID.LeagueMaster);
            break;
        case "GRANDMASTER":
            receivedMessage.react(emoteID.LeagueGrandmaster);
            break;
        case "CHALLENGER":
            receivedMessage.react(emoteID.LeagueChallenger);
            break;
        default:
            break;
    }
}