document.getElementById("addChord").addEventListener('click', selectReset, false);
//document.getElementById("tempo").addEventListener('change', updateTempo);
document.getElementById("degreeType").addEventListener('change', updateDegreeView);
document.getElementById("inversionType").addEventListener('change', updateInversionView);
document.getElementById("octaveType").addEventListener('change', updateOctaveView);
//document.getElementById("instrument").addEventListener('change', updateInstrument);

var isPlay = false;
var counter = 0;
var bpm = 120;
var sampler = samplerPiano;

var selection = "Random";
document.getElementById("fullRandomSelection").addEventListener('click', function() {
    updateSelection("Random");
});
document.getElementById("simpleSelection").addEventListener('click', function() {
    updateSelection("Simple");
});
document.getElementById("customSelection").addEventListener('click', function() {
    updateSelection("Custom");
});

//Random Selections:
var chordNumberRandom = 4;
document.getElementById("chordNumberRandom").addEventListener('change', function() {
    chordNumberRandom = document.getElementById("chordNumberRandom").value;
});
var instrumentRandom = "samplerPiano";
document.getElementById("instrumentRandom").addEventListener('change', function() {
    updateInstrument("Random");
});
var mainKeyRandom = "C";
document.getElementById("mainKeyRandom").addEventListener('change', function() {
mainKeyRandom = document.getElementById("mainKeyRandom").value;
});
var tempoRandom = 120;
document.getElementById("tempoRandom").addEventListener('change', function() {
    updateTempo("Random");
});

//Simple Selections:
var chordNumberSimple = 4;
document.getElementById("chordNumberSimple").addEventListener('change', function() {
    chordNumberRandom = document.getElementById("chordNumberSimple").value;
});
var instrumentSimple = "samplerPiano";
document.getElementById("instrumentSimple").addEventListener('change', function() {
    updateInstrument("Simple");
});
var mainKeySimple = "C";
document.getElementById("mainKeySimple").addEventListener('change', function() {
    mainKeyRandom = document.getElementById("mainKeySimple").value;
});
var octaveSimple = 4;
document.getElementById("octaveSimple").addEventListener('change', function(){
    octaveSimple = document.getElementById("octaveSimple").value;
});
var tempoSimple = 120;
document.getElementById("tempoSimple").addEventListener('change', function() {
    updateTempo("Simple");
});
var isInversionsSimple = false;
document.getElementById("isInversionsSimple").addEventListener('change', function() {
    isInversionsSimple = document.getElementById("isInversionsSimple").checked;
});
var isStartOneSimple = true;
document.getElementById("isStartOneSimple").addEventListener('change', function() {
    isStartOneSimple = document.getElementById("isStartOneSimple").checked;
});
var isEndFiveSimple = true;
document.getElementById("isEndFiveSimple").addEventListener('change', function() {
    //console.log(document.getElementById("isEndFiveSimple").checked);
    isEndFiveSimple = document.getElementById("isEndFiveSimple").checked;
});

//Custom Selections:
var chordNumberCustom = 4;
document.getElementById("chordNumberCustom").addEventListener('change', function() {
    chordNumberRandom = document.getElementById("chordNumberCustom").value;
});
var instrumentCustom = "samplerPiano";
document.getElementById("instrumentCustom").addEventListener('change', function() {
    updateInstrument("Custom");
});
var mainKeyCustom = "C";
document.getElementById("mainKeyCustom").addEventListener('change', function() {
    mainKeyRandom = document.getElementById("mainKeyCustom").value;
});
var tempoCustom = 120;
document.getElementById("tempoCustom").addEventListener('change', function() {
    updateTempo("Custom");
});
var isSimpleCustom = false;
document.getElementById("isSimpleCustom").addEventListener('change', function() {
    isSimpleCustom = document.getElementById("isSimpleCustom").checked;
});
var isStartOneCustom = false;
document.getElementById("isStartOneCustom").addEventListener('change', function() {
    isStartOneCustom = document.getElementById("isStartOneCustom").checked;
});
var isEndFiveCustom = false;
document.getElementById("isEndFiveCustom").addEventListener('change', function() {
    isEndFiveCustom = document.getElementById("isEndFiveCustom").checked;
});

var degreeType = 0;
var degreeWeights = [50,50,50,50,50,50,50];

var inversionType = 0;
var inversionWeights = [50,50,50];

var octaveType = 0;
var staticOctave = 4;
var octaveMin = 1;
var octaveMax = 7;
var octaveWeights = [50,50,50,50,50,50,50];

function updateSelection(type) {
    if (type == "Random") {
        selection = "Random";
    }
    else if (type == "Simple") {
        selection = "Simple";
    }
    else {
        selection = "Custom";
    }

    if (isPlay) {
        playSong();
    }
}

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

function addChord1() {
    addChord(0,0,0,0,1);
}

