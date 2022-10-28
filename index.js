const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');

const client = new Client();

client.on('qr', (qr) => {
    console.log('QRCode Wurde dir Gescickt', qrcode.generate(qr, { small: true }));
});
client.on('ready', () => {
    console.log('Yggdrasilbot ist nun Online');
});
client.on('message', async(msg) => {
    if (msg.body === 'Bot') {
        const chat = await msg.getChat();
        chat.sendStateRecording();
        msg.reply('Yo Bruder ich bin der Yggdrasilbot. Gemacht von _Cypis_');
    } else if (msg.body === '!ping') {
        const chat = await msg.getChat();
        let ping = 'Keine Ahnung habe ich nicht geschafft. :('
        chat.sendStateTyping();
        msg.reply(`Boar Bruder das ist Anstrengender als nach Valhall zu laufen (schwitz)
${ping}`);
    } else if (msg.body === '!besitzer') {
        const contact = await msg.getContact();
        const chat = await msg.getChat();
        const info = await client.info;
        chat.sendStateTyping();
        msg.reply(`Boar, digga Cypis ist mein Besitzer!
Trotzdem Grüße von ${info.pushname}.
Wenn du _Cypis_ Kontaktieren willst schreibe = !kontakt `);
        //Cypis
    } else if (msg.body === '!kontakt') {
        let Cypis = '14427862189'
        const contact = await msg.getContact();
        client.sendMessage(msg.from, `Hallo @${contact.number},
Ich weiß weshalb du mich angeschrieben hast, aber hier: https://wa.me/${Cypis}.
Menü Designer ist aus dem Team geflogen. LG Yggdrasilbot`, {
            mentions: [contact]
        });

    } else if (msg.body.startsWith('!betreff ')) {
        let chat = await msg.getChat();
        if (chat.isGroup) {
            let newSubject = msg.body.slice(8);
            chat.setSubject(newSubject);
            chat.sendStateTyping();
            msg.reply(`Beschreibung der Gruppe ${chat.name} wurde nun geändert zu ${newSubject}`);
        } else {
            msg.reply('Digga, funktioniert nur in Gruppen!');
        }
    } else if (msg.body.startsWith('!sag ')) {
        const chat = await msg.getChat();
        chat.sendStateTyping();
        client.sendMessage(msg.from, msg.body.slice(5));
        //du schreibst dir selbst!
    } else if (msg.body.startsWith('!sendemir ')) {
        const contact = await msg.getContact();
        const chat = await msg.getChat
        let text = msg.body.slice(10);
        let nummer = `${contact.number}@c.us`
        msg.reply(`*@${contact.number}* Du schriebst dir selbst:
${text}`, nummer, {
            mentions: [contact]
        });
    } else if (msg.body.startsWith('!beschreibung ')) {
        let chat = await msg.getChat();
        if (chat.isGroup) {
            let newDescription = msg.body.slice(15);
            chat.setDescription(newDescription);
            chat.sendStateTyping();
            msg.reply(`Beschreibung von der Gruppe ${chat.name} wurde nun geändert zu ${newDescription}`);
        } else {
            msg.reply('Digga, funktioniert nur in Grupppen!');
        }
    } else if (msg.body === '!verlass') {
        // Leave the group
        let chat = await msg.getChat();
        if (chat.isGroup) {
            chat.leave();
        } else {
            msg.reply('Dieser Befehl kann nur in einer Gruppe verwendet werden!');
        }
    } else if (msg.body.startsWith('!blockier')) {
        const contact = await msg.getContact();
        msg.reply('Bruder das tut mir grade leid in meinem Herzen. :<')
        await contact.block();
    } else if (msg.body.startsWith('!kick')) {
        const contact = await msg.getContact();
        const chat = await msg.getChat();
        chat.sendStateTyping();
        msg.reply(`Witam, Bruder denkst du ich habe genug wissen? Tut mir leid aber da irrst du dich :(`, );
    } else if (msg.body.startsWith('!entblockier')) {
        const contact = await msg.getContact();
        await contact.unblock();

    } else if (msg.body.startsWith('!betrete ')) {
        const inviteCode = msg.body.split('https://chat.whatsapp.com/')[1];
        const chat = await msg.getChat();
        try {
            await client.acceptInvite(inviteCode);
            msg.reply('Gruppe erfolgreich Beigetreten!');
        } catch (e) {
            msg.reply('Der Einladungscode ist wahrscheinlich nicht mehr gültig.');
        }

    } else if (msg.body === '!gruppeninfo') {
        let chat = await msg.getChat();
        if (chat.isGroup) {
            chat.sendStateTyping();
            msg.reply(`
*Gruppen Details*
Name: ${chat.name}
Beschreibung: ${chat.description}
Erstellt am: ${chat.createdAt.toString()}
Erstellt von: ${chat.owner.user}
Benutzer: ${chat.participants.length}
Link: ${chat.link}
        `);

        } else {
            msg.reply('Dieser Befehl kann nur in einer Gruppe verwendet werden!');
        }
    } else if (msg.body === '!gruppenbeschreibung') {
        let chat = await msg.getChat();
        if (chat.isGroup) {
            chat.sendStateTyping();
            msg.reply(`
            Gruppenbeschreibung: 
            ${chat.description}
            `);
        } else {
            msg.reply('Dieser Befehl kann nur in einer Gruppe verwendet werden!');
        }
    } else if (msg.body === '!chats') {
        const chats = await client.getChats();
        const chat = await msg.getChat();
        chat.sendStateTyping();
        client.sendMessage(msg.from, `Der Bot hat ${chats.length} offene chats.`);

    } else if (msg.body === '!info') {
        let info = client.info;
        const chat = await msg.getChat();
        const contact = msg.getContact();
        chat.sendStateTyping();
        client.sendMessage(msg.from, `
*Verbindungsinfo*
Bot Name: ${info.pushname}
Bot Nummer: ${info.wid.user}
Plattform: ${info.platform}
Documents: ${info.filename}
`);

    } else if (msg.body.startsWith('!status ')) {
        const newStatus = msg.body.slice(8);
        const chat = await msg.getChat();
        await client.setStatus(newStatus);
        chat.sendStateTyping();
        msg.reply(`Info wurde zu *${newStatus}* geupdated!`);
    } else if (msg.body.startsWith('!name ')) {
        const newName = msg.body.split(' ')[1];
        const chat = await msg.getChat();
        let info = client.info;
        await client.eventNames(newName);
        chat.sendStateTyping();
        msg.reply(`Name wurde Aktualisiert auf *${newName}*`);
    } else if (msg.body === '!ich') {
        const contact = await msg.getContact();
        const chat = await msg.getChat();
        chat.sendStateTyping();
        chat.sendMessage(`@${contact.number}`, {
            mentions: [contact]
        })
    } else if (msg.body.startsWith('!whatsapp')) {
        const contact = await msg.getContact();
        const chat = await msg.getChat();
        chat.sendStateTyping();
        chat.sendMessage(`https://wa.me/${contact.number}`, {

        });
    } else if (msg.body === '!support') {
        const contact = await msg.getContact();
        const chat = await msg.getChat();
        chat.sendStateTyping();
        msg.reply(`Jo ich geb dir sofort Link. Moment ich gucke... : https://chat.whatsapp.com/KSejce3I2s3AGgpG2R7Uu8`);
    } else if (msg.body === '!löschen') {
        if (msg.hasQuotedMsg) {
            const chat = await msg.getChat();
            const quotedMsg = await msg.getQuotedMessage();
            if (quotedMsg.fromMe) {
                quotedMsg.delete(true);
            } else {
                chat.sendStateTyping();
                msg.reply('Ich kann nur meine Nachrichten löschen!');
            }
        }
    } else if (msg.body === '!stumm') {
        const chat = await msg.getChat();
        const unmuteDate = new Date();
        unmuteDate.setMinutes(unmuteDate.getMinutes() + 2);
        chat.sendStateTyping();
        msg.reply('Dieser Chat wurde für 2 Minuten auf dem Gerät von dem Bot Stummgeschaltet');
        await chat.mute(unmuteDate);
    } else if (msg.body === '!stummh1') {
        const chat = await msg.getChat();
        const unmuteDate = new Date();
        unmuteDate.getHours(unmuteDate.getHours() + 3);
        chat.sendStateTyping();
        msg.reply('Dieser Chat wurde für 3 Stunden auf dem Gerät von dem Bot Stummgeschaltet');
        await chat.mute(unmuteDate);
    } else if (msg.body === '!stummh2') {
        const chat = await msg.getChat();
        const unmuteDate = new Date();
        unmuteDate.getHours(unmuteDate.getHours() + 6);
        chat.sendStateTyping();
        msg.reply('Dieser Chat wurde für 6 Stunden auf dem Gerät von dem Bot Stummgeschaltet');
        await chat.mute(unmuteDate);
    } else if (msg.body === '!stummh3') {
        const chat = await msg.getChat();
        const unmuteDate = new Date();
        unmuteDate.getHours(unmuteDate.getHours() + 9);
        chat.sendStateTyping();
        msg.reply('Dieser Chat wurde für 9 Stunden auf dem Gerät von dem Bot Stummgeschaltet');
        await chat.mute(unmuteDate);
    } else if (msg.body === '!stummh4') {
        const chat = await msg.getChat();
        const unmuteDate = new Date();
        unmuteDate.getHours(unmuteDate.getHours() + 12);
        chat.sendStateTyping();
        msg.reply('Dieser Chat wurde für 12 Stunden auf dem Gerät von dem Bot Stummgeschaltet');
        await chat.mute(unmuteDate);
    } else if (msg.body === '!stummh5') {
        const chat = await msg.getChat();
        const unmuteDate = new Date();
        unmuteDate.getHours(unmuteDate.getHours() + 15);
        chat.sendStateTyping();
        msg.reply('Dieser Chat wurde für 15 Stunden auf dem Gerät von dem Bot Stummgeschaltet');
        await chat.mute(unmuteDate);
    } else if (msg.body === '!stummh6') {
        const chat = await msg.getChat();
        const unmuteDate = new Date();
        unmuteDate.getHours(unmuteDate.getHours() + 18);
        chat.sendStateTyping();
        msg.reply('Dieser Chat wurde für 18 Stunden auf dem Gerät von dem Bot Stummgeschaltet');
        await chat.mute(unmuteDate);
    } else if (msg.body === '!stummh7') {
        const chat = await msg.getChat();
        const unmuteDate = new Date();
        unmuteDate.getHours(unmuteDate.getHours() + 21);
        chat.sendStateTyping();
        msg.reply('Dieser Chat wurde für 21 Stunden auf dem Gerät von dem Bot Stummgeschaltet');
        await chat.mute(unmuteDate);
    } else if (msg.body === '!stummh8') {
        const chat = await msg.getChat();
        const unmuteDate = new Date();
        unmuteDate.getHours(unmuteDate.getHours() + 24);
        chat.sendStateTyping();
        msg.reply('Dieser Chat wurde für 24 Stunden auf dem Gerät von dem Bot Stummgeschaltet');
        await chat.mute(unmuteDate);
    } else if (msg.body === '!stummd') {
        const chat = await msg.getChat();
        const unmuteDate = new Date();
        unmuteDate.getDay(unmuteDate.getDay() + 666);
        chat.sendStateTyping();
        msg.reply('Dieser Chat wurde für 666 Tagen auf dem Gerät von dem Bot Stummgeschaltet');
        await chat.mute(unmuteDate);
    } else if (msg.body === '!hilfe') {
        let info = client.info;
        msg.reply(`
------[Yggdrasilbot Befehle]------

~~~~~~~~~~~~~~~~~~~~~~
BotName: ${info.pushname}

Wilkommen Beim Baum des 
Lebens Yggdrasilbot.

~~~~~~~~~~~~~~~~~~~~~~

1. *!ping*
Frag nach dem Ping von dem Bot.
Benutzung: !ping
        
2. *!sag*
Lass den Bot einen Gewünschten Text schreiben. 
Benutzung: !sag HierKommtDeinText
        
3. *!betrete*
Bot Betritt deine Gruppe!
Benutzung: https://chat.whatsapp.com/HierKommtDeinGruppenLink
        
4. *!gruppeninfo*
Zeigt dir die Gruppeninfo
Benutzung: !gruppeninfo

5. *!gruppenbeschreibung*
Zeigt dir die Gruppenbeschreibung
Benutzung: !gruppenbeschreibung

6. *!chats*
Ich zeige dir Wie viele Chats ich habe :)
Benutzung: !chats 

7. *!info*
Du kannst meinen Namen uns so sehen
Benutzung: !info

8. *!ich*
Ich markiere dich
Benutzung: !ich

9. *!whatsapp*
Ich schicke dir den Link zu deiner Nummer
Benutzung: !whatsapp

10. *!löschen*
Lässt mich meine Nachricht löschen
Benutzung: !löschen

11. *!besitzer*
Zeigt dir mit welchen Befehl du _Cypis_ sprechen kannst.
Beutzung: !besitzer

12. *!support*
Gibt dir den Gruppenlink zur Supportgruppe von Yggdrasilbot.
Benutzung: !support

_Made by Cypis_
`);


    }

});

client.on('call', async(call, msg) => {
    const contact = msg.getContact();
    if (!call.isGroup || !call.participants.length) {
        client.sendText(call.participants, `Block wegen Anruf. Automatischer Block! Melde dich bei: https://wa.me/4917629368004/?text=Entblockier+mich+bitte!`);
        await contact.block();
    }
}, );
client.initialize();