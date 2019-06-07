function convertToNumber(note) {
    if (note == "Ab") {
        return 0;
    }else if (note == "A") {
        return 1;
    }else if (note == "Bb") {
        return 2;
    }else if (note == "B") {
        return 3;
    }else if (note == "C") {
        return 4;
    }else if (note == "Db") {
        return 5;
    }else if (note == "D") {
        return 6;
    }else if (note == "Eb") {
        return 7;
    }else if (note == "E") {
        return 8;
    }else if (note == "F") {
        return 9;
    }else if (note == "Gb") {
        return 10;
    }else if (note == "G") {
        return 11;
    }else {
        return -1;
    }
}

function convertToLetter(note) {
    if (note == 0) {
        return "Ab";
    }else if (note == 1) {
        return "A";
    }else if (note == 2) {
        return "Bb";
    }else if (note == 3) {
        return "B";
    }else if (note == 4) {
        return "C";
    }else if (note == 5) {
        return "Db";
    }else if (note == 6) {
        return "D";
    }else if (note == 7) {
        return "Eb";
    }else if (note == 8) {
        return "E";
    }else if (note == 9) {
        return "F";
    }else if (note == 10) {
        return "Gb";
    }else if (note == 11) {
        return "G";
    }else {
        return -1;
    }
}

function getTriads(key, degree) {
    var key = convertToNumber(key);
    var array = [];

    //console.log(degree);

    if (degree == 1) {
        array = [(key) % 12, (key + 4) % 12, (key + 7) % 12];
    }else if (degree == 2) {
        array = [(key + 2) % 12, (key + 5) % 12, (key + 9) % 12];
    }else if (degree == 3) {
        array = [(key + 4) % 12, (key + 7) % 12, (key + 11) % 12];
    }else if (degree == 4) {
        array = [(key + 5) % 12, (key + 9) % 12, (key) % 12];
    }else if (degree == 5) {
        array = [(key + 7) % 12, (key + 11) % 12, (key + 2) % 12];
    }else if (degree == 6) {
        array = [(key + 9) % 12, (key) % 12, (key + 4) % 12];
    }else if (degree == 7) {
        array = [(key + 11) % 12, (key + 2) % 12, (key + 5) % 12];
    }

    for (i=0; i < 3; i++) {
        array[i] = convertToLetter(array[i]);
    } 

    return array;
}

function inversionNumbers(triad, bassNumber, inversions) {
    bassNumber = parseInt(bassNumber);

    if (inversions == 0) {
        first = convertToNumber(triad[0]);

        triad[0] = triad[0] + bassNumber.toString();
        var pointer = (first + 1) % 12
    
        while (pointer != first) {
            //console.log(pointer);
            if (pointer == 4) {
                bassNumber += 1;
            }
            if (pointer == convertToNumber(triad[1])) {
                triad[1] = triad[1] + bassNumber.toString();
            }
            else if (pointer == convertToNumber(triad[2])) {
                triad[2] = triad[2] + bassNumber.toString();
            }

            pointer = (pointer + 1) % 12;
        }
    }
    else if (inversions == 1) {
        bass = convertToNumber(triad[1]);

        triad[1] = triad[1] + bassNumber.toString();
        var pointer = (bass + 1) % 12

        while (pointer != bass) {
            //console.log(pointer);
            if (pointer == 4) {
                bassNumber += 1;
            }
            if (pointer == convertToNumber(triad[0])) {
                triad[0] = triad[0] + bassNumber.toString();
            }
            else if (pointer == convertToNumber(triad[2])) {
                triad[2] = triad[2] + bassNumber.toString();
            }

            pointer = (pointer + 1) % 12;
        }
    }
    else {
        bass = convertToNumber(triad[2]);

        triad[2] = triad[2] + bassNumber.toString();
        var pointer = (bass + 1) % 12

        while (pointer != bass) {
            //console.log(pointer);
            if (pointer == 4) {
                bassNumber += 1;
            }
            if (pointer == convertToNumber(triad[0])) {
                triad[0] = triad[0] + bassNumber.toString();
            }
            else if (pointer == convertToNumber(triad[1])) {
                triad[1] = triad[1] + bassNumber.toString();
            }

            pointer = (pointer + 1) % 12;
        }
    }

    return triad;
}