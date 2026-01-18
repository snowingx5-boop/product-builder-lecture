const fs = require('fs');
const path = require('path');

// Function to convert Korean name to a slug for filename (needed for consistency, though not directly used for prompt)
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\uAC00-\uD7A3a-z0-9-]/g, '') // Keep Korean, lowercase alphanumeric, and hyphens
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-');
}

const mainJsContent = fs.readFileSync('./main.js', 'utf8');

const startMarker = 'const initialSouvenirs = [';
const endMarker = '];';

const startIndex = mainJsContent.indexOf(startMarker);
const endIndex = mainJsContent.indexOf(endMarker, startIndex);

let jsonLikeString = '';
if (startIndex !== -1 && endIndex !== -1) {
  // Extract the array string including its brackets
  jsonLikeString = mainJsContent.substring(
    mainJsContent.indexOf('[', startIndex), // Find the actual opening bracket
    endIndex + 1 // Include the closing bracket
  );
} else {
    console.error('Could not find initialSouvenirs array in main.js.');
    process.exit(1);
}

let initialSouvenirs;
try {
  initialSouvenirs = eval(jsonLikeString);
} catch (e) {
  console.error('Error parsing initialSouvenirs array from main.js:', e);
  process.exit(1);
}

const promptModifiers = {
    "식품": "on a wooden table, with natural lighting, focus on deliciousness, appetizing",
    "화장품": "elegant packaging, on a vanity, luxurious, smooth texture",
    "의류": "worn by a model, fashion photography, well-styled, on a mannequin",
    "전통 상품": "in a traditional Korean setting, handcrafted, intricate details, cultural significance",
    "K-POP 굿즈": "fan merchandise, vibrant colors, pop culture aesthetic, idol related"
};

const skipList = ["김치", "고추장", "된장", "쌈장"];

initialSouvenirs.forEach(souvenir => {
    const koName = souvenir.name.ko;
    const descriptionEn = souvenir.description.en; // Use English description
    const category = souvenir.category;

    // Skip items in the skipList
    if (skipList.includes(koName)) {
        console.log("--- Skipping prompt generation for \"" + koName + "\" as it's in the skip list ---");
        return;
    }

    let specificModifier = promptModifiers[category] || '';
    if (specificModifier) {
        specificModifier = ", " + specificModifier;
    }

    // Construct the prompt without "(Korean souvenir)" and using English description
    let finalPrompt = "high resolution photo of " + koName + ", " + descriptionEn + specificModifier + ", studio quality, 400x400, clear background, product photography";

    console.log("--- " + koName + " (" + category + ") ---");
    console.log(finalPrompt);
    console.log('');
});

