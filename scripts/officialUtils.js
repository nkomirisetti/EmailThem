function getFilter(official) {
    // TODO make this more specific
    switch (official.name) {
        case 'Donald J. Trump':
        case 'Mike Pence':
        case 'Paul Ferguson':
            return 'hidden';
        case 'Jennifer Edwards':
            return 'no-auto';
        default:
            return 'full';
    }
}

function setupOfficials(response) {
    let officials = response.officials;

    // finds district of each office
    for (const division in response.divisions) {
        if (response.divisions[division].officeIndices != undefined) {
            for (const officeIndex of response.divisions[division].officeIndices) {
                response.offices[officeIndex].division = response.divisions[division].name;
            }
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

    let hiddenCount = 0;
    for (const official in officials) {
        officials[official].display = getFilter(officials[official]);
        if (officials[official].display == 'hidden') {
            hiddenCount++;
        }
    }

    return officials;
}

function countHidden(officials) {
    let count = 0;
    for (const official of officials) {
        if (official.display == 'hidden') {
            count++;
        }
    }
    return count;
}

function mapLevels(levels) {
    switch (levels[0]) {
        case "country":
            return 'national';
        case 'administrativeArea1':
            return 'state';
        case 'administrativeArea2':
            return 'county';
        case 'locality':
            return 'city';
        default:
            return levels;
    }
}