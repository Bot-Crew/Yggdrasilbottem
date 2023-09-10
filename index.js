const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');

const client = new Client();

client.on('qr', (qr) => {
    console.log('QRCode został wysłany do Ciebie', qrcode.generate(qr, { small: true }));
});
client.on('ready', () => {
    console.log('Yggdrasilbot jest teraz online');
});
client.on('message', async (msg) => {
    if (msg.body === 'Bot') {
        const chat = await msg.getChat();
        chat.sendStateRecording();
        msg.reply('Cześć, jestem botem Yggdrasil. Stworzony przez _Cypis_.');
    } else if (msg.body === '!ping') {
        const chat = await msg.getChat();
        let ping = 'Nie mam pojęcia, nie udało mi się. :('
        chat.sendStateTyping();
        msg.reply(`O matko, to jest trudniejsze niż chodzenie do Walhalli (poci się)
${ping}`);
    } else if (msg.body === '!właściciel') {
        const contact = await msg.getContact();
        const chat = await msg.getChat();
        const info = await client.info;
        chat.sendStateTyping();
        msg.reply(`Hej, bracie, _Cypis_ to mój właściciel!
Pozdrowienia od ${info.pushname}.
Jeśli chcesz skontaktować się z _Cypis_, napisz = !kontakt`);
    } else if (msg.body === '!kontakt') {
        let Cypis = '14427862189'
        const contact = await msg.getContact();
        client.sendMessage(msg.from, `Cześć @${contact.number},
Wiem, dlaczego do mnie napisałeś, ale oto: https://wa.me/${Cypis}.
Projektant menu został wyeliminowany z zespołu. Pozdrowienia od Yggdrasilbota.`, {
            mentions: [contact]
        });

    } else if (msg.body.startsWith('!temat ')) {
        let chat = await msg.getChat();
        if (chat.isGroup) {
            let newSubject = msg.body.slice(7);
            chat.setSubject(newSubject);
            chat.sendStateTyping();
            msg.reply(`Opis grupy ${chat.name} został zmieniony na ${newSubject}`);
        } else {
            msg.reply('Bracie, to działa tylko w grupach!');
        }
    } else if (msg.body.startsWith('!powiedz ')) {
        const chat = await msg.getChat();
        chat.sendStateTyping();
        client.sendMessage(msg.from, msg.body.slice(8));
    } else if (msg.body.startsWith('!wyślijmi ')) {
        const contact = await msg.getContact();
        const chat = await msg.getChat;
        let text = msg.body.slice(10);
        let nummer = `${contact.number}@c.us`
        msg.reply(`*@${contact.number}* Piszesz do siebie:
${text}`, nummer, {
            mentions: [contact]
        });
    } else if (msg.body.startsWith('!opis ')) {
        let chat = await msg.getChat();
        if (chat.isGroup) {
            let newDescription = msg.body.slice(7);
            chat.setDescription(newDescription);
            chat.sendStateTyping();
            msg.reply(`Opis grupy ${chat.name} został zmieniony na ${newDescription}`);
        } else {
            msg.reply('Bracie, to działa tylko w grupach!');
        }
    } else if (msg.body === '!opuść') {
        // Opuść grupę
        let chat = await msg.getChat();
        if (chat.isGroup) {
            chat.leave();
        } else {
            msg.reply('To polecenie można używać tylko w grupach!');
        }
    } else if (msg.body.startsWith('!zablokuj')) {
        const contact = await msg.getContact();
        msg.reply('Bracie, przykro mi w moim sercu. :<')
        await contact.block();
    } else if (msg.body.startsWith('!wyrzuć')) {
        const contact = await msg.getContact();
        const chat = await msg.getChat();
        chat.sendStateTyping();
        msg.reply(`Hej, bracie, myślisz, że mam wystarczająco wiedzy? Przepraszam, ale się mylisz :(`, );
    } else if (msg.body.startsWith('!odblokuj')) {
        const contact = await msg.getContact();
        await contact.unblock();

    } else if (msg.body.startsWith('!dołącz ')) {
        const inviteCode = msg.body.split('https://chat.whatsapp.com/')[1];
        const chat = await msg.getChat();
        try {
            await client.acceptInvite(inviteCode);
            msg.reply('Pomyślnie dołączono do grupy!');
        } catch (e) {
            msg.reply('Ten kod zaproszenia jest prawdopodobnie już nieważny.');
        }

    } else if (msg.body === '!informacjegrupy') {
        let chat = await msg.getChat();
        if (chat.isGroup) {
            chat.sendStateTyping();
            msg.reply(`
*Szczegóły grupy*
Nazwa: ${chat.name}
Opis: ${chat.description}
Utworzona: ${chat.createdAt.toString()}
Utworzona przez: ${chat.owner.user}
Uczestnicy: ${chat.participants.length}
Link: ${chat.link}
        `);

        } else {
            msg.reply('To polecenie można używać tylko w grupach!');
        }
    } else if (msg.body === '!opisgrupy') {
        let chat = await msg.getChat();
        if (chat.isGroup) {
            chat.sendStateTyping();
            msg.reply(`
            Opis grupy: 
            ${chat.description}
            `);
        } else {
            msg.reply('To polecenie można używać tylko w grupach!');
        }
    } else if (msg.body === '!czaty') {
        const chats = await client.getChats();
        const chat = await msg.getChat();
        chat.sendStateTyping();
        client.sendMessage(msg.from, `Bot ma ${chats.length} otwartych czatów.`);
    } else if (msg.body === '!informacje') {
        let info = client.info;
        const chat = await msg.getChat();
        const contact = msg.getContact();
        chat.sendStateTyping();
        client.sendMessage(msg.from, `
*Informacje o połączeniu*
Nazwa bota: ${info.pushname}
Numer bota: ${info.wid.user}
Platforma: ${info.platform}
Dokumenty: ${info.filename}
`);

    } else if (msg.body.startsWith('!status ')) {
        const newStatus = msg.body.slice(8);
        const chat = await msg.getChat();
        await client.setStatus(newStatus);
        chat.sendStateTyping();
        msg.reply(`Informacje zostały zaktualizowane na *${newStatus}*!`);
    } else if (msg.body.startsWith('!nazwa ')) {
        const newName = msg.body.split(' ')[1];
        const chat = await msg.getChat();
        let info = client.info;
        await client.eventNames(newName);
        chat.sendStateTyping();
        msg.reply(`Nazwa została zaktualizowana na *${newName}*`);
    } else if (msg.body === '!ja') {
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
    } else if (msg.body === '!wsparcie') {
        const contact = await msg.getContact();
        const chat = await msg.getChat();
        chat.sendStateTyping();
        msg.reply(`Tak, zaraz podam ci link. Chwileczkę... : https://chat.whatsapp.com/KSejce3I2s3AGgpG2R7Uu8`);
    } else if (msg.body === '!usuń') {
        if (msg.hasQuotedMsg) {
            const chat = await msg.getChat();
            const quotedMsg = await msg.getQuotedMessage();
            if (quotedMsg.fromMe) {
                quotedMsg.delete(true);
            } else {
                chat.sendStateTyping();
                msg.reply('Mogę usuwać tylko moje wiadomości!');
            }
        }
    } else if (msg.body === '!wycisz') {
        const chat = await msg.getChat();
        const unmuteDate = new Date();
        unmuteDate.setMinutes(unmuteDate.getMinutes() + 2);
        chat.sendStateTyping();
        msg.reply('Ten czat jest wyciszony na urządzeniu bota na 2 minuty');
        await chat.mute(unmuteDate);
    } else if (msg.body === '!wycisz1h') {
        const chat = await msg.getChat();
        const unmuteDate = new Date();
        unmuteDate.getHours(unmuteDate.getHours() + 3);
        chat.sendStateTyping();
        msg.reply('Ten czat jest wyciszony na urządzeniu bota na 3 godziny');
        await chat.mute(unmuteDate);
    } else if (msg.body === '!wycisz2h') {
        const chat = await msg.getChat();
        const unmuteDate = new Date();
        unmuteDate.getHours(unmuteDate.getHours() + 6);
        chat.sendStateTyping();
        msg.reply('Ten czat jest wyciszony na urządzeniu bota na 6 godzin');
        await chat.mute(unmuteDate);
    } else if (msg.body === '!wycisz3h') {
        const chat = await msg.getChat();
        const unmuteDate = new Date();
        unmuteDate.getHours(unmuteDate.getHours() + 9);
        chat.sendStateTyping();
        msg.reply('Ten czat jest wyciszony na urządzeniu bota na 9 godzin');
        await chat.mute(unmuteDate);
    } else if (msg.body === '!wycisz4h') {
        const chat = await msg.getChat();
        const unmuteDate = new Date();
        unmuteDate.getHours(unmuteDate.getHours() + 12);
        chat.sendStateTyping();
        msg.reply('Ten czat jest wyciszony na urządzeniu bota na 12 godzin');
        await chat.mute(unmuteDate);
    } else if (msg.body === '!wycisz5h') {
        const chat = await msg.getChat();
        const unmuteDate = new Date();
        unmuteDate.getHours(unmuteDate.getHours() + 15);
        chat.sendStateTyping();
        msg.reply('Ten czat jest wyciszony na urządzeniu bota na 15 godzin');
        await chat.mute(unmuteDate);
    } else if (msg.body === '!wycisz6h') {
        const chat = await msg.getChat();
        const unmuteDate = new Date();
        unmuteDate.getHours(unmuteDate.getHours() + 18);
        chat.sendStateTyping();
        msg.reply('Ten czat jest wyciszony na urządzeniu bota na 18 godzin');
        await chat.mute(unmuteDate);
    } else if (msg.body === '!wycisz7h') {
        const chat = await msg.getChat();
        const unmuteDate = new Date();
        unmuteDate.getHours(unmuteDate.getHours() + 21);
        chat.sendStateTyping();
        msg.reply('Ten czat jest wyciszony na urządzeniu bota na 21 godzin');
        await chat.mute(unmuteDate);
    } else if (msg.body === '!wycisz8h') {
        const chat = await msg.getChat();
        const unmuteDate = new Date();
        unmuteDate.getHours(unmuteDate.getHours() + 24);
        chat.sendStateTyping();
        msg.reply('Ten czat jest wyciszony na urządzeniu bota na 24 godziny');
        await chat.mute(unmuteDate);
    } else if (msg.body === '!wyciszdni') {
        const chat = await msg.getChat();
        const unmuteDate = new Date();
        unmuteDate.getDay(unmuteDate.getDay() + 666);
        chat.sendStateTyping();
        msg.reply('Ten czat jest wyciszony na urządzeniu bota na 666 dni');
        await chat.mute(unmuteDate);
    } else if (msg.body === '!pomoc') {
        let info = client.info;
        msg.reply(`
------[Komendy Yggdrasilbota]------

~~~~~~~~~~~~~~~~~~~~~~
Nazwa Bota: ${info.pushname}

Witaj w Drzewie Życia Yggdrasilbot.

~~~~~~~~~~~~~~~~~~~~~~

1. *!ping*
Zapytaj o ping bota.
Użycie: !ping
        
2. *!powiedz*
Pozwól botowi napisać wybrany tekst. 
Użycie: !powiedz TutajTwójTekst
        
3. *!dołącz*
Bot dołącza do Twojej grupy!
Użycie: https://chat.whatsapp.com/TuTwójLinkDoGrupy
        
4. *!informacjegrupy*
Pokazuje szczegóły grupy
Użycie: !informacjegrupy

5. *!opisgrupy*
Pokazuje opis grupy
Użycie: !opisgrupy

6. *!czaty*
Pokazuje liczbę czatów, które mam :)
Użycie: !czaty 

7. *!informacje*
Pozwala zobaczyć mój stan i nazwę
Użycie: !informacje

8. *!ja*
Oznaczam Cię
Użycie: !ja

9. *!whatsapp*
Wysyłam Ci link do Twojego numeru
Użycie: !whatsapp

10. *!usuń*
Pozwala mi usuwać moje wiadomości!
Użycie: !usuń

11. *!właściciel*
Pokazuje, jak skontaktować się z _Cypis_.
Użycie: !właściciel

12. *!wsparcie*
Daje Ci link do grupy wsparcia Yggdrasilbota.
Użycie: !wsparcie

_Wykonane przez Cypisa_
`);


    }

});

client.on('call', async (call, msg) => {
    const contact = msg.getContact();
    if (!call.isGroup || !call.participants.length) {
        client.sendText(call.participants, `Zablokowano ze względu na połączenie. Automatyczne zablokowanie! Skontaktuj się pod adresem: https://wa.me/4917629368004/?text=Odblokuj+mnie+proszę!`);
        await contact.block();
    }
}, );
client.initialize();
