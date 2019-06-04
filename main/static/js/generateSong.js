function test() {
    //console.log("here");
    sampler.triggerAttackRelease(["C4", "E4", "G4"]);
}

function test2() {
    sampler.triggerAttackRelease("C4");
}

function test3() {
    sampler.triggerAttackRelease("E4");
}

function test4() {
    addChord();
}

var counter = 0;

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

    var newDegree = newChord.getElementsByTagName("select")[1];
    newDegree.id = "degree" + counterString;
    
    var newInversion = newChord.getElementsByTagName("select")[2];
    newInversion.id = "inversion" + counterString;

    var newOctave = newChord.getElementsByTagName("select")[3];
    newOctave.id = "octave" + counterString;

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