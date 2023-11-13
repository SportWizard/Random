function start() {
    piano();
    selectTime()
}

//piano
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

//pomodoro
function selectTime() {
    //session
    var sessionHour = document.getElementById("sessionHour");
    var sessionMinute = document.getElementById("sessionMinute");
    var sessionSecond = document.getElementById("sessionSecond");

    //break
    var breakHour = document.getElementById("breakHour");
    var breakMinute = document.getElementById("breakMinute");
    var breakSecond = document.getElementById("breakSecond");
    
    //hour
    for (var i = 0; i < 23; i++) {
        //session
        var sessionHourOption = document.createElement("option");
        
        sessionHourOption.value = i;
        sessionHourOption.text = i;

        sessionHour.append(sessionHourOption);

        //break
        var breakHourOption = document.createElement("option");
        
        breakHourOption.value = i;
        breakHourOption.text = i;

        breakHour.append(breakHourOption);
    }

    //minute and second
    for (var i = 0; i < 60; i++) {
        //session
        var sessionMinuteOption = document.createElement("option");

        sessionMinuteOption.value = i;
        sessionMinuteOption.text = i;

        sessionMinute.append(sessionMinuteOption);

        var sessionSecondOption = document.createElement("option");

        sessionSecondOption.value = i;
        sessionSecondOption.text = i;

        sessionSecond.append(sessionSecondOption);

        //break
        var breakMinuteOption = document.createElement("option");

        breakMinuteOption.value = i;
        breakMinuteOption.text = i;

        breakMinute.append(breakMinuteOption);

        var breakSecondOption = document.createElement("option");

        breakSecondOption.value = i;
        breakSecondOption.text = i;

        breakSecond.append(breakSecondOption);
    }
}

var onSession = true;
var currentSession = 1;
var timerInterval;

var sessionHour;
var sessionMinute;
var sessionSecond;
var breakHour;
var breakMinute;
var breakSecond;

var sessionHourString;
var sessionMinuteString;
var sessionSecondString;
var breakHourString;
var breakMinuteString;
var breakSecondString;

function updateTimer(hour, minute, second) {
    document.getElementById("timer").innerHTML = hour + ":" + minute + ":" + second;
}

function setTimer() {
    //session
    if (onSession) {
        document.getElementById("status").innerHTML = "Status: Study";
        document.getElementById("session").innerHTML = "Session: " + currentSession;

        sessionHour = document.getElementById("sessionHour").value;
        sessionMinute = document.getElementById("sessionMinute").value;
        sessionSecond = document.getElementById("sessionSecond").value;

        sessionHourString = sessionHour;
        sessionMinuteString = sessionMinute;
        sessionSecondString = sessionSecond;

        if (sessionHour <= 9)
            sessionHourString = sessionHour.toString().padStart(2, '0');
        if (sessionMinute <= 9)
            sessionMinuteString = sessionMinute.toString().padStart(2, '0');
        if (sessionSecond <= 9)
            sessionSecondString = sessionSecond.toString().padStart(2, '0');

        updateTimer(sessionHourString, sessionMinuteString, sessionSecondString);
    }
    //break
    else {
        document.getElementById("status").innerHTML = "Status: Break";

        breakHour = document.getElementById("breakHour").value;
        breakMinute = document.getElementById("breakMinute").value;
        breakSecond = document.getElementById("breakSecond").value;

        breakHourString = breakHour;
        breakMinuteString = breakMinute;
        breakSecondString = breakSecond;
        
        if (breakHour <= 9)
            breakHourString = breakHour.toString().padStart(2, '0');
        if (breakMinute <= 9)
            breakMinuteString = breakMinute.toString().padStart(2, '0');
        if (breakSecond <= 9)
            breakSecondString = breakSecond.toString().padStart(2, '0');

        updateTimer(breakHourString, breakMinuteString, breakSecondString);
    }
}

function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(function() {
            if (sessionHour == 0 && sessionMinute == 0 && sessionSecond == 0 && onSession) {
                document.getElementById("pomodoro").style.backgroundColor = "white";
                
                clearInterval(timerInterval);
                timerInterval = null;
                
                onSession = false;

                setTimer();
            }
            else if (breakHour == 0 && breakMinute == 0 && breakSecond == 0 && !onSession) {
                document.getElementById("pomodoro").style.backgroundColor = "white";
                
                clearInterval(timerInterval);
                timerInterval = null;
                
                onSession = true;

                currentSession++;

                setTimer();
            }
            else if (onSession) {
                document.getElementById("pomodoro").style.backgroundColor = "red";

                if (sessionMinute == 0 && sessionSecond == 0) {
                    sessionMinute = 59;
                    sessionHour--;
                }
                if (sessionSecond == 0) {
                    sessionSecond = 59;
                    sessionMinute--;
                }

                sessionHourString = sessionHour;
                sessionMinuteString = sessionMinute;
                sessionSecondString = sessionSecond;
        
                if (sessionHour <= 9)
                    sessionHourString = sessionHour.toString().padStart(2, '0');
                if (sessionMinute <= 9)
                    sessionMinuteString = sessionMinute.toString().padStart(2, '0');
                if (sessionSecond <= 9)
                    sessionSecondString = sessionSecond.toString().padStart(2, '0');
            
                updateTimer(sessionHourString, sessionMinuteString, sessionSecondString);

                sessionSecond--;
            }
            else if (!onSession) {
                document.getElementById("pomodoro").style.backgroundColor = "lightblue";

                if (breakMinute == 0 && breakSecond == 0) {
                    breakMinute = 59;
                    breakHour--;
                }
                if (breakSecond == 0) {
                    breakSecond = 59;
                    breakMinute--;
                }

                breakHourString = breakHour;
                breakMinuteString = breakMinute;
                breakSecondString = breakSecond;
        
                if (breakHour <= 9)
                    breakHourString = breakHour.toString().padStart(2, '0');
                if (breakMinute <= 9)
                    breakMinuteString = breakMinute.toString().padStart(2, '0');
                if (breakSecond <= 9)
                    breakSecondString = breakSecond.toString().padStart(2, '0');
            
                updateTimer(breakHourString, breakMinuteString, breakSecondString);

                breakSecond--;
            }
        }, 1000);
    }
}

function stopTimer() {
    document.getElementById("pomodoro").style.backgroundColor = "white";
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    document.getElementById("pomodoro").style.backgroundColor = "white";
    clearInterval(timerInterval);
    timerInterval = null;
    
    updateTimer("00", "00", "00");  
    document.getElementById("session").innerHTML = "Session:";
    
    onSession = true;
    currentSession = 1;
}