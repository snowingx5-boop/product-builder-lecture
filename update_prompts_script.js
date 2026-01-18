const fs = require('fs');

const filePath = './generate-all-souvenir-images.js';
let fileContent = fs.readFileSync(filePath, 'utf8');

const oldCustomPromptsStartMarker = '      const customPrompts = {';
const oldCustomPromptsEndMarker = '      };';

const oldCustomPromptsStartIndex = fileContent.indexOf(oldCustomPromptsStartMarker);
const oldCustomPromptsEndIndex = fileContent.indexOf(oldCustomPromptsEndMarker, oldCustomPromptsStartIndex) + oldCustomPromptsEndMarker.length;

const oldCustomPromptsBlock = fileContent.substring(oldCustomPromptsStartIndex, oldCustomPromptsEndIndex);

const newCustomPromptsBlock = `      const customPrompts = {
        "바나나맛 우유": "high resolution photo of a 200ml sterile milk carton with a pastel yellow design, the container is cylindrical, thicker in the middle than top and bottom (looks hexagonal from the side), studio quality, 400x400, clear background, product photography",
        "수정과": "high resolution photo of red sujeonggwa traditional Korean cinnamon punch in a clear glass, studio quality, 400x400, clear background, product photography",
        "마스크팩": "high resolution photo of a face-shaped sheet mask with cutouts for eyes, nose, and mouth, elegant packaging, on a vanity, luxurious, smooth texture, studio quality, 400x400, clear background, product photography",
        "풋 마스크": "high resolution photo of foot mask packaging with a picture of feet on it, elegant packaging, on a vanity, luxurious, smooth texture, studio quality, 400x400, clear background, product photography",
        "노리개": "high resolution photo of a traditional Korean norigae tassel hanging on the right chest of a hanbok-wearing model, with outer clothing layered over it, fashion photography, well-styled, studio quality, 400x400, clear background",
        "볼캡": "high resolution photo of a model wearing a ball cap, with head slightly bowed to reduce face exposure and emphasize the cap, fashion photography, well-styled, on a mannequin, studio quality, 400x400, clear background",
        "응원봉": "high resolution photo of a stick-shaped K-POP light stick, fan merchandise, vibrant colors, pop culture aesthetic, idol related, studio quality, 400x400, clear background, product photography",
        "스티커": "high resolution photo of cute Joseon Palace Guard character stickers, fan merchandise, vibrant colors, pop culture aesthetic, idol related, studio quality, 400x400, clear background, product photography",
        "도장": "high resolution photo of a cylindrical black traditional Korean stamp with mother-of-pearl design on its curved surface, Korean characters '[제시카인]' (Jessica In) engraved on the bottom surface, in a traditional Korean setting, handcrafted, intricate details, cultural significance, studio quality, 400x400, clear background",
        "민화 그림": "high resolution photo of a Korean folk painting (minhwa) on hanji paper, depicting daily life of Joseon commoners with black ink, traditional Korean oriental painting style, handcrafted, intricate details, cultural significance, studio quality, 400x400, clear background",
        "제기": "high resolution photo of a Korean jegi shuttlecock toy used in the traditional Korean game of Jegichagi, with a coin-sized weight (flat cylindrical shape) at the bottom and narrow, dense shimmering plastic streamers, studio quality, 400x400, clear background, product photography",
        "윷놀이 세트": "high resolution photo of a Yut Nori game set, including four thin, long wooden yut sticks with black 'X' markings and a yut board with a 6x6 grid of dots, diagonal lines connecting corners, and 2 dots on diagonals leading to a central dot, all made of wood, traditional Korean board game, in a traditional Korean setting, handcrafted, intricate details, cultural significance, studio quality, 400x400, clear background",
        "공기놀이": "high resolution photo of five fingernail-sized, colorful, cylindrical gonggi stones used in the traditional Korean game of Gonggi Nori, studio quality, 400x400, clear background, product photography",
        "한글 디자인 상품": "high resolution photo of a traditional Korean square lantern with subtle Hangeul script design, the Hangeul text is tone-on-tone with the background color, in a traditional Korean setting, handcrafted, intricate details, cultural significance, studio quality, 400x400, clear background",
        "훈민정음 손수건": "high resolution photo of a handkerchief with the Hunminjeongeum preface text by King Sejong, written in the original historical orthography (e.g., '나랏말싸미...'), in a traditional Korean setting, handcrafted, intricate details, cultural significance, studio quality, 400x400, clear background",
        "비녀": "high resolution photo of the back of a model's head wearing a traditional Korean binyeo hairpin, with intricate details, studio quality, 400x400, clear background, fashion photography",
        "아이돌 앨범": "high resolution photo of a fictional K-POP boy group's third album CD case with a cosmic space illustration, album cover art, fan merchandise, vibrant colors, pop culture aesthetic, studio quality, 400x400, clear background, product photography",
        "포토카드": "high resolution photo of a credit card-sized photo card featuring a fictional K-POP boy group member resembling BTS, fan merchandise, vibrant colors, pop culture aesthetic, studio quality, 400x400, clear background, product photography",
        "연예인 화보집": "high resolution photo of a lovely brochure-style photobook of a fictional lead Korean actress resembling Miss A Suzy and Han Hyo-joo, studio quality, 400x400, clear background, product photography",
        "인형": "high resolution photo of a fictional Jindo dog character doll, cute, studio quality, 400x400, clear background, product photography",
        "공식 굿즈": "high resolution photo of a chibi SD size character doll (fist-sized) of a fictional K-POP boy group member, fan merchandise, vibrant colors, pop culture aesthetic, studio quality, 400x400, clear background, product photography"
      };`;

const updatedContent = fileContent.replace(oldCustomPromptsBlock, newCustomPromptsBlock);

fs.writeFileSync(filePath, updatedContent);

console.log('generate-all-souvenir-images.js updated successfully.');
