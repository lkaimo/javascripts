function randomizeAvatar() {
    // Array of possible values for each customization option
    const genderOptions = ["boy", "girl"];
    
    const eyebrowOptions = ["variant01", "variant02", "variant03", "variant04", "variant05", "variant06", "variant07", "variant08", "variant09", "variant10", "variant11", "variant12", "variant13"];
    // Include a wide range of random colors for hair
    const eyebrowColorOptions = Array.from({ length: 100 }, () => getRandomHexColor());

    const eyesOptions = ["variant01", "variant02", "variant03", "variant04", "variant05", "variant06", "variant07", "variant08", "variant09", "variant10", "variant11", "variant12", "variant13",
        "variant14", "variant15", "variant16", "variant17", "variant18", "variant19", "variant20", "variant21", "variant22", "variant23", "variant24"];
    const eyesColorOptions = Array.from({ length: 100 }, () => getRandomHexColor());
        
    const hairOptions = ["variant01", "variant02", "variant03", "variant04", "variant05", "variant06", "variant07", "variant08", "variant09", "variant10", "variant11", "variant12", "variant13",
        "variant14", "variant15", "variant16", "variant17", "variant18", "variant19", "variant20", "variant21", "variant22", "variant23", "variant24",
        "variant25", "variant26", "variant27", "variant28", "variant29", "variant30", "variant31", "variant32", "variant33", "variant34", "variant35",
        "variant36", "variant37", "variant38", "variant39", "variant40", "variant41", "variant42", "variant43", "variant44", "variant45", "variant46",
        "variant47", "variant48"];

    const hairColorOptions = Array.from({ length: 100 }, () => getRandomHexColor());
    const hairAccessoriesCheckbox = Math.random() < 0.5 ? 0 : 1;
    const hairAccessoriesColorOptions = Array.from({ length: 100 }, () => getRandomHexColor());

    const glassesCheckbox = Math.random() < 0.5 ? 0 : 1;
    const glaessesOptions = ["variant01", "variant02", "variant03", "variant04", "variant05"];
    const glasessColorOptions = Array.from({ length: 100 }, () => getRandomHexColor());

    const frecklesCheckbox = Math.random() < 0.5 ? 0 : 1;
    const frecklesColorOptions = Array.from({ length: 100 }, () => getRandomHexColor());

    const earringsCheckbox = Math.random() < 0.5 ? 0 : 1;
    const earringsOptions = ["variant01", "variant02", "variant03"];
    const earringsColorOptions = Array.from({ length: 100 }, () => getRandomHexColor());

    const noseOptions = ["variant01", "variant02", "variant03", "variant04", "variant05", "variant06"];
    const noseColorOptions = Array.from({ length: 100 }, () => getRandomHexColor());

    const mouthOptions = ["happy01", "happy02", "happy03", "happy04", "happy05", "happy06", "happy07", "happy08", "happy09", "happy10", "happy11", "happy12", "happy13",
    "happy14", "happy15", "happy16", "happy17", "happy18", "sad01", "sad02", "sad03", "sad04", "sad05", "sad06", "sad07", "sad08", "sad09"];
    const mouthColorOptions = Array.from({ length: 100 }, () => getRandomHexColor());

    const headOptions = ["variant01", "variant02", "variant03", "variant04"];

    const beardCheckbox = Math.random() < 0.5 ? 0 : 1;
    const beardOptions = ["variant01", "variant02"];

    const skinColorOptions = Array.from({ length: 100 }, () => getRandomHexColor());

    const backgroundColorOptions = Array.from({ length: 100 }, () => getRandomHexColor());

    // Repeat this for other customization options

    // Set random values for each customization option
    document.getElementById("gender").value = getRandomValue(genderOptions);

    document.getElementById("eyebrow").value = getRandomValue(eyebrowOptions);
    document.getElementById("eyebrowColor").value = getRandomValue(eyebrowColorOptions);

    document.getElementById("eyes").value = getRandomValue(eyesOptions);
    document.getElementById("eyesColor").value = getRandomValue(eyesColorOptions);

    document.getElementById("hair").value = getRandomValue(hairOptions);
    document.getElementById("hairColor").value = getRandomValue(hairColorOptions);
    document.getElementById("hairAccessoriesCheckbox").checked = hairAccessoriesCheckbox;
    document.getElementById("hairAccessoriesColor").value = getRandomValue(hairAccessoriesColorOptions);
    
    document.getElementById("glassesCheckbox").checked = glassesCheckbox;
    document.getElementById("glasses").value = getRandomValue(glaessesOptions);
    document.getElementById("glassesColor").value = getRandomValue(glasessColorOptions);

    document.getElementById("frecklesCheckbox").checked = frecklesCheckbox;
    document.getElementById("frecklesColor").value = getRandomValue(frecklesColorOptions);
    
    document.getElementById("earringsCheckbox").checked = earringsCheckbox;
    document.getElementById("earrings").value = getRandomValue(earringsOptions);
    document.getElementById("earringsColor").value = getRandomValue(earringsColorOptions);

    document.getElementById("nose").value = getRandomValue(noseOptions);
    document.getElementById("noseColor").value = getRandomValue(noseColorOptions);

    document.getElementById("mouth").value = getRandomValue(mouthOptions);
    document.getElementById("mouthColor").value = getRandomValue(mouthColorOptions);

    document.getElementById("head").value = getRandomValue(headOptions);
    
    document.getElementById("beardCheckbox").checked = beardCheckbox;
    document.getElementById("beard").value = getRandomValue(beardOptions);

    document.getElementById("skinColor").value = getRandomValue(skinColorOptions);

    document.getElementById("backgroundColor").value = getRandomValue(backgroundColorOptions);

    // Repeat this for other customization options

    // Trigger avatar generation with the new random values
    generateAvatar();
}

function getRandomHexColor() {
    return '#' + (Math.random().toString(16) + '000000').slice(2, 8).toUpperCase();
}

function getRandomValue(options) {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}

