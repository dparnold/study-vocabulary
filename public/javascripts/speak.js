function sayWord(lang, text) {
    url = "https://audio1.spanishdict.com/audio?"
    lang = "es"
    text = "te%20amo"
    link = url + "lang=" + lang + "&text=" + text;
    $.get(link, function (data) {
        console.log(typeof (data));
        console.log(data.toString());
        var a = new Audio(data);
        a.play();
    });


}
setTimeout(() => {
    sayWord("es", "te amo mi vida");
}, 2000)



