function openMainScreen() {
    const bodyContainer = $('<div class=\'bodyContainer\'></div>');
    bodyContainer.append('<h1>Email Them.</h1>'); // TODO live refresh with emails sent
    bodyContainer.append('<h2>This website makes it easy to email your politicians. It finds their info, creates a template, and lets you email them in one click.</h2>')

    // TODO use text area for the address box
    const form = $(`
        <form id="userInfo" action="javascript:void(0)">
            <input class="inputBox" id="name" type="text" placeholder="Name (optional)">
            <input class="inputBox" id="address" type="text" placeholder="Home address">
            <input class ="submitButton" type="submit">
        </form>
    `);

    bodyContainer.append(form);
    bodyContainer.append('<div class=\'footerContainer\'>Made with 💙 by <a href="https://komirisetti.com">Nikhil Komirisetti</a></div>');

    form.submit(function (event) {
        rootContainer.fadeOut(500, function () {
            openLoadingScreen($("#name").val().trim(), $("#address").val());
        });
    });

    changeScreen(bodyContainer);
}