function makeSubject(official) {
    return `${official.office}, what are you doing to combat police brutality?`;
}

function makeEmailAddress(official) {
    return official.emails[0]; // TODO add both emails
}

function makeEmail(userName, official, city, state) {
    const email = encodeURI(makeEmailAddress(official));
    const subject = encodeURI(makeSubject(official));
    const body = encodeURI(makeBody(official, city, state));
    return `mailto:${email}?subject=${subject}&body=${body}`;
}

function makeBody(official, city, state) {
    return `Dear ${official.name},

I am a constituent in ${city}, ${state}. I am writing to you today to ask what you are doing, as the ${official.office}, to ensure that your officers are not abusing their power and are held accountable for their actions. I want you to know that these are issues very dear to me, and will directly influence which officials I support.

After witnessing the death of George Floyd at the hands of the Minneapolis Police Department, I am left feeling outraged, frustrated, and hurt. 

As a resident of ${city}, ${state}, I want to make sure that my local police department is taking the necessary preventative measures to ensure that incidents like this will not occur in the future anywhere in ${state}. So, I ask you what specific changes are you making to increase accountability and to prevent this from happening again.

When lives are at stake, inaction is unacceptable. I appreciate you taking the time to read this email, and I hope that we can work together to protect the ${city} community. I refuse to let the next hashtag come from here.


Sincerely,
Your constituent in ${city} 
`;
}