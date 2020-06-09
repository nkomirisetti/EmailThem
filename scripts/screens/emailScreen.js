function openEmailScreen(name, response) {
    const bodyContainer = $('<div class=\'bodyContainer\'></div>');
    const officials = setupOfficials(response);
    const count = countHidden(officials);

    bodyContainer.append('<h1>' + (officials.length - count) + ' officials found:</h1>');
    for (const official of officials) {
        bodyContainer.append(createOfficialContainer(official, response.normalizedInput.city, response.normalizedInput.state));
    }

    changeScreen(bodyContainer);
}

function createOfficialContainer(official, city, state) {
    if (official.display != 'hidden'){
        const container = $('<div class="officialContainer"></div>');

        container.append('<div class="officialName">' + official.name + '</div>');
        container.append('<div class="officialOffice">' + official.office + '</div>');
        container.append(createDivisionContainer(official));
    
        const infoList = $('<ul></ul>');
        infoList.append(partyInfo(official));
        infoList.append(socialInfo(official));
        infoList.append(phoneInfo(official));
        infoList.append(emailInfo(official));
        
        container.append(infoList);
        if (official.display != 'no-auto'){
            container.append(createEmailButton(official, city, state));
            container.append(createTweetButton(official));    
        }
    
        return container;
    } else {
        return '';
    }

}

function createDivisionContainer(official) {
    if (official.division != undefined) {
        return $('<div class="officialDivision">' + official.division + '</div>');
    } else {
        return '';
    }
}

function socialInfo(official) {
    let output = '';
    if (official.channels != undefined) {
        for (const social of official.channels) {
            switch (social.type) {
                case 'Twitter':
                    output += '<li class="twitter"><a href="https://twitter.com/' + social.id + '" target="_blank">@' + social.id + '</a></li>';
                    break;
                case 'YouTube':
                    output += '<li class="youtube"><a href="https://www.youtube.com/user/' + social.id + '" target="_blank">YouTube Channel</a></li>';
                    break;
                case 'Facebook':
                    output += '<li class="facebook"><a href="https://www.facebook.com/' + social.id + '" target="_blank">' + social.id + '</a></li>';
                    break;
            }
        }
    }
    return output;
}

function partyInfo(official) {
    if (official.party != undefined) {
        if (official.party.includes('epublican')) {
            return '<li class="republican">' + official.party + '</li>';
        } else if (official.party.includes('emocrat')) {
            return '<li class="democrat">' + official.party + '</li>';
        } else {
            return '<li class="genericparty">' + official.party + '</li>';
        }
    }
}

function phoneInfo(official) {
    let output = '';
    if (official.phones != undefined) {
        for (const phone of official.phones) {
            output += '<li class="phone"><a class="officialPhone" href="tel:' + phone + '">' + phone + '</a></li>';
        }
    }

    return output;
}

function emailInfo(official) {
    let output = '';
    if (official.emails != undefined) {
        for (const email of official.emails) {
            output += '<li class="email">' + email + '</li>';
        }
    }

    return output;
}

function createEmailButton(official, city, state) {
    if (official.emails != undefined) {
        return $('<a class="officialEmail" href="' + makeEmail(official, city, state) + '"><button class="officialEmail">Auto Email</button></a>');
    } else {
        return '';
    }
}

function createTweetButton(official) {
    if (official.channels != undefined) {
        for (const social of official.channels) {
            if (social.type == 'Twitter'){
                return $('<a class="officialEmail" href="' + makeTweet(social) + '"><button class="officialEmail">Auto Tweet</button></a>');
            }
        }
    }
    return '';
}