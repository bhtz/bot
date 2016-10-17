var builder = require('botbuilder');
var intents = new builder.IntentDialog();

/**
 * RH process bot configuration
 */
export function rhbot(bot) {
    bot.dialog('/', intents);

    bot.dialog('/profile', [
        function (session) {
            session.send('Je dois d\'abord mieux vous connaître !');
            builder.Prompts.text(session, 'Quel est votre nom ?');
        },
        function (session, results) {
            session.userData.name = results.response;
            builder.Prompts.text(session, 'Ou habitez vous ' + session.userData.name + ' ?');
        },
        function (session, results) {
            session.userData.city = results.response;
            builder.Prompts.confirm(session, "Voulez vous voir les offres a proximité de " + session.userData.city + "?");
        },
        function (session, results) {
            if(results.response){
                session.send('Je recherche des offres à proximité de %s !', session.userData.city);
                session.send(getMdOffers(session.userData.city));
            }
            else{
                session.send('Que puis je faire pour vous %s ?', session.userData.name);
            }
            session.endDialog();
        }
    ]);


    intents.matches(/^changer profil/i, [
        function (session) {
            session.beginDialog('/profile');
        }
    ]);

    intents.matches(/^version/i, [
        function (session) {
            session.send('Ma version est 1.0 !');  
        }
    ]);

    intents.matches(/^offres/i, [
        function (session, args, next) {
            if (!session.userData.city) {
                session.send('Je dois d\'abord mieux vous connaître !');
                session.beginDialog('/profile');
            } else {
                next();
            }
        },
        function (session, results) {
            session.send('Je recherche des offres à proximité de %s !', session.userData.city);
            session.send(getMdOffers(session.userData.city));
        }
    ]);

    intents.onDefault([
        function (session, args, next) {
            if (!session.userData.name) {
                session.send('Bonjour je suis BOTRH !');
                session.beginDialog('/profile');
            } else {
                session.send('Que puis je faire pour vous %s ?', session.userData.name);
            }
        }
    ]);
}

function getMdOffers(ville){
    return [
        '### Offres à proximité de ' + ville,
        "* Agent de maintenance (H/F)",
        "* Mécanicien (H/F)",
        "* Chef de gare (H/F)",
        "* Agent de maintenance (H/F)"
    ].join('\n\n');
}