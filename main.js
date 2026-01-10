// NOTE: The image URLs are placeholders.
// You should replace them with actual image URLs.
const souvenirs = [
    {
        name_ko: '마스크팩',
        name_en: 'Sheet Masks',
        image: 'https://via.placeholder.com/300x300.png?text=Sheet+Masks'
    },
    {
        name_ko: '기초화장품 세트',
        name_en: 'Skincare Sets',
        image: 'https://via.placeholder.com/300x300.png?text=Skincare+Sets'
    },
    {
        name_ko: '립틴트',
        name_en: 'Lip Tints',
        image: 'https://via.placeholder.com/300x300.png?text=Lip+Tints'
    },
    {
        name_ko: '허니버터 아몬드',
        name_en: 'Honey Butter Almonds',
        image: 'https://via.placeholder.com/300x300.png?text=Honey+Butter+Almonds'
    },
    {
        name_ko: '라면',
        name_en: 'Instant Noodles',
        image: 'https://via.placeholder.com/300x300.png?text=Instant+Noodles'
    },
    {
        name_ko: '소주',
        name_en: 'Soju',
        image: 'https://via.placeholder.com/300x300.png?text=Soju'
    },
    {
        name_ko: '전통차',
        name_en: 'Korean Tea',
        image: 'https://via.placeholder.com/300x300.png?text=Korean+Tea'
    },
    {
        name_ko: '인삼 제품',
        name_en: 'Ginseng Products',
        image: 'https://via.placeholder.com/300x300.png?text=Ginseng+Products'
    },
    {
        name_ko: '김치',
        name_en: 'Kimchi',
        image: 'https://via.placeholder.com/300x300.png?text=Kimchi'
    },
    {
        name_ko: '고추장',
        name_en: 'Gochujang',
        image: 'https://via.placeholder.com/300x300.png?text=Gochujang'
    },
    {
        name_ko: '김',
        name_en: 'Roasted Seaweed',
        image: 'https://via.placeholder.com/300x300.png?text=Roasted+Seaweed'
    },
    {
        name_ko: '한복',
        name_en: 'Hanbok',
        image: 'https://via.placeholder.com/300x300.png?text=Hanbok'
    },
    {
        name_ko: '탈',
        name_en: 'Traditional Korean Masks',
        image: 'https://via.placeholder.com/300x300.png?text=Traditional+Masks'
    },
    {
        name_ko: '부채',
        name_en: 'Korean Fans',
        image: 'https://via.placeholder.com/300x300.png?text=Korean+Fans'
    },
    {
        name_ko: '수저 세트',
        name_en: 'Chopsticks and Spoons',
.        image: 'https://via.placeholder.com/300x300.png?text=Chopsticks+and+Spoons'
    },
    {
        name_ko: '도장',
        name_en: 'Dojang',
        image: 'https://via.placeholder.com/300x300.png?text=Dojang'
    },
    {
        name_ko: '나전칠기',
        name_en: 'Mother of Pearl Products',
        image: 'https://via.placeholder.com/300x300.png?text=Mother+of+Pearl'
    },
    {
        name_ko: 'K-Pop 굿즈',
        name_en: 'K-Pop Merchandise',
        image: 'https://via.placeholder.com/300x300.png?text=K-Pop+Merchandise'
    },
    {
        name_ko: '카카오프렌즈 굿즈',
        name_en: 'Kakao Friends Merchandise',
        image: 'https://via.placeholder.com/300x300.png?text=Kakao+Friends'
    },
    {
        name_ko: '캐릭터 양말',
        name_en: 'Korean Character Socks',
        image: 'https://via.placeholder.com/300x300.png?text=Character+Socks'
    },
    {
        name_ko: '학용품',
        name_en: 'Korean Stationery',
        image: 'https://via.placeholder.com/300x300.png?text=Stationery'
    },
    {
        name_ko: '기러기',
        name_en: 'Wedding Ducks',
        image: 'https://via.placeholder.com/300x300.png?text=Wedding+Ducks'
    }
];

function displaySouvenirs(souvenirList) {
    const souvenirGrid = document.getElementById('souvenir-grid');
    souvenirGrid.innerHTML = '';

    souvenirList.forEach(souvenir => {
        const souvenirItem = document.createElement('div');
        souvenirItem.className = 'souvenir-item';

        souvenirItem.innerHTML = `
            <img src="${souvenir.image}" alt="${souvenir.name_en}">
            <div class="souvenir-name">
                <p class="name-ko">${souvenir.name_ko}</p>
                <p class="name-en">${souvenir.name_en}</p>
            </div>
        `;

        souvenirGrid.appendChild(souvenirItem);
    });
}

function searchSouvenirs() {
    const searchTerm = document.getElementById('search-box').value.toLowerCase();
    const filteredSouvenirs = souvenirs.filter(souvenir => {
        return souvenir.name_ko.toLowerCase().includes(searchTerm) ||
               souvenir.name_en.toLowerCase().includes(searchTerm);
    });
    displaySouvenirs(filteredSouvenirs);
}

document.addEventListener('DOMContentLoaded', () => {
    displaySouvenirs(souvenirs);

    const searchBox = document.getElementById('search-box');
    searchBox.addEventListener('keyup', searchSouvenirs);
});