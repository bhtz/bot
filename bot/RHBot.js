var builder = require('botbuilder');
var intents = new builder.IntentDialog();

/**
 * RH process bot configuration
 */
export function rhbot(bot) {
    bot.dialog('/', intents);

    bot.dialog('/profile', [
        function (session) {
            builder.Prompts.text(session, 'Bonjour ! Quel est votre nom ?');
        },
        function (session, results) {
            session.userData.name = results.response;
            builder.Prompts.text(session, 'Ou habitez vous '+ session.userData.name + ' ?');
        },
        function (session, results) {
            session.userData.city = results.response;
            builder.Prompts.confirm(session, "Voulez vous voir les offres a proximité de "+ session.userData.city +"?");
        },
        function (session, results) {
            session.send('Je recherche des offres à proximité de %s !', session.userData.city);
            session.endDialog();
        }
    ]);

    intents.matches(/^changer nom/i, [
        function (session) {
            session.beginDialog('/profile');
        },
        function (session, results) {
            session.send('Ok votre nom est %s !', session.userData.name);
        }
    ]);

    intents.matches(/^offre/i, [
        function (session) {
            if (!session.userData.city) {
                session.beginDialog('/job');
            }else{
                session.beginDialog('/city');
            }
        },
        function (session, results) {
            session.send('Ok... Changed your name to %s', session.userData.name);
        }
    ]);

    intents.onDefault([
        function (session, args, next) {
            if (!session.userData.name) {
                session.beginDialog('/profile');
            } else {
                next();
            }
        },
        function (session, results) {
            session.send('Que puis je faire pour vous %s ?', session.userData.name);
        }
    ]);
}