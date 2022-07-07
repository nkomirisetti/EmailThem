function openMainScreen() {
    const bodyContainer = $('<div class=\'bodyContainer\'></div>');
    bodyContainer.append(`<div style="display: inline;">
    <h1 style="display: inline;">Email </h1>
    <h3 style="display: inline;">(and tweet)</h3>
    <h1 style="display: inline;"> Them</h1>
</div>
`)
    bodyContainer.append('<h2>Hold your elected representatives accountable to keeping Black lives safe. This page finds their contact info, creates, and sends an email or tweet to them.</h2>')
    // TODO add number input if possible
    const form = $(`
        <form id="userInfo" action="javascript:void(0)">
            <input class="inputBox" id="address" type="text" placeholder="Zip code? (or address)">
            <input class ="submitButton" type="submit">
        </form>
    `);

    bodyContainer.append(form);
    bodyContainer.append('<div class=\'footerContainer\'>Currently operated by Nandika Komirisetti<br>Questions? Concerns? Email me at <a href="mailto:help@komirisetti.com" target="_blank">help@komirisetti.com</a></div>');

    form.submit(function (event) {
        rootContainer.fadeOut(500, function () {
            openLoadingScreen('', $("#address").val());
        });
    });

    $.post('https://feedback-unc-purity.herokuapp.com/score?score=' + 0 + '&category=emails');
    changeScreen(bodyContainer);
}
