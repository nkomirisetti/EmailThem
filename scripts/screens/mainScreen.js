function openMainScreen() {
    const bodyContainer = $('<div class=\'bodyContainer\'></div>');
    bodyContainer.append('<h1>Email Them.</h1>'); // TODO live refresh with emails sent
    bodyContainer.append('<h2>Hold your elected representatives accountable to keeping Black lives safe. This page finds their contact info, creates, and sends an email to speak out against police brutality.</h2>')
    // TODO add number input if possible
    const form = $(`
        <form id="userInfo" action="javascript:void(0)">
            <input class="inputBox" id="address" type="text" placeholder="Zip code?">
            <input class ="submitButton" type="submit">
        </form>
    `);

    bodyContainer.append(form);
    bodyContainer.append('<div class=\'footerContainer\'>Made with 💙 by <a href="https://komirisetti.com" target="_blank">Nikhil Komirisetti</a></div>');

    form.submit(function (event) {
        rootContainer.fadeOut(500, function () {
            openLoadingScreen('', $("#address").val());
        });
    });

    $.post('https://feedback-unc-purity.herokuapp.com/score?score=' + 0 + '&category=emails');
    changeScreen(bodyContainer);
}