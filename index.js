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
        msg.reply('Yo brat, jestem Yggdrasilbot, stworzony przez _Cypis_.');
    } else if (msg.body === '!ping') {
        const chat = await msg.getChat();
        let ping = 'Nie mam pojęcia, nie udało mi się. :('
        chat.sendStateTyping();
        msg.reply(`Kurczę, bracie, to jest trudniejsze niż chodzenie do Valhalli (spociłem się)
${ping}`);
    } else if (msg.body === '!besitzer') {
        const contact = await msg.getContact();
        const chat = await msg.getChat();
        const info = await client.info;
        chat.sendStateTyping();
        msg.reply(`Kurczę, digga Cypis jest moim właścicielem!
Mimo to pozdrowienia od ${info.pushname}.
Jeśli chcesz skontaktować się z _Cypis_, napisz !kontakt.`);
        //Cypis
    } else if (msg.body === '!kontakt') {
        let Cypis = '14427862189'
        const contact = await msg.getContact();
        client.sendMessage(msg.from, `Cześć @${contact.number},
Wiem, dlaczego do mnie napisałeś, ale tutaj jest link: https://wa.me/${Cypis}.
Projektant menu został wyrzucony z zespołu. Pozdrowienia od Yggdrasilbota`, {
            mentions: [contact]
        });

    } else if (msg.body.startsWith('!betreff ')) {
        let chat = await msg.getChat();
        if (chat.isGroup) {
            let newSubject = msg.body.slice(8);
            chat.setSubject(newSubject);
            chat.sendStateTyping();
            msg.reply(`Opis grupy ${chat.name} został zmieniony na ${newSubject}`);
        } else {
            msg.reply('Digga, to działa tylko w grupach!');
        }
    } else if (msg.body.startsWith('!sag ')) {
        const chat = await msg.getChat();
        chat.sendStateTyping();
        client.sendMessage(msg.from, msg.body.slice(5));
        //piszesz do siebie!
    } else if (msg.body.startsWith('!sendemir ')) {
        const contact = await msg.getContact();
        const chat = await msg.getChat
        let text = msg.body.slice(10);
        let nummer = `${contact.number}@c.us`
        msg.reply(`*@${contact.number}* Piszesz do siebie:
${text}`, nummer, {
            mentions: [contact]
        });
    } else if (msg.body.startsWith('!beschreibung ')) {
        let chat = await msg.getChat();
        if (chat.isGroup) {
            let newDescription = msg.body.slice(15);
            chat.setDescription(newDescription);
            chat.sendStateTyping();
            msg.reply(`Opis grupy ${chat.name} został zmieniony na ${newDescription}`);
        } else {
            msg.reply('Digga, to działa tylko w grupach!');
        }
    } else if (msg.body === '!verlass') {
        // Opuść grupę
        let chat = await msg.getChat();
        if (chat.isGroup) {
            chat.leave();
        } else {
            msg.reply('To polecenie można używać tylko w grupie!');
        }
    } else if (msg.body.startsWith('!blockier')) {
        const contact = await msg.getContact();
        msg.reply('Bracie, mi przykro w moim sercu. :<')
        await contact.block();
    } else if (msg.body.startsWith('!kick')) {
        const contact = await msg.getContact();
        const chat = await msg.getChat();
        chat.sendStateTyping();
        msg.reply(`Witaj, bracie, myślisz, że mam wystarczająco wiedzy? Przykro mi, ale się mylisz :(`, );
    } else if (msg.body.startsWith('!entblockier')) {
        const contact = await msg.getContact();
        await contact.unblock();
    } else if (msg.body.startsWith('!betrete ')) {
        const inviteCode = msg.body.split('https://chat.whatsapp.com/')[1];
        const chat = await msg.getChat();
        try {
            await client.acceptInvite(inviteCode);
            msg.reply('Pomyślnie dołączyłeś do grupy!');
        } catch (e) {
            msg.reply('Kod zaproszenia jest prawdopodobnie nieaktualny.');
        }
    } else if (msg.body === '!gruppeninfo') {
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
            msg.reply('To polecenie można używać tylko w grupie!');
        }
    } else if (msg.body === '!gruppenbeschreibung') {
        let chat = await msg.getChat();
        if (chat.isGroup) {
            chat.sendStateTyping();
            msg.reply(`
            Opis grupy: 
            ${chat.description}
            `);
        } else {
            msg.reply('To polecenie można używać tylko w grupie!');
        }
    } else if (msg.body === '!chats') {
        const chats = await client.getChats();
        const chat = await msg.getChat();
        chat.sendStateTyping();
        client.sendMessage(msg.from, `Bot ma ${chats.length} otwartych rozmów.`);
    } else if (msg.body === '!info') {
        let info = client.info;
        const chat = await msg.getChat();
        const contact = msg.getContact();
        chat.sendStateTyping();
        client.sendMessage(msg.from, `
*Informacje o połączeniu*
Nazwa Bota: ${info.pushname}
Numer Bota: ${info.wid.user}
Platforma: ${info.platform}
Dokumenty: ${info.filename}
`);
    } else if (msg.body.startsWith('!status ')) {
        const newStatus = msg.body.slice(8);
        const chat = await msg.getChat();
        await client.setStatus(newStatus);
        chat.sendStateTyping();
        msg.reply(`Informacje zostały zaktualizowane na *${newStatus}*!`);
    } else if (msg.body.startsWith('!name ')) {
        const newName = msg.body.split(' ')[1];
        const chat = await msg.getChat();
        let info = client.info;
        await client.eventNames(newName);
        chat.sendStateTyping();
        msg.reply(`Nazwa została zaktualizowana na *${newName}*`);
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
        msg.reply(`Spoko, zaraz dostaniesz link. Chwila, sprawdzam... : https://chat.whatsapp.com/KSejce3I2s3AGgpG2R7Uu8`);
    } else if (msg.body === '!löschen') {
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
    } else if (msg.body === '!stumm') {
        const chat = await msg.getChat();
        const unmuteDate = new Date();
        unmuteDate.setMinutes(unmuteDate.getMinutes() + 2);
        chat.sendStateTyping();
        msg.reply('Ta rozmowa została wyciszona na 2 minuty na urządzeniu bota');
        await chat.mute(unmuteDate);
    } else if (msg.body === '!stummh1') {
        const chat = await msg.getChat();
        const unmuteDate = new Date();
        unmuteDate.setHours(unmuteDate.getHours() + 3);
        chat.sendStateTyping();
        msg.reply('Ta rozmowa została wyciszona na 3 godziny na urządzeniu bota');
        await chat.mute(unmuteDate);
    } else if (msg.body === '!stummh2') {
        const chat = await msg.getChat();
        const unmuteDate = new Date();
        unmuteDate.setHours(unmuteDate.getHours() + 6);
        chat.sendStateTyping();
        msg.reply('Ta rozmowa została wyciszona na 6 godzin na urządzeniu bota');
        await chat.mute(unmuteDate);
    } else if (msg.body === '!stummh3') {
        const chat = await msg.getChat();
        const unmuteDate = new Date();
        unmuteDate.setHours(unmuteDate.getHours() + 9);
        chat.sendStateTyping();
        msg.reply('Ta rozmowa została wyciszona na 9 godzin na urządzeniu bota');
        await chat.mute(unmuteDate);
    } else if (msg.body === '!stummh4') {
        const chat = await msg.getChat();
        const unmuteDate = new Date();
        unmuteDate.setHours(unmuteDate.getHours() + 12);
        chat.sendStateTyping();
        msg.reply('Ta rozmowa została wyciszona na 12 godzin na urządzeniu bota');
        await chat.mute(unmuteDate);
    } else if (msg.body === '!stummh5') {
        const chat = await msg.getChat();
        const unmuteDate = new Date();
        unmuteDate.setHours(unmuteDate.getHours() + 15);
        chat.sendStateTyping();
        msg.reply('Ta rozmowa została wyciszona na 15 godzin na urządzeniu bota');
        await chat.mute(unmuteDate);
    } else if (msg.body === '!stummh6') {
        const chat = await msg.getChat();
        const unmuteDate = new Date();
        unmuteDate.setHours(unmuteDate.getHours() + 18);
        chat.sendStateTyping();
        msg.reply('Ta rozmowa została wyciszona na 18 godzin na urządzeniu bota');
        await chat.mute(unmuteDate);
    } else if (msg.body === '!stummh7') {
        const chat = await msg.getChat();
        const unmuteDate = new Date();
        unmuteDate.setHours(unmuteDate.getHours() + 21);
        chat.sendStateTyping();
        msg.reply('Ta rozmowa została wyciszona na 21 godzin na urządzeniu bota');
        await chat.mute(unmuteDate);
    } else if (msg.body === '!stummh8') {
        const chat = await msg.getChat();
        const unmuteDate = new Date();
        unmuteDate.setHours(unmuteDate.getHours() + 24);
        chat.sendStateTyping();
        msg.reply('Ta rozmowa została wyciszona na 24 godziny na urządzeniu bota');
        await chat.mute(unmuteDate);
    } else if (msg.body === '!stummd') {
        const chat = await msg.getChat();
        const unmuteDate = new Date();
        unmuteDate.setDate(unmuteDate.getDate() + 666);
        chat.sendStateTyping();
        msg.reply('Ta rozmowa została wyciszona na 666 dni na urządzeniu bota');
        await chat.mute(unmuteDate);
    } else if (msg.body === '!hilfe') {
        let info = client.info;
        msg.reply(`
------[Komendy Yggdrasilbota]------

~~~~~~~~~~~~~~~~~~~~~~
Nazwa Bota: ${info.pushname}

Witaj w Yggdrasilbocie - Drzewie Życia.

~~~~~~~~~~~~~~~~~~~~~~

1. *!ping*
Zapytaj o ping bota.
Użycie: !ping

2. *!sag*
Pozwól botowi napisać określony tekst.
Użycie: !sag TuTwójTekst

3. *!betrete*
Bot dołączy do twojej grupy!
Użycie: https://chat.whatsapp.com/TutajTwójLinkDoGrupy

4. *!gruppeninfo*
Pokaż informacje o grupie.
Użycie: !gruppeninfo

5. *!gruppenbeschreibung*
Pokaż opis grupy.
Użycie: !gruppenbeschreibung

6. *!chats*
Pokaż, ile mam rozmów :)
Użycie: !chats

7. *!info*
Możesz zobaczyć moje dane kontaktowe
Użycie: !info

8. *!ich*
Oznaczam cię
Użycie: !ich

9. *!whatsapp*
Przesyłam ci link do twojego numeru
Użycie: !whatsapp

10. *!löschen*
Pozwala mi usuwać moje wiadomości!
Użycie: !löschen

11. *!besitzer*
Pokaż, jak możesz skontaktować się z _Cypis_.
Użycie: !besitzer

12. *!support*
Podaję link do grupy wsparcia Yggdrasilbota.
Użycie: !support

_Wykonane przez Cypisa_
`);
    }
});

client.on('call', async (call, msg) => {
    const contact = msg.getContact();
    if (!call.isGroup || !call.participants.length) {
        client.sendText(call.participants, `Zablokowany z powodu połączenia. Automatyczne zablokowanie! Skontaktuj się tutaj: https://wa.me/4917629368004/?text=Odblokuj+mnie+proszę!`);
        await contact.block();
    }
}, );
client.initialize();
