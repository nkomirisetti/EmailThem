
function makeTweet(social) {
    return `https://twitter.com/intent/tweet?hashtags=BlackLivesMatter&original_referer=komirisetti.com/EmailThem&text=${encodeURI(makeTweetText(social))}`;
}

function makeTweetText(social){
    return `@${social.id}, We want to see real action, not a PR statement. What are you doing to protect your Black constituents from police brutality? (via komirisetti.com/EmailThem) `;
}