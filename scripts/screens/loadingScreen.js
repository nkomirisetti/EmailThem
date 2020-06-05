function openLoadingScreen(name, address) {
    const bodyContainer = $('<div class=\'bodyContainer\'></div>');
    bodyContainer.append(('<div class =\'centerText\'>Pulling up government records...</div>'));


    $.ajax(apiCall(address)).done(function (response) {
        rootContainer.fadeOut(500, function () {
            openEmailScreen(name, response);
        });
    }).fail(function () {
        rootContainer.fadeOut(500, function () {
            openFailScreen(address);
        });
    });

    changeScreen(bodyContainer);
}

function openFailScreen(address) {
    const bodyContainer = $('<div class=\'bodyContainer\'></div>');
    bodyContainer.append(('<div class =\'centerText\'>"' + address + '" is not a valid address</div>'));
    const returnButton = $('<button>Try again</button>');
    returnButton.click(function () {
        rootContainer.fadeOut(500, function () {
            openMainScreen();
        });
    });
    bodyContainer.append(returnButton);

    changeScreen(bodyContainer);
}


function apiCall(address) {
    return {
        "url": "https://www.googleapis.com/civicinfo/v2/representatives?address=" +
            address +
            "&includeOffices=true&key=AIzaSyCqCSPlacdYJPMSfB-FMNZPN7wnIWMYzF0",
        "method": "GET",
        "timeout": 0,
    };
}