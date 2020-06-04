function openEmailScreen(name, response) {
    const bodyContainer = $('<div class=\'bodyContainer\'></div>');
    bodyContainer.append('<h1>Your officials:</h1>');
    const officials = response.officials;

    for (const division in response.divisions) {
        for (const officeIndex in response.divisions[division].officeIndices) {
            officials[response.divisions[division].officeIndices[officeIndex]].division = response.divisions[division].name;
        }
    }

    for (const office in response.offices) {
        for (const officeIndex in response.offices[office].officialIndices) {
            officials[response.offices[office].officialIndices[officeIndex]].office = response.offices[office].name;
        }
    }

    for (const official in officials) {
        bodyContainer.append(createOfficialContainer(officials[official], name));
    }

    changeScreen(bodyContainer);
}

function createOfficialContainer(official, name) {
    const container = $('<div class="officialContainer"></div>');
    container.append('<div class="officialName">' + official.name + '</div>');
    container.append('<div class="officialOffice">' + official.office + '</div>');
    container.append(createOfficeContainer(official));
    container.append(createPartyContainer(official));
    container.append(createEmailContainer(official, name));
    container.append(createSocialMediaContainer(official));
    container.append(createPhoneNumberContainer(official));

    return container;
}

function createEmailContainer(official, name) {
    // TODO support multiple emails
    if (official.emails != undefined) {
        console.log(official.emails);
        //<a href="mailto:test@example.com?subject=Testing out mailto!&body=This is only a test!">Second Example</a>
        return $('<a class="officialEmail" href="mailto:' + official.emails[0] + '?subject=Testing out mailto!&body=This is only a test from ' + name + '.">Email this person</a>');
        // TODO maybe make this a button we will see
    } else {
        return '';
    }
}

function createSocialMediaContainer(official) {
    if (official.channels != undefined) {
        const socialDiv = $('<div class="socialChannels"></div>');

        for (const social of official.channels) {
            const socialBlade = $('<div class="socialBlades"></div>');
            switch (social.type) {
                case 'Twitter':
                    socialBlade.append('<img src="assets/twitter.png">');
                    socialBlade.append('<a class="twitterLink" href="https://twitter.com/' + social.id + '">' + social.id + '</a>');
                    break;
                case 'YouTube':
                    socialBlade.append('<img src="assets/youtube.png">');
                    socialBlade.append('<a class="twitterLink" href="https://www.youtube.com/channel/' + social.id + '">YouTube Channel</a>');
                    break;
                case 'Facebook':
                    socialBlade.append('<img src="assets/facebook.png">');
                    socialBlade.append('<a class="twitterLink" href="https://www.facebook.com/' + social.id + '">' + social.id + '</a>');
                    break;
            }
            socialDiv.append(socialBlade);
        }

        return socialDiv;
    } else {
        return '';
    }
}

function createPartyContainer(official) {
    if (official.party != undefined) {
        const partyBlade = $('<div class="politicalParty"></div>');

        if (official.party.includes('ebulican')) {
            partyBlade.append('<img src="assets/republican.png">');
            partyBlade.append('<div class="partyName">Republican</div>');
        } else if (official.party.includes('emocrat')) {
            partyBlade.append('<img src="assets/democrat.png">');
            partyBlade.append('<div class="partyName">Democrat</div>');
        } else {
            partyBlade.append('<div class="partyName">' + official.party + '</div>');
        }

        return partyBlade;
    } else {
        return '';
    }

}

function createOfficeContainer(official) {
    if (official.office != undefined) {
        return $('<div class="officialOffice">' + official.office + '</div>');
    } else {
        return '';
    }
}

function createPhoneNumberContainer(official) {
    // TODO add phone number container
    if (official.phones != undefined) {
        return $('<a class="officialPhone" href="tel:' + official.phones[0] + '">' + official.phones[0] + '</a>');
    } else {
        return '';
    }
}