require("./index.js");
const { generateWAMessage, areJidsSameUser, proto } = require("@adiwajshing/baileys")
const { Simple, Collection, Function } = require("./lib")
const { isUrl, isNumber } = Function
const Func = require("./lib")
const fs = require("fs")
const moment = require("moment-timezone")
const chalk = require("chalk")
const { color } = require('./lib/color')
//const { correct } = require("./lib/Correct")
const { QuickDB } = require("quick.db");
const { Console } = require("console");
const cool=new Collection()

const prefix = global.prefa;

//global.db = new QuickDB();
global.Levels = require('discord-xp')
Levels.setURL("mongodb+srv://fantox001:zjmbvgwr52@cluster0.qh05pl9.mongodb.net/?retryWrites=true&w=majority")

console.log(color('\nDatabase has been connected Successfully !', 'aqua'));

//const CurrencySystem = require("currency-system");
//global.cs = new CurrencySystem;

module.exports = async (Miku, m, commands, chatUpdate) => {
    try {
        let { type, isGroup, sender, from } = m
        let body = (type == "buttonsResponseMessage") ? m.message[type].selectedButtonId : (type == "listResponseMessage") ? m.message[type].singleSelectReply.selectedRowId : (type == "templateButtonReplyMessage") ? m.message[type].selectedId : m.text
        
        
        let prat =
            type === "conversation" && body?.startsWith(prefix)
                ? body : (type === "imageMessage" || type === "videoMessage") && body && body?.startsWith(prefix)
                    ? body : type === "extendedTextMessage" && body?.startsWith(prefix)
                        ? body : type === "buttonsResponseMessage" && body?.startsWith(prefix)
                            ? body : type === "listResponseMessage" && body?.startsWith(prefix)
                                ? body : type === "templateButtonReplyMessage" && body?.startsWith(prefix) ? body : '';
        

        const metadata = isGroup ? await Miku.groupMetadata(from) : {}
        const pushname = m.pushName //|| 'NO name'
        const participants = isGroup ? metadata.participants : [sender]
        const groupAdmin = isGroup ? participants.filter(v => v.admin !== null).map(v => v.id) : []
        const isBotAdmin = isGroup ? groupAdmin.includes(Miku.user?.jid) : false
        const isAdmin = isGroup ? groupAdmin.includes(sender) : false
     //   const isOwner = [Miku.user?.jid, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(sender)
        //const isCreator = [botNumber, ...global.Owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)

        //////////Database\\\\\\\\\\\\\\\\

      /*  const _mods = await db.get('mods')
        const mods = _mods || []
        const _ban= await db.get("ban")
        global.ban=_ban|| []
        const _nsfw=await db.get("nsfw")
        global.nsfw=_nsfw||[]
        let wel= await db.get("events")
        global.wlc = wel || []*/

        const isCmd = body.startsWith(prefix)
        const quoted = m.quoted ? m.quoted : m
        const mime = (quoted.msg || m.msg).mimetype || " "
        const isMedia = /image|video|sticker|audio/.test(mime)
        const budy = (typeof m.text == "string" ? m.text : "")
        const args = body.trim().split(/ +/).slice(1)
        const ar = args.map((v) => v.toLowerCase())
        let text = q = args.join(' ')

        const cmdName = prat.slice(prefix.length).trim().split(/ +/).shift().toLowerCase();

        const cmd = commands.get(cmdName) || Array.from(commands.values()).find((v) => v.alias.find((x) => x.toLowerCase() == cmdName)) || ""
        const icmd = commands.get(cmdName) || Array.from(commands.values()).find((v) => v.alias.find((x) => x.toLowerCase() == cmdName))
        const mentionByTag = type == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.mentionedJid : []
        if (body.startsWith(prefix) && !icmd) return Miku.sendMessage(m.from, { text: "Baka no such command" })


        const flags= args.filter((arg) => arg.startsWith('--'))
       if(body.startsWith(prefix)&&!icmd) {
        var Mikupic = `https://wallpapercave.com/wp/wp10524580.jpg`;
        let mikutext =`No such command programmed *${pushname}* senpai! Type *${prefix}help* to get my full command list!` 
        Miku.sendMessage(m.from,{
            image:{url:Mikupic}, 
            caption:mikutext},
            {quoted:m}
            )
    }
       
        if (m.message) {
          //  addBalance(m.sender, randomNomor(574), balance)
            console.log(chalk.black(chalk.bgWhite('[ MESSAGE ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + chalk.magenta('=> From'), chalk.green(pushname), chalk.yellow(m.sender) + '\n' + chalk.blueBright('=> In'), chalk.green(m.isGroup ? pushname : 'Private Chat', m.chat))
                    }
        


        if (cmd) {
            const randomXp = Math.floor(Math.random() * 3) + 1;//Random amont of XP until the number you want + 1
            const haslUp = await Levels.appendXp(m.sender, "bot", randomXp);
        }
        if (text.endsWith("--info") || text.endsWith("--i") || text.endsWith("--?")) {
            let data = []
            if (cmd.alias) data.push(`*Alias :* ${cmd.alias.join(", ")}`)

            if (cmd.desc) data.push(`*Description :* ${cmd.desc}\n`)
            if (cmd.usage) data.push(`*Example :* ${cmd.usage.replace(/%prefix/gi, prefix).replace(/%command/gi, cmd.name).replace(/%text/gi, text)}`)
            var buttonss = [
                { buttonId: `${prefix}help`, buttonText: { displayText: `help` }, type: 1 },]
            let buttonmess = {
                text: `*Command Info*\n\n${data.join("\n")}`,
                footer: "Miku-MD",
                buttons: buttonss,
                headerType: 1
            }
            return Miku.sendMessage(m.from, buttonmess, { quoted: m })
        }
        if (cmd.react) {
            const reactm = {
                react: {
                    text: cmd.react,
                    key: m.key
                }
            }
            await Miku.sendMessage(m.from, reactm)
        }
        if (!cool.has(m.sender)) {
            cool.set(m.sender, new Collection());
        }
        const now = Date.now();
        const timestamps = cool.get(m.sender);
        const cdAmount = (cmd.cool || 0) * 1000;
        if (timestamps.has(m.sender)) {
            const expiration = timestamps.get(m.sender) + cdAmount;

            if (now < expiration) {

                let timeLeft = (expiration - now) / 1000;
                //printSpam(isGroup, sender);
                return await Miku.sendMessage(m.from, { text: `You are on cooldown, please wait another _${timeLeft.toFixed(1)} second(s)_` }, { quoted: m })

            }
        }
        timestamps.set(m.sender, now);
        setTimeout(() => timestamps.delete(m.sender), cdAmount);

        cmd.start(Miku, m, {
            name: 'Miku',
            metadata,
            pushName: pushname,
            participants,
            body,
            args,
            ar,
            flags,
            isAdmin,
            groupAdmin,
            text,
            quoted,
            mentionByTag,
            mime,
            isBotAdmin,
            prefix,
            command: cmd.name,
            commands,
            Function: Func,
            toUpper: function toUpper(query) {
                return query.replace(/^\w/, c => c.toUpperCase())
            }
        })
    } catch (e) {
        e = String(e)
        if (!e.includes("cmd.start"))
            console.error(e);
    }
}
