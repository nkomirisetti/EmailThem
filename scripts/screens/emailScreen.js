function openEmailScreen(name, response) {
    const officials = response.officials;
    const bodyContainer = $('<div class=\'bodyContainer\'></div>');
    bodyContainer.append('<h1>' + (officials.length - 2) + ' officials found:</h1>');

    // finds district of each office
    for (const division in response.divisions){
        for (const officeIndex of response.divisions[division].officeIndices) {
            response.offices[officeIndex].division = response.divisions[division].name;
        }

    }

    // finds title of each official and district
    for (const office of response.offices) {
        for (const officialIndex of office.officialIndices) {
            officials[officialIndex].office = office.name;
            officials[officialIndex].division = office.division;
            officials[officialIndex].level = mapLevels(office.levels);
        }
    }

    officials.shift(); // removes trump
    officials.shift(); // removes pence

    for (const official in officials) {
        bodyContainer.append(createOfficialContainer(officials[official], name, response.normalizedInput.city, response.normalizedInput.state));
    }

    changeScreen(bodyContainer);
}

function mapLevels(levels) {
    switch (levels) {
        case 'country':
            return 'national';
        case 'level1':
            return 'state';
        case 'level2':
            return 'local';
        default:
            return levels;
    }
}

function createOfficialContainer(official, name, city, state) {
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

    container.append(createEmailButton(official, name, city, state));

    return container;
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

function createEmailButton(official, name, city, state) {
    if (official.emails != undefined) {
        return $('<a class="officialEmail" href="' + makeEmail(name, official, city, state) + '"><button class="officialEmail">Auto Email</button></a>');
    } else {
        return '';
    }
}