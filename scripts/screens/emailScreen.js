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
    container.append(createDivisionContainer(official));

    const infoList = $('<ul></ul>');
    infoList.append(partyInfo(official));
    infoList.append(socialInfo(official));
    infoList.append(phoneInfo(official));
    container.append(infoList);

    container.append(createEmailButton(official, name));

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
                    output += '<li class="twitter"><a href="https://twitter.com/' + social.id + '">@' + social.id + '</a></li>';
                    break;
                case 'YouTube':
                    output += '<li class="youtube"><a href="https://www.youtube.com/user/' + social.id + '">YouTube Channel</a></li>';
                    break;
                case 'Facebook':
                    output += '<li class="facebook"><a href="https://www.facebook.com/' + social.id + '">' + social.id + '</a></li>';
                    break;
            }
        }
    }
    return output;
}

function partyInfo(official) {
    if (official.party != undefined) {
        if (official.party.includes('epublican')) {
            return '<li class="republican">Republican</li>';
        } else if (official.party.includes('emocrat')) {
            return '<li data-type="democrat">Democrat</li>';
        } else {
            return '<li class="democrat">Democrat</li>'; // TODO other party
        }
    }
}

function phoneInfo(official) {
    // TODO add phone number container
    let output = '';
    if (official.phones != undefined) {
        for (const phone of official.phones) {
            output += '<li class="phone"><a class="officialPhone" href="tel:' + phone + '">' + phone + '</a></li>';
        }
    }

    return output;
}

function createEmailButton(official, name) {
    // TODO email multiple
    if (official.emails != undefined) {
        console.log(official.emails);
        //<a href="mailto:test@example.com?subject=Testing out mailto!&body=This is only a test!">Second Example</a>
        return $('<a class="officialEmail" href="mailto:' + official.emails[0] + '?subject=Testing out mailto!&body=This is only a test from ' + name + '."><button class="officialEmail">Email this person</button></a>');
        // TODO maybe make this a button we will see
    } else {
        return '';
    }
}