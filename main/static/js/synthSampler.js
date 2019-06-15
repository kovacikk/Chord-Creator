var samplerSynth = new Tone.Sampler({
    "C2" : leadSynth + "/C2.wav",
    "C3" : leadSynth + "/C3.wav",
    "C4" : leadSynth + "/C4.wav",
    "C5" : leadSynth + "/C5.wav",
    "C6" : leadSynth + "/C6.wav",
    "C7" : leadSynth + "/C7.wav",
    "E1" : leadSynth + "/E1.wav",
    "E2" : leadSynth + "/E2.wav",
    "E3" : leadSynth + "/E3.wav",
    "E4" : leadSynth + "/E4.wav",
    "E5" : leadSynth + "/E5.wav",
    "E6" : leadSynth + "/E6.wav",
    "E7" : leadSynth + "/E7.wav",
}, {
   'release' : '10',
   'attack' : '0',
}).toMaster();

samplerSynth.volume.value = -10;