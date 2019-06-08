document.getElementById("addChord").addEventListener('click', selectReset, false);
document.getElementById("tempo").addEventListener('change', updateTempo);

var isPlay = false;
var counter = 0;
var bpm = 120;

function selectPlay() {
    if (isPlay) {
        play();
    }
}

function selectReset() {
    if (isPlay) {
        stop();
        play();
    }
}

function updateTempo() {

    bpm = document.getElementById("tempo").value;
    //Tone.Transport.bpm = bpm;
    Tone.Transport.bpm.rampTo(bpm, 1);
    
    //if (isPlay) {
    //    play();
    //}
    console.log(document.getElementById("tempo").value);
}

function addChord() {
    counter += 1;
    var counterString = counter.toString();

    var song = document.getElementById("songCont");
    var chord = document.getElementById("chordSettings");

    var newChord = chord.cloneNode(true);
    newChord.removeAttribute("hidden");
    newChord.id = "chord" + counterString;

    var newButton = newChord.getElementsByTagName("button")[0];
    newButton.id = "button" + counterString;
    newButton.onclick = function() { playTriad(counterString); };

    var newKey = newChord.getElementsByTagName("select")[0];
    newKey.id = "key" + counterString;
    newKey.addEventListener('change', selectPlay, false);

    var newDegree = newChord.getElementsByTagName("select")[1];
    newDegree.id = "degree" + counterString;
    newDegree.addEventListener('change', selectPlay, false);

    var newInversion = newChord.getElementsByTagName("select")[2];
    newInversion.id = "inversion" + counterString;
    newInversion.addEventListener('change', selectPlay, false);

    var newOctave = newChord.getElementsByTagName("select")[3];
    newOctave.id = "octave" + counterString;
    newOctave.addEventListener('change', selectPlay, false);

    var newIcon = newChord.getElementsByTagName("button")[1];
    newIcon.id = "icon" + counterString;

    song.appendChild(newChord);
    
    //newButton.innerHTML = "New";
}


//song.ppendChild(newButton)

function playTriad(counterString) {
    console.log("play:" + counterString);

    var keyId = document.getElementById("key" + counterString);
    var degreeId = document.getElementById("degree" + counterString);
    var inversionId = document.getElementById("inversion" + counterString);
    var octaveId = document.getElementById("octave" + counterString);

    var triad = getTriads(keyId.value, degreeId.value);
    triad = inversionNumbers(triad, octaveId.value, inversionId.value);
    
    console.log(triad);

    sampler.triggerAttackRelease(triad, "4n");
}

function playSong() {
    if (isPlay) {
        stop();
        isPlay = false;
        document.getElementById("playSong").innerHTML = "Play Song";
    }
    else {
        play();
        isPlay = true;
        document.getElementById("playSong").innerHTML = "Stop Song";
    }
}

function play() {

    console.log("Play Song");
    Tone.Transport.cancel();
    //Tone.Transport.stop();
    var triadArray = [];

    for (i = 0; i < counter; i++) {
        var counterString = (i + 1);

        counterString = counterString.toString();

        var keyId = document.getElementById("key" + counterString);
        var degreeId = document.getElementById("degree" + counterString);
        var inversionId = document.getElementById("inversion" + counterString);
        var octaveId = document.getElementById("octave" + counterString);

        var triad = getTriads(keyId.value, degreeId.value);

        triad = inversionNumbers(triad, octaveId.value, inversionId.value);

        var timeTest = i * 4;
        var array2 = [i * Tone.Time("2n"), triad];
        triadArray.push(array2);
    }
    console.log(triadArray);

    //var seq = new Tone.Sequence(function(time, triad) {
    //    console.log(triad);
    //    sampler.triggerAttackRelease(triad, "4n");
    //}, triadArray, "4n");

    var chordPart = new Tone.Part(function(time, triad) {
        console.log(Tone.Transport.progress);
        sampler.triggerAttackRelease(triad, "2n", time);

        for (i = 0; i < counter; i++) {
            var counterString = (i+1);
            var iconId = document.getElementById("icon" + counterString);

            console.log(Tone.Transport.position);
            var position = Tone.Transport.position;
            var firstPosition = parseInt(position.split(':')[0], 10);
            var secondPosition = parseInt(position.split(':')[1], 10);
            
            var finalPosition = (firstPosition * 2) + (secondPosition / 2);

            if (i == (finalPosition % counter)) {
                iconId.classList.remove("btn-light");
                iconId.classList.add("btn-dark");
                iconId.classList.add("active");
            }
            else {
                iconId.classList.remove("btn-dark");
                iconId.classList.add("btn-light");
                iconId.classList.remove("active");
            }
        }

    }, triadArray).start(0);

    //chordPart.loop = true;
    //chordPart.loopStart = "0:0";

    //var endTime = counter * 0.5;
    //chordPart.loopEnd = endTime.toString() + ":0";

    Tone.Transport.loop = true;
    Tone.Transport.loopStart = "0:0";

    var endTime = counter;
    Tone.Transport.loopEnd = Tone.Time('2n') * counter;

    console.log("Bpm:" + bpm);

    Tone.Transport.bpm = bpm;
    //Tone.Transport.bpm.rampTo(bpm, 1);
    Tone.Transport.start();
}

function stop() {
    Tone.Transport.cancel();
    Tone.Transport.stop();
}