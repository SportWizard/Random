var whiteKeysFake = [];
var blackKeys = [];
var whiteKeys = [];

function piano() {
    var blackIndex = 0;

    for (var i = 0; i < 8; i++) {
        var whiteKeyFake = document.createElement("div");
        var whiteKey = document.createElement("div");

        whiteKeysFake.push(whiteKey);
        whiteKeys.push(whiteKey);

        $(whiteKeyFake).attr("class", "whiteKeyFake");
        $(whiteKeyFake).attr("id", "whiteKeyFake"+i);
        $("#piano").append(whiteKeyFake);

        if (i != 2 && i != 6) {
            var blackKey = document.createElement("div");
            blackKeys.push(blackKey);
            $(blackKey).attr("class", "blackKey");
            $(blackKey).attr("id", "blackKey"+blackIndex);
            $("#whiteKeyFake"+i).append(blackKey);
            blackIndex++;
        }

        $(whiteKey).attr("class", "whiteKey");
        $(whiteKey).attr("id", "whiteKey"+i);
        $("#whiteKeyFake"+i).append(whiteKey);

        $(whiteKey).on("click", function() {
            pressed(this.id);
        });
    
        $(blackKey).on("click", function() {
            pressed(this.id);
        });
    }
}

function playAudio(source) {
    var audio = document.getElementById("keySound");

    audio.src = source;
    audio.play();
}

function pressed(key) {
    if (key.substring(0, 5) == "white") {
        playAudio("sound/white/" + key.charAt(key.length-1) + ".mp3");
    }
    if (key.substring(0, 5) == "black") {
        playAudio("sound/black/" + key.charAt(key.length-1) + ".mp3");
    }
}