function updateDegreeView() {
    var degreeOption = document.getElementById("degreeType").value;

    var collapseDegree = document.getElementById("collapseDegree");
    var degreeOptionOne = document.getElementById("degreeOptionOne");
    var degreeOptionTwo = document.getElementById("degreeOptionTwo");
    var degreeOptionTwoTwo = document.getElementById("degreeOptionTwoTwo");
    var degreeOptionTwoThree = document.getElementById("degreeOptionTwoThree");

    if (degreeOption == 0) {
        degreeOptionOne.removeAttribute("hidden");
        degreeOptionTwo.setAttribute("hidden", true);
        degreeOptionTwoTwo.setAttribute("hidden", true);
        degreeOptionTwoThree.setAttribute("hidden", true);
        collapseDegree.setAttribute("hidden", true);
    }
    else {
        degreeOptionOne.setAttribute("hidden", true);
        degreeOptionTwo.removeAttribute("hidden");
        degreeOptionTwoTwo.removeAttribute("hidden");
        degreeOptionTwoThree.removeAttribute("hidden");
        collapseDegree.removeAttribute("hidden");
    }
}

function updateInversionView() {
    var inversionOption = document.getElementById("inversionType").value;

    var collapseInversion = document.getElementById("collapseInversion");
    var inversionOptionOne = document.getElementById("inversionOptionOne");
    var inversionOptionTwo = document.getElementById("inversionOptionTwo");
    var inversionOptionTwoTwo = document.getElementById("inversionOptionTwoTwo");
    var inversionOptionTwoThree = document.getElementById("inversionOptionTwoThree");

    if (inversionOption == 0 || inversionOption == 1) {
        inversionOptionOne.removeAttribute("hidden");
        inversionOptionTwo.setAttribute("hidden", true);
        inversionOptionTwoTwo.setAttribute("hidden", true);
        inversionOptionTwoThree.setAttribute("hidden", true);
        collapseInversion.setAttribute("hidden", true);
    }
    else {
        inversionOptionOne.setAttribute("hidden", true);
        inversionOptionTwo.removeAttribute("hidden");
        inversionOptionTwoTwo.removeAttribute("hidden");
        inversionOptionTwoThree.removeAttribute("hidden");
        collapseInversion.removeAttribute("hidden");
    }
}

function updateOctaveView() {
    console.log("hey");
    var octaveOption = document.getElementById("octaveType").value;
    console.log(octaveOption);

    var collapseOctave = document.getElementById("collapseOctave");
    var octaveOptionOne = document.getElementById("octaveOptionOne");
    var octaveOptionTwo = document.getElementById("octaveOptionTwo");
    var octaveOptionTwoTwo = document.getElementById("octaveOptionTwoTwo");
    var octaveOptionThree = document.getElementById("octaveOptionThree");
    var octaveOptionFour = document.getElementById("octaveOptionFour");
    var octaveOptionFourTwo = document.getElementById("octaveOptionFourTwo");
    var octaveOptionFourThree = document.getElementById("octaveOptionFourThree");

    if (octaveOption == 0) {
        console.log("one");
        octaveOptionOne.removeAttribute("hidden");
        octaveOptionTwo.setAttribute("hidden", true);
        octaveOptionTwoTwo.setAttribute("hidden", true);
        octaveOptionThree.setAttribute("hidden", true);
        octaveOptionFour.setAttribute("hidden", true);
        octaveOptionFourTwo.setAttribute("hidden", true);
        octaveOptionFourThree.setAttribute("hidden", true);
        collapseOctave.setAttribute("hidden", true);
    }else if (octaveOption == 1) {
        console.log("2");
        octaveOptionOne.setAttribute("hidden", true);
        octaveOptionTwo.removeAttribute("hidden");
        octaveOptionTwoTwo.removeAttribute("hidden", true);
        octaveOptionThree.setAttribute("hidden", true);
        octaveOptionFour.setAttribute("hidden", true);
        octaveOptionFourTwo.setAttribute("hidden", true);
        octaveOptionFourThree.setAttribute("hidden", true);
        collapseOctave.setAttribute("hidden", true);
    }
    else if (octaveOption == 2) {
        console.log("3");
        octaveOptionOne.setAttribute("hidden", true);
        octaveOptionTwo.setAttribute("hidden", true);
        octaveOptionTwoTwo.setAttribute("hidden", true);
        octaveOptionThree.removeAttribute("hidden");
        octaveOptionFour.setAttribute("hidden", true);
        octaveOptionFourTwo.setAttribute("hidden", true);
        octaveOptionFourThree.setAttribute("hidden", true);
        collapseOctave.setAttribute("hidden", true);
    }
    else {
        console.log("4");
        octaveOptionOne.setAttribute("hidden", true);
        octaveOptionTwo.setAttribute("hidden", true);
        octaveOptionTwoTwo.setAttribute("hidden", true);
        octaveOptionThree.setAttribute("hidden", true);
        octaveOptionFour.removeAttribute("hidden");
        octaveOptionFourTwo.removeAttribute("hidden");
        octaveOptionFourThree.removeAttribute("hidden");
        collapseOctave.removeAttribute("hidden");
    }
}

