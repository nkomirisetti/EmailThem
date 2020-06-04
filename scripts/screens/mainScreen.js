function openMainScreen() {
    const bodyContainer = $('<div class=\'bodyContainer\'></div>');
    bodyContainer.append('<h1>Email Them.</h1>'); // TODO live refresh with emails sent
    bodyContainer.append('<h2>This website makes it as easy as possible to email your politicians. It finds your their emails, phone numbers, and other social media, and creates a template that you can use to email them in one click.</h2>')

    const form = $(`
        <form id="userInfo" action="javascript:void(0)">
            <input id="name" type="text" placeholder="Name (optional)">
            <input id="address" type="text" placeholder="Address"> 
            <input type="submit">
        </form>
    `);

    bodyContainer.append(form);

    form.submit(function (event) {
        console.log('hit');
        rootContainer.fadeOut(500, function () {
            openLoadingScreen($("#name").val().trim(), $("#address").val());
        });
    });

    changeScreen(bodyContainer);
}