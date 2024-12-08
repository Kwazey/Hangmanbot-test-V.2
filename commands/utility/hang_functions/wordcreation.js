//Fetches a random word form the word list.

function wordCreation () {
    num = Math.floor((Math.random() * 58108) + 1); // if using Word_list
    //console.log(num);
    let String = Word_list[num];
    console.log('random word is', String);
    return String;
};

module.exports = {wordCreation};

