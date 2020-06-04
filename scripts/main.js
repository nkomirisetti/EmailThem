var rootContainer;

$(document).ready(() => {
    rootContainer = $('#rootContainer');
    openMainScreen();
});

function changeScreen(div) {
    rootContainer.empty();
    rootContainer.append(div);
    rootContainer.fadeOut(0).fadeIn(500);
}