function updateInstrument(type) {
    if (type == "Random") {
        instrumentRandom = document.getElementById("instrumentRandom").value;
        sampler = instrumentRandom;
    } else if (type == "Simple") {
        instrumentSimple = document.getElementById("instrumentSimple").value;
        sampler = instrumentSimple;
    } else {
        instrumentCustom = document.getElementById("instrumentCustom").value;
        sampler = instrumentCustom;
    }

    if (sampler == "samplerGuitar") {
        sampler = samplerGuitar;
    }
    else if (sampler == "samplerPiano") {
        sampler = samplerPiano;
    }
    else if (sampler == "samplerSynth") {
        sampler = samplerSynth;
    }
}

function updateTempo(type) {
    if (type == "Random") {
        tempoRandom = document.getElementById("tempoRandom").value;
        Tone.Transport.bpm.rampTo(tempoRandom, 1);
        bpm = tempoRandom;
    } else if (type == "Simple") {
        tempoSimple = document.getElementById("tempoSimple").value;
        Tone.Transport.bpm.rampTo(tempoSimple, 1);
        bpm = tempoSimple;
    } else {
        tempoCustom = document.getElementById("tempoCustom").value;
        Tone.Transport.bpm.rampTo(tempoCustom, 1);
        bpm = tempoCustom;
    }

    //bpm = document.getElementById("tempo").value;
    //Tone.Transport.bpm = bpm;
    //Tone.Transport.bpm.rampTo(bpm, 1);
    
    //if (isPlay) {
    //    play();
    //}
    //console.log(document.getElementById("tempo").value);
}


function removeChord(counterString) {
    console.log("remove");

    var songCont = document.getElementById("songCont");
    var chordCounter = parseInt(counterString);

    var newCounter = 0;
    console.log("One to Remove: " + counterString);
    for (i = 1; i < counter + 1; i++) {
        //console.log(i);
        if (i != chordCounter) {
            newCounter += 1;
            var chord = document.getElementById("chord" + i);
            chord.id = "chord" + newCounter.toString();

            var newestCounterString = newCounter.toString();

            chord.getElementsByTagName("button")[0].id = "button" + newCounter.toString();
            chord.getElementsByTagName("button")[0].onclick = function() { 
                var number = this.id.split("button").pop();
                playTriad(number); 
            };

            chord.getElementsByTagName("select")[0].id = "key" + newCounter.toString();

            chord.getElementsByTagName("select")[1].id = "degree" + newCounter.toString();

            chord.getElementsByTagName("select")[2].id = "inversion" + newCounter.toString();

            chord.getElementsByTagName("select")[3].id = "octave" + newCounter.toString();

            chord.getElementsByTagName("button")[1].id = "icon" + newCounter.toString();

            chord.getElementsByTagName("button")[2].id = "removeButton" + newCounter.toString();
            //console.log("NewCounter " + newCounter.toString());
            
            chord.getElementsByTagName("button")[2].onclick = function() {
                //console.log(this.id);
                var number = this.id.split("removeButton").pop();
                removeChord(number);
            };
            //console.log("No - NewCounter: " + newCounter.toString() + "| i: " + i.toString());
        }
        else {
            //Nothing
            //console.log("Yes - NewCounter: " + newCounter.toString() + "| i: " + i.toString());
            var chordId = document.getElementById("chord" + counterString);
            chordId.parentNode.removeChild(chordId);
        }
    }
    counter = newCounter;

    selectReset();
}


//song.ppendChild(newButton)

function playTriad(counterString) {
    //console.log("play:" + counterString);

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
        //document.getElementById("playSong").innerHTML = "Play Song";
        document.getElementById("stopButton").setAttribute("hidden", true);
        document.getElementById("playButton").removeAttribute("hidden");
    }
    else {
        play();
        isPlay = true;
        //document.getElementById("playSong").innerHTML = "Stop Song";
        document.getElementById("playButton").setAttribute("hidden", true);
        document.getElementById("stopButton").removeAttribute("hidden");
    }
}

