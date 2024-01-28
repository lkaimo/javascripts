function generateAvatar() {
    const gender = document.getElementById("gender").value;
    const eyebrowVariant = document.getElementById("eyebrow").value;
    const eyebrowColor = document.getElementById("eyebrowColor").value.substr(1); // Remove the '#' from the color code
    const eyesVariant = document.getElementById("eyes").value;
    const eyesColor = document.getElementById("eyesColor").value.substr(1); // Remove the '#' from the color code
    const hairVariant = document.getElementById("hair").value;
    const hairColor = document.getElementById("hairColor").value.substr(1); // Remove the '#' from the color code
    const hairAccessoriesCheckbox = document.getElementById("hairAccessoriesCheckbox").checked ? 100 : 0;
    const hairAccessoriesColorInput = document.getElementById("hairAccessoriesColor").value.substr(1); // Remove the '#' from the color
    const glassesProbability = document.getElementById("glassesCheckbox").checked ? 100 : 0;
    const glassesVariant = document.getElementById("glasses").value;
    const glassesColor = document.getElementById("glassesColor").value.substr(1); // Remove the '#' from the color code
    const frecklesCheckbox = document.getElementById("frecklesCheckbox").checked ? 100 : 0;
    const frecklesColorInput = document.getElementById("frecklesColor").value.substr(1); // Remove the '#' from the color code
    const beardProbability = document.getElementById("beardCheckbox").checked ? 100 : 0;
    const beardVariant = document.getElementById("beard").value;
    const earringsProbability = document.getElementById("earringsCheckbox").checked ? 100 : 0;
    const earringsVariant = document.getElementById("earrings").value;
    const earringsColor = document.getElementById("earringsColor").value.substr(1); // Remove the '#' from the color code
    const noseVariant = document.getElementById("nose").value;
    const noseColor = document.getElementById("noseColor").value.substr(1); // Remove the '#' from the color code
    const mouthVariant = document.getElementById("mouth").value;
    const mouthColor = document.getElementById("mouthColor").value.substr(1); // Remove the '#' from the color code
    const headVariant = document.getElementById("head").value;
    const skinColor = document.getElementById("skinColor").value.substr(1); // Remove the '#' from the color code
    const backgroundColor = document.getElementById("backgroundColor").value.substr(1); // Remove the '#' from the color code

    const seed = (gender === "boy") ? "Felix" : "aneka";
    const avatarContainer = document.getElementById("avatar-container");
    avatarContainer.innerHTML = "";

    const avatarImage = document.createElement("img");
    avatarImage.src = `https://api.dicebear.com/7.x/lorelei/svg?seed=${seed}&eyebrows=${eyebrowVariant}&eyebrowsColor=${eyebrowColor}&eyes=${eyesVariant}&eyesColor=${eyesColor}&hair=${hairVariant}&hairColor=${hairColor}&glassesProbability=${glassesProbability}&glasses=${glassesVariant}&glassesColor=${glassesColor}&beardProbability=${beardProbability}&beard=${beardVariant}&earringsProbability=${earringsProbability}&hairAccessoriesProbability=${hairAccessoriesCheckbox}&hairAccessoriesColor=${hairAccessoriesColorInput}&frecklesProbability=${frecklesCheckbox}&frecklesColor=${frecklesColorInput}&earrings=${earringsVariant}&earringsColor=${earringsColor}&nose=${noseVariant}&noseColor=${noseColor}&mouth=${mouthVariant}&mouthColor=${mouthColor}&head=${headVariant}&skinColor=${skinColor}&backgroundColor=${backgroundColor}`;
    avatarContainer.appendChild(avatarImage);
}

function handleGlassesChange() {
    const glassesCheckbox = document.getElementById("glassesCheckbox");
    const glassesSelect = document.getElementById("glasses");
    const glassesColor = document.getElementById("glassesColor");
    
    if (glassesCheckbox.checked) {
        // If the user wants glasses, enable the glasses selection
        glassesSelect.disabled = false;
        glassesColor.disabled = false;
    } else {
        // If the user doesn't want glasses, disable and reset the glasses selection
        glassesSelect.disabled = true;
        glassesColor.disabled = true;
        glassesSelect.value = "variant01"; // You can set a default value or choose not to set any
        glassesColor.value = "#000000"; // You can set a default value or choose not to set any
    }

    generateAvatar(); // Regenerate avatar based on the new glasses selection
}

function handleHairAccessoriesChange() {
    const hairAccessoriesCheckbox = document.getElementById("hairAccessoriesCheckbox");
    const hairAccessoriesColorInput = document.getElementById("hairAccessoriesColor");
    
    if (hairAccessoriesCheckbox.checked) {
        // If the user wants glasses, enable the glasses selection
        hairAccessoriesColorInput.disabled = false;
    } else {
        // If the user doesn't want glasses, disable and reset the glasses selection
        hairAccessoriesColorInput.disabled = true;
        hairAccessoriesColorInput.value = "#000000"; // You can set a default value or choose not to set any
    }

    generateAvatar(); // Regenerate avatar based on the new freckles checkbox state
}

function handleFrecklesChange() {
    const frecklesCheckbox = document.getElementById("frecklesCheckbox");
    const frecklesColorInput = document.getElementById("frecklesColor");
    
    if (frecklesCheckbox.checked) {
        // If the user wants glasses, enable the glasses selection
        frecklesColorInput.disabled = false;
    } else {
        // If the user doesn't want glasses, disable and reset the glasses selection
        frecklesColorInput.disabled = true;
        frecklesColorInput.value = "#000000"; // You can set a default value or choose not to set any
    }

    generateAvatar(); // Regenerate avatar based on the new freckles checkbox state
}
function handleBeardChange() {
    const beardCheckbox = document.getElementById("beardCheckbox");
    const beardSelect = document.getElementById("beard");
    
    if (beardCheckbox.checked) {
        // If the user wants beard, enable the beard selection
        beardSelect.disabled = false;
    } else {
        // If the user doesn't want beard, disable and reset the beard selection
        beardSelect.disabled = true;
        beardSelect.value = "variant01"; // You can set a default value or choose not to set any
    }

    generateAvatar(); // Regenerate avatar based on the new glasses selection
}

function handleEarringsChange() {
    const earringsCheckbox = document.getElementById("earringsCheckbox");
    const earringsSelect = document.getElementById("earrings");
    const earringsColor = document.getElementById("earringsColor");
    
    if (earringsCheckbox.checked) {
        // If the user wants glasses, enable the glasses selection
        earringsSelect.disabled = false;
        earringsColor.disabled = false;
    } else {
        // If the user doesn't want glasses, disable and reset the glasses selection
        earringsSelect.disabled = true;
        earringsColor.disabled = true;
        earringsSelect.value = "variant01"; // You can set a default value or choose not to set any
        earringsColor.value = "#000000"; // You can set a default value or choose not to set any
    }

    generateAvatar(); // Regenerate avatar based on the new glasses selection
}

function saveImage() {
    const avatarImage = document.querySelector("#avatar-container img");

    // Check if an avatar image is present
    if (avatarImage) {
        // Open a new tab with the image
        window.open(avatarImage.src, '_blank');
    } else {
        // Inform the user that there is no image to save
        alert("Generate an avatar before saving.");
    }
}

// Initial generation on page load
generateAvatar();