function play() {

    console.log("Play Song");
    Tone.Transport.cancel();
    //Tone.Transport.stop();
    var triadArray = [];

    console.log(selection);
    if (selection == "Random") {
        if (instrumentRandom == "samplerGuitar") {
            sampler = samplerGuitar;
        }
        else if (instrumentRandom == "samplerPiano") {
            sampler = samplerPiano;
        }
        else if (instrumentRandom == "samplerSynth") {
            sampler = samplerSynth;
        }
        bpm = tempoRandom;
    }else if (selection == "Simple") {
        console.log(instrumentSimple);
        if (instrumentSimple == "samplerGuitar") {
            sampler = samplerGuitar;
        }
        else if (instrumentSimple == "samplerPiano") {
            sampler = samplerPiano;
        }
        else if (instrumentSimple == "samplerSynth") {
            sampler = samplerSynth;
        }
        bpm = tempoSimple;
    }else {
        if (instrumentCustom == "samplerGuitar") {
            sampler = samplerGuitar;
        }
        else if (instrumentCustom == "samplerPiano") {
            sampler = samplerPiano;
        }
        else if (instrumentCustom == "samplerSynth") {
            sampler = samplerSynth;
        }
        bpm = tempoCustom;
    }

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
    //console.log(triadArray);

    //var seq = new Tone.Sequence(function(time, triad) {
    //    console.log(triad);
    //    sampler.triggerAttackRelease(triad, "4n");
    //}, triadArray, "4n");

    var chordPart = new Tone.Part(function(time, triad) {
        //console.log(Tone.Transport.progress);
        sampler.triggerAttackRelease(triad, "2n", time);

        for (i = 0; i < counter; i++) {
            var counterString = (i+1);
            var iconId = document.getElementById("icon" + counterString);

            //console.log(Tone.Transport.position);
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
    Tone.Transport.bpm.rampTo(bpm, 1);
    Tone.Transport.start();
}

function stop() {
    Tone.Transport.cancel();
    Tone.Transport.stop();
    console.log("Stop Song");
}

function addChord(key, degree, inversion, octave, defaultBool) {
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

    var newRemoveButton = newChord.getElementsByTagName("button")[2];
    newRemoveButton.id = "removeButton" + counterString;
    newRemoveButton.onclick = function() { 
        removeChord(counterString);
    };

    if (defaultBool) {
        newKey.value = document.getElementById("mainKey").value;
        newDegree.value = 1;
        newInversion.value = 0;
        newOctave.value = 4;
    }
    else {
        newKey.value = key;
        newDegree.value = degree;
        newInversion.value = inversion;
        newOctave.value = octave;
    }

    song.appendChild(newChord);
    newChord.scrollIntoView();

    var playBar = document.getElementById("functionsBar");
    var playBar2 = document.getElementById("functionsBar2");

    if (isScrolledIntoView(playBar) == false) {
        console.log("not in view");
        playBar2.removeAttribute("hidden");
    }
    else {
        playBar2.setAttribute("hidden", true);
    }
    console.log("scroll");
}

//Function to Generate Song
function generateRandomSong() {
    reset();
    var key = mainKeyRandom;
    var chordNumber = chordNumberRandom;

    //Full Random
    for (k = 0; k < chordNumber; k++) {
        var degree = Math.floor(Math.random() * 7) + 1; 
        var inversion = Math.floor(Math.random() * 3);
        var octave = Math.floor(Math.random() * 7) + 1;

        addChord(key, degree, inversion, octave, 0);
    }

    selectReset();
}

function generateSimpleSong() {
    reset();
    var key = mainKeySimple;
    var chordNumber = chordNumberSimple;

    var isGood = 0;
    var array = new Array(chordNumber);
    
    //Attempt to make a song
    while(isGood == 0) {
        
        //Check if Start on One
        if (isStartOneSimple) {
            array[0] = 1;
        }
        else {
            array[0] = Math.floor(Math.random() *7) + 1;
        }

        for (k = 1; k < chordNumber; k++) {
            //Previous Chord was 1
            if (array[k-1] == 1) {
                //Any Chord Can Follow
                array[k] = Math.floor((Math.random() * 6) + 2);
            }
            //Previous Chord was 2 or 4
            else if ((array[k-1] == 2) || (array[k-1] == 4))  {
                var choice = Math.floor((Math.random() * 2))
                if (choice == 0) {
                    array[k] = 5;
                }
                else {
                    array[k] = 7;
                }
            }
            //Previous Chord was 3
            else if (array[k-1] == 3) {
                array[k] = 6;
            }
            //Previous Chord was 5 or 7
            else if ((array[k-1] == 5) || (array[k-1] == 7)) {
                array[k] = 1;
            }
            //Previous Chord was 6
            else if (array[k-1] == 6) {
                var choice = Math.floor((Math.random() * 2))
                if (choice == 0) {
                    array[k] = 2;
                }
                else {
                    array[k] = 4;
                }
            }
            else {
                console.log("Error");
            }
        }

        //onsole.log("IsEnd: " + isEndFiveSimple);

        //Check if end on five or Seven
        if (isEndFiveSimple == false || (array[chordNumber - 1] == 5) || array[chordNumber - 1] == 7) {
            isGood = 1;
        }else {
            setTimeout(nothing,1);
        }
    }
    var inversion = 0;

    for (k = 0; k < chordNumber; k++) {
        //Add Inversions and Octave Stuff

        if (isInversionsSimple) {
            inversion = Math.floor(Math.random() * 3);
        }    

        addChord(key, array[k], inversion, octaveSimple, 0);
    }

    selectReset();
}

function nothing() {

}

function generateCustomSong() {
    console.log("GenerateCustomSong");
    buildArrays();
    //console.log(degreeWeights);
    //console.log(inversionWeights);
    //console.log(octaveWeights);

    reset();
    var key = mainKeyCustom;
    var chordNumber = chordNumberCustom;

    //Simple Pattern
    if (isSimpleCustom) {

        var isGood = 0;
        var array = new Array(chordNumber);

        while(isGood == 0) {
            //Check if Start on One
            if (isStartOneCustom) {
                array[0] = 1;
            }
            else if (document.getElementById("degreeType").value == 0) {
                array[0] = Math.floor(Math.random() * 7) + 1;
            }
            else {
                //Fill in Custom
                var sum = degreeWeights[0] + degreeWeights[1] + degreeWeights[2] + degreeWeights[3] + degreeWeights[4] + degreeWeights[5] + degreeWeights[6];
                //console.log(sum);
                var number = Math.floor(Math.random() * sum) + 1;
                //console.log(number);
                if (number >= 1 && number <= degreeWeights[0]) {
                    array[0] = 1;
                }
                else if (number >= degreeWeights[0] + 1 && number <= degreeWeights[0] + degreeWeights[1]) {
                    array[0] = 2;
                }
                else if (number >= degreeWeights[0] + degreeWeights[1] + 1 && number <= degreeWeights[0] + degreeWeights[1] + degreeWeights[2]) {
                    array[0] = 3;
                }
                else if (number >= degreeWeights[0] + degreeWeights[1] + degreeWeights[2] + 1 && number <= degreeWeights[0] + degreeWeights[1] + degreeWeights[2] + degreeWeights[3]) {
                    array[0] = 4;
                }
                else if (number >= degreeWeights[0] + degreeWeights[1] + degreeWeights[2] + degreeWeights[3] + 1 && number <= degreeWeights[0] + degreeWeights[1] + degreeWeights[2] + degreeWeights[3] + degreeWeights[4]) {
                    array[0] = 5;
                }
                else if (number >= degreeWeights[0] + degreeWeights[1] + degreeWeights[2] + degreeWeights[3] + degreeWeights[4] + 1 && number <= degreeWeights[0] + degreeWeights[1] + degreeWeights[2] + degreeWeights[3] + degreeWeights[4] + degreeWeights[5]) {
                    array[0] = 6;
                }
                else {
                    array[0] = 7;
                }
            }

            for (k = 1; k < chordNumber; k++) {
                //Previous Chord was 1
                if (array[k-1] == 1) {
                    //Any Chord Can Follow

                    if (document.getElementById("degreeType").value == 0) {
                        array[k] = Math.floor((Math.random() * 6) + 2);
                    }
                    else {
                        var sum = degreeWeights[1] + degreeWeights[2] + degreeWeights[3] + degreeWeights[4] + degreeWeights[5] + degreeWeights[6];
                        
                        console.log(sum);
                        var number = Math.floor(Math.random() * sum) + 1;
                        console.log(number);
                        if (number >= 1 && number <= degreeWeights[1]) {
                            array[k] = 2;
                        }
                        else if (number >= degreeWeights[1] + 1 && number <= degreeWeights[1] + degreeWeights[2]) {
                            array[k] = 3;
                        }
                        else if (number >= degreeWeights[1] + degreeWeights[2] + 1 && number <= degreeWeights[1] + degreeWeights[2] + degreeWeights[3]) {
                            array[k] = 4;
                        }
                        else if (number >= degreeWeights[1] + degreeWeights[2] + degreeWeights[3] + 1 && number <= degreeWeights[1] + degreeWeights[2] + degreeWeights[3] + degreeWeights[4]) {
                            array[k] = 5;
                        }
                        else if (number >= degreeWeights[1] + degreeWeights[2] + degreeWeights[3] + degreeWeights[4] + 1 && number <= degreeWeights[1] + degreeWeights[2] + degreeWeights[3] + degreeWeights[4] + degreeWeights[5]) {
                            array[k] = 6;
                        }
                        else if (number >= degreeWeights[1] + degreeWeights[2] + degreeWeights[3] + degreeWeights[4] + degreeWeights[5] + 1 && number <= degreeWeights[1] + degreeWeights[2] + degreeWeights[3] + degreeWeights[4] + degreeWeights[5] + degreeWeights[6]) {
                            array[k] = 7;
                        }
                        else {
                            console.log("error");
                        }
                    }
                }
                //Previous Chord was 2 or 4
                else if ((array[k-1] == 2) || (array[k-1] == 4))  {
                    if (document.getElementById("degreeType").value == 0) {
                        var choice = Math.floor((Math.random() * 2));
                        if (choice == 0) {
                            array[k] = 5;
                        }
                        else {
                            array[k] = 7;
                        }
                    }
                    else {
                        var sum = degreeWeights[4] + degreeWeights[6];
                        var number = Math.floor(Math.random() * sum) + 1;
                        if (number >= 1 && number <= degreeWeights[4]) {
                            array[k] = 5;
                        }
                        else {
                            array[k] = 7;
                        }
                    }
                }
                //Previous Chord was 3
                else if (array[k-1] == 3) {
                    array[k] = 6;
                }
                //Previous Chord was 5 or 7
                else if ((array[k-1] == 5) || (array[k-1] == 7)) {
                    array[k] = 1;
                }
                //Previous Chord was 6
                else if (array[k-1] == 6) {
                    if (document.getElementById("degreeType").value == 0) {
                        var choice = Math.floor((Math.random() * 2))
                        if (choice == 0) {
                            array[k] = 2;
                        }
                        else {
                            array[k] = 4;
                        }
                    }
                    else {
                        var sum = degreeWeights[1] + degreeWeights[3];
                        var number = Math.floor(Math.random() * sum) + 1;
                        if (number >= 1 && number <= degreeWeights[1]) {
                            array[k] = 2;
                        }
                        else {
                            array[k] = 4;
                        }
                    }
                }
                else {
                    console.log("Error");
                }
            }

            if (isEndFiveCustom == false || (array[chordNumber - 1] == 5) || array[chordNumber - 1] == 7) {
                isGood = 1;
            }else {
                setTimeout(nothing,1);
            }
        }

        for (k = 0; k < chordNumber; k++) {
            //None
            if (document.getElementById("inversionType").value == 0) {
                inversion = 0;
            }//Full Random
            else if (document.getElementById("inversionType").value == 1) {
                inversion = Math.floor(Math.random() * 3);
            }//Custom Random
            else {
                var sum = inversionWeights[0] + inversionWeights[1] + inversionWeights[2];
                var number = Math.floor(Math.random() * sum) + 1;

                if (number >= 1 && number <= inversionWeights[0]) {
                    inversion = 0;
                }
                else if (number >= inversionWeights[0] + 1 && number <= inversionWeights[0] + inversionWeights[1]) {
                    inversion = 1;
                }
                else {
                    inversion = 2;
                }
            }

            //Static
            if (document.getElementById("octaveType").value == 0) {
                octave = document.getElementById("static_range_weight").value;
            }//Threshold
            else if (document.getElementById("octaveType").value == 1) {
                var min = parseInt(document.getElementById("octaveMin").value, 10);
                var max = parseInt(document.getElementById("octaveMax").value, 10);

                octave = Math.floor(Math.random() * (max - min + 1)+ min);
            }//Full Random
            else if (document.getElementById("octaveType").value == 2) {
                octave = Math.floor(Math.random() * 7) + 1;
            }//Custom Random
            else {
                var sum = octaveWeights[0] + octaveWeights[1] + octaveWeights[2] + octaveWeights[3] + octaveWeights[4] + octaveWeights[5] + octaveWeights[6];
                var number = Math.floor(Math.random() * sum) + 1;
                
                if (number >= 1 && number <= octaveWeights[0]) {
                    octave = 1;
                }
                else if (number >= octaveWeights[0] + 1 && number <= octaveWeights[0] + octaveWeights[1]) {
                    octave = 2;
                }
                else if (number >= octaveWeights[0] + octaveWeights[1] + 1 && number <= octaveWeights[0] + octaveWeights[1] + octaveWeights[2]) {
                    octave = 3;
                }
                else if (number >= octaveWeights[0] + octaveWeights[1] + octaveWeights[2] + 1 && number <= octaveWeights[0] + octaveWeights[1] + octaveWeights[2] + octaveWeights[3]) {
                    octave = 4;
                }
                else if (number >= octaveWeights[0] + octaveWeights[1] +octaveWeights[2] + octaveWeights[3] + 1 && number <= octaveWeights[0] + octaveWeights[1] + octaveWeights[2] + octaveWeights[3] + octaveWeights[4]) {
                    octave = 5;
                }
                else if (number >= octaveWeights[0] + octaveWeights[1] + octaveWeights[2] + octaveWeights[3] + octaveWeights[4] + 1 && number <= octaveWeights[0] + octaveWeights[1] + octaveWeights[2] + octaveWeights[3] + octaveWeights[4] + octaveWeights[5]) {
                    octave = 6;
                }
                else {
                    octave = 7;
                }
            }

            addChord(key, array[k], inversion, octave, 0);
        }
    } //Custom Pattern
    else {
        for (k = 0; k < chordNumber; k++) {
            var degree = 4;
            var inversion = 0;
            var octave = 4;
            
            //Random Degrees
            if (document.getElementById("degreeType").value == 0) {
                degree = Math.floor(Math.random() * 7) + 1;
            }//Custom Degrees
            else {
                var sum = degreeWeights[0] + degreeWeights[1] + degreeWeights[2] + degreeWeights[3] + degreeWeights[4] + degreeWeights[5] + degreeWeights[6];
                console.log(sum);
                var number = Math.floor(Math.random() * sum) + 1;
                console.log(number);
                if (number >= 1 && number <= degreeWeights[0]) {
                    degree = 1;
                }
                else if (number >= degreeWeights[0] + 1 && number <= degreeWeights[0] + degreeWeights[1]) {
                    degree = 2;
                }
                else if (number >= degreeWeights[0] + degreeWeights[1] + 1 && number <= degreeWeights[0] + degreeWeights[1] + degreeWeights[2]) {
                    degree = 3;
                }
                else if (number >= degreeWeights[0] + degreeWeights[1] + degreeWeights[2] + 1 && number <= degreeWeights[0] + degreeWeights[1] + degreeWeights[2] + degreeWeights[3]) {
                    degree = 4;
                }
                else if (number >= degreeWeights[0] + degreeWeights[1] + degreeWeights[2] + degreeWeights[3] + 1 && number <= degreeWeights[0] + degreeWeights[1] + degreeWeights[2] + degreeWeights[3] + degreeWeights[4]) {
                    degree = 5;
                }
                else if (number >= degreeWeights[0] + degreeWeights[1] + degreeWeights[2] + degreeWeights[3] + degreeWeights[4] + 1 && number <= degreeWeights[0] + degreeWeights[1] + degreeWeights[2] + degreeWeights[3] + degreeWeights[4] + degreeWeights[5]) {
                    degree = 6;
                }
                else {
                    degree = 7;
                }
            }

            //None
            if (document.getElementById("inversionType").value == 0) {
                inversion = 0;
            }//Full Random
            else if (document.getElementById("inversionType").value == 1) {
                inversion = Math.floor(Math.random() * 3);
            }//Custom Random
            else {
                var sum = inversionWeights[0] + inversionWeights[1] + inversionWeights[2];
                var number = Math.floor(Math.random() * sum) + 1;

                if (number >= 1 && number <= inversionWeights[0]) {
                    inversion = 0;
                }
                else if (number >= inversionWeights[0] + 1 && number <= inversionWeights[0] + inversionWeights[1]) {
                    inversion = 1;
                }
                else {
                    inversion = 2;
                }
            }

            //Static
            if (document.getElementById("octaveType").value == 0) {
                octave = document.getElementById("static_range_weight").value;
            }//Threshold
            else if (document.getElementById("octaveType").value == 1) {
                var min = parseInt(document.getElementById("octaveMin").value, 10);
                var max = parseInt(document.getElementById("octaveMax").value, 10);

                octave = Math.floor(Math.random() * (max - min + 1)+ min);
            }//Full Random
            else if (document.getElementById("octaveType").value == 2) {
                octave = Math.floor(Math.random() * 7) + 1;
            }//Custom Random
            else {
                var sum = octaveWeights[0] + octaveWeights[1] + octaveWeights[2] + octaveWeights[3] + octaveWeights[4] + octaveWeights[5] + octaveWeights[6];
                var number = Math.floor(Math.random() * sum) + 1;
                
                if (number >= 1 && number <= octaveWeights[0]) {
                    octave = 1;
                }
                else if (number >= octaveWeights[0] + 1 && number <= octaveWeights[0] + octaveWeights[1]) {
                    octave = 2;
                }
                else if (number >= octaveWeights[0] + octaveWeights[1] + 1 && number <= octaveWeights[0] + octaveWeights[1] + octaveWeights[2]) {
                    octave = 3;
                }
                else if (number >= octaveWeights[0] + octaveWeights[1] + octaveWeights[2] + 1 && number <= octaveWeights[0] + octaveWeights[1] + octaveWeights[2] + octaveWeights[3]) {
                    octave = 4;
                }
                else if (number >= octaveWeights[0] + octaveWeights[1] +octaveWeights[2] + octaveWeights[3] + 1 && number <= octaveWeights[0] + octaveWeights[1] + octaveWeights[2] + octaveWeights[3] + octaveWeights[4]) {
                    octave = 5;
                }
                else if (number >= octaveWeights[0] + octaveWeights[1] + octaveWeights[2] + octaveWeights[3] + octaveWeights[4] + 1 && number <= octaveWeights[0] + octaveWeights[1] + octaveWeights[2] + octaveWeights[3] + octaveWeights[4] + octaveWeights[5]) {
                    octave = 6;
                }
                else {
                    octave = 7;
                }
            }

            console.log(key, degree, inversion, octave);
            addChord(key, degree, inversion, octave, 0);
        }
    }

    selectReset();
}

function buildArrays() {
    degreeWeights[0] = parseInt(document.getElementById("one_degree_range_disp").value,10);
    degreeWeights[1] = parseInt(document.getElementById("two_degree_range_disp").value,10);
    degreeWeights[2] = parseInt(document.getElementById("three_degree_range_disp").value,10);
    degreeWeights[3] = parseInt(document.getElementById("four_degree_range_disp").value,10);
    degreeWeights[4] = parseInt(document.getElementById("five_degree_range_disp").value,10);
    degreeWeights[5] = parseInt(document.getElementById("six_degree_range_disp").value,10);
    degreeWeights[6] = parseInt(document.getElementById("seven_degree_range_disp").value,10);

    inversionWeights[0] = parseInt(document.getElementById("one_inversion_range_disp").value,10);
    inversionWeights[1] = parseInt(document.getElementById("two_inversion_range_disp").value,10);
    inversionWeights[2] = parseInt(document.getElementById("three_inversion_range_disp").value,10);

    octaveWeights[0] = parseInt(document.getElementById("one_octave_range_disp").value,10);
    octaveWeights[1] = parseInt(document.getElementById("two_octave_range_disp").value,10);
    octaveWeights[2] = parseInt(document.getElementById("three_octave_range_disp").value,10);
    octaveWeights[3] = parseInt(document.getElementById("four_octave_range_disp").value,10);
    octaveWeights[4] = parseInt(document.getElementById("five_octave_range_disp").value,10);
    octaveWeights[5] = parseInt(document.getElementById("six_octave_range_disp").value,10);
    octaveWeights[6] = parseInt(document.getElementById("seven_octave_range_disp").value,10);
}

function reset() {
    for (i = 1; i < counter + 1; i++) {
        var chordId = document.getElementById("chord" + i.toString());
        chordId.parentNode.removeChild(chordId);
    }
    counter = 0;

    if (isPlay) {
        playSong();
    }

    //document.getElementById("chordNumber").value = 4;

    //document.getElementById("mainKey").value = "C";

    //bpm = 120;
    //Tone.Transport.bpm.rampTo(bpm,1);
    //document.getElementById("tempo").value = bpm;
    var playBar2 = document.getElementById("functionsBar2");
    playBar2.setAttribute("hidden", true);
}

function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
}

function resetWeightDegree() {
    for (i = 0; i < degreeWeights.length; i++) {
        degreeWeights[i] = 50;
    }
    document.getElementById("one_degree_range").value = 50;
    document.getElementById("two_degree_range").value = 50;
    document.getElementById("three_degree_range").value = 50;
    document.getElementById("four_degree_range").value = 50;
    document.getElementById("five_degree_range").value = 50;
    document.getElementById("six_degree_range").value = 50;
    document.getElementById("seven_degree_range").value = 50;

    document.getElementById("one_degree_range_disp").value = 50;
    document.getElementById("two_degree_range_disp").value = 50;
    document.getElementById("three_degree_range_disp").value = 50;
    document.getElementById("four_degree_range_disp").value = 50;
    document.getElementById("five_degree_range_disp").value = 50;
    document.getElementById("six_degree_range_disp").value = 50;
    document.getElementById("seven_degree_range_disp").value = 50;
}

function resetWeightInversion() {
    for (i = 0; i < inversionWeights.length; i++) {
        inversionWeights[i] = 50;
    }

    document.getElementById("one_inversion_range").value = 50;
    document.getElementById("two_inversion_range").value = 50;
    document.getElementById("three_inversion_range").value = 50;

    document.getElementById("one_inversion_range_disp").value = 50;
    document.getElementById("two_inversion_range_disp").value = 50;
    document.getElementById("three_inversion_range_disp").value = 50;
}

function resetWeightOctave() {
    for (i = 0; i < octaveWeights.length; i++) {
        octaveWeights[i] = 50;
    }
    document.getElementById("one_octave_range").value = 50;
    document.getElementById("two_octave_range").value = 50;
    document.getElementById("three_octave_range").value = 50;
    document.getElementById("four_octave_range").value = 50;
    document.getElementById("five_octave_range").value = 50;
    document.getElementById("six_octave_range").value = 50;
    document.getElementById("seven_octave_range").value = 50;

    document.getElementById("one_octave_range_disp").value = 50;
    document.getElementById("two_octave_range_disp").value = 50;
    document.getElementById("three_octave_range_disp").value = 50;
    document.getElementById("four_octave_range_disp").value = 50;
    document.getElementById("five_octave_range_disp").value = 50;
    document.getElementById("six_octave_range_disp").value = 50;
    document.getElementById("seven_octave_range_disp").value = 50;
}