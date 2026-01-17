document.addEventListener('DOMContentLoaded', function() {
    let currentLang = 'ko'; // 기본 언어 설정

    // 다국어 텍스트 데이터
    const translations = {
        logo: { ko: "K-Souvenir", en: "K-Souvenir", ja: "K-Souvenir" },
        nav_intro: { ko: "소개", en: "Intro", ja: "紹介" },
        nav_souvenirs: { ko: "기념품", en: "Souvenirs", ja: "お土産" },
        cat_all: { ko: "전체보기", en: "All", ja: "すべて" },
        cat_cosmetics: { ko: "화장품", en: "Cosmetics", ja: "コスメ" },
        cat_food: { ko: "식품", en: "Food", ja: "食品" },
        cat_clothing: { ko: "의류", en: "Clothing", ja: "衣類" },
        cat_traditional: { ko: "전통 상품", en: "Traditional", ja: "伝統商品" },
        cat_kpop: { ko: "K-POP 굿즈", en: "K-POP Goods", ja: "K-POPグッズ" },
        search_placeholder: { ko: "기념품 검색...", en: "Search souvenirs...", ja: "お土産を検索..." },
        search_button: { ko: "검색", en: "Search", ja: "検索" }
    };

    const souvenirs = [
        // 식품
        { name: { ko: "김치", en: "Kimchi", ja: "キムチ" }, category: "식품" }, { name: { ko: "고추장", en: "Gochujang", ja: "コチュジャン" }, category: "식품" },
        { name: { ko: "된장", en: "Doenjang", ja: "味噌" }, category: "식품" }, { name: { ko: "쌈장", en: "Ssamjang", ja: "サムジャン" }, category: "식품" },
        { name: { ko: "신라면", en: "Shin Ramyun", ja: "辛ラーメン" }, category: "식품" }, { name: { ko: "불닭볶음면", en: "Buldak Noodles", ja: "ブルダック炒め麺" }, category: "식품" },
        { name: { ko: "짜파게티", en: "Jjapagetti", ja: "チャパゲティ" }, category: "식품" }, { name: { ko: "초코파이", en: "Choco Pie", ja: "チョコパイ" }, category: "식품" },
        { name: "빼빼로", category: "식품" }, { name: { ko: "허니버터 아몬드", en: "Honey Butter Almond", ja: "ハニーバターアーモンド" }, category: "식품" },
        { name: { ko: "맛김", en: "Seasoned Laver", ja: "味付けのり" }, category: "식품" }, { name: { ko: "막걸리", en: "Makgeolli", ja: "マッコリ" }, category: "식품" },
        { name: { ko: "소주", en: "Soju", ja: "焼酎" }, category: "식품" }, { name: { ko: "바나나맛 우유", en: "Banana Flavored Milk", ja: "バナナ味牛乳" }, category: "식품" },
        { name: { ko: "식혜", en: "Sikhye", ja: "シッケ" }, category: "식품" }, { name: { ko: "수정과", en: "Sujeonggwa", ja: "水正果" }, category: "식품" },
        { name: { ko: "약과", en: "Yakgwa", ja: "薬菓" }, category: "식품" }, { name: { ko: "붕어빵", en: "Bungeo-ppang", ja: "たい焼き" }, category: "식품" },
        { name: { ko: "호떡", en: "Hotteok", ja: "ホットク" }, category: "식품" }, { name: { ko: "떡볶이 키트", en: "Tteokbokki Kit", ja: "トッポッキキット" }, category: "식품" },
        { name: { ko: "인삼차", en: "Ginseng Tea", ja: "高麗人参茶" }, category: "식품" }, { name: "유자차", category: "식품" },
        { name: { ko: "한과", en: "Hangwa", ja: "韓菓" }, category: "식품" }, { name: { ko: "전통주", en: "Traditional Liquor", ja: "伝統酒" }, category: "식품" },
        { name: { ko: "김부각", en: "Gim-bugak", ja: "海苔の天ぷら" }, category: "식품" },
        // 화장품
        { name: { ko: "마스크팩", en: "Face Mask Sheet", ja: "フェイスマスクシート" }, category: "화장품" }, { name: { ko: "핸드크림", en: "Hand Cream", ja: "ハンドクリーム" }, category: "화장품" },
        { name: { ko: "BB크림", en: "BB Cream", ja: "BBクリーム" }, category: "화장품" }, { name: { ko: "쿠션 파운데이션", en: "Cushion Foundation", ja: "クッションファンデーション" }, category: "화장품" },
        { name: { ko: "달팽이 크림", en: "Snail Cream", ja: "カタツムリクリーム" }, category: "화장품" }, { name: { ko: "필링젤", en: "Peeling Gel", ja: "ピーリングジェル" }, category: "화장품" },
        { name: { ko: "립 틴트", en: "Lip Tint", ja: "リップティント" }, category: "화장품" }, { name: { ko: "수분 크림", en: "Moisturizing Cream", ja: "水分クリーム" }, category: "화장품" },
        { name: { ko: "선크림", en: "Sunscreen", ja: "日焼け止め" }, category: "화장품" }, { name: { ko: "클렌징폼", en: "Cleansing Foam", ja: "クレンジングフォーム" }, category: "화장품" },
        { name: { ko: "토너", en: "Toner", ja: "トナー" }, category: "화장품" }, { name: { ko: "에센스", en: "Essence", ja: "エッセンス" }, category: "화장품" },
        { name: { ko: "아이크림", en: "Eye Cream", ja: "アイクリーム" }, category: "화장품" }, { name: { ko: "네일 스티커", en: "Nail Stickers", ja: "ネイルステッカー" }, category: "화장품" },
        { name: { ko: "코팩", en: "Nose Pack", ja: "鼻パック" }, category: "화장품" }, { name: { ko: "풋 마스크", en: "Foot Mask", ja: "フットマスク" }, category: "화장품" },
        { name: { ko: "헤어 에센스", en: "Hair Essence", ja: "ヘアエッセンス" }, category: "화장품" }, { name: { ko: "알로에젤", en: "Aloe Gel", ja: "アロエジェル" }, category: "화장품" },
        { name: { ko: "블러셔", en: "Blusher", ja: "チーク" }, category: "화장품" }, { name: { ko: "아이섀도 팔레트", en: "Eyeshadow Palette", ja: "アイシャドウパレット" }, category: "화장품" },
        // 의류
        { name: { ko: "개량 한복", en: "Modernized Hanbok", ja: "改良韓服" }, category: "의류" }, { name: { ko: "캐릭터 양말", en: "Character Socks", ja: "キャラクター靴下" }, category: "의류" },
        { name: { ko: "K-POP 아이돌 티셔츠", en: "K-POP Idol T-shirts", ja: "K-POPアイドルTシャツ" }, category: "의류" }, { name: { ko: "동대문표 옷", en: "Dongdaemun-style Clothes", ja: "東大門スタイルの服" }, category: "의류" },
        { name: { ko: "꽃신", en: "Flower Shoes", ja: "花靴" }, category: "의류" }, { name: { ko: "비녀", en: "Binyeo (Hairpin)", ja: "かんざし" }, category: "의류" },
        { name: { ko: "노리개", en: "Norigae (Tassel)", ja: "ノリゲ" }, category: "의류" }, { name: { ko: "한국적인 디자인의 스카프", en: "Korean Design Scarf", ja: "韓国風スカーフ" }, category: "의류" },
        { name: { ko: "네임택", en: "Name Tag", ja: "ネームタグ" }, category: "의류" }, { name: "에코백", category: "의류" },
        { name: { ko: "볼캡", en: "Ball Cap", ja: "ボールキャップ" }, category: "의류" }, { name: { ko: "등산복", en: "Hiking Clothes", ja: "登山服" }, category: "의류" },
        { name: { ko: "실내용 슬리퍼", en: "Indoor Slippers", ja: "室内スリッパ" }, category: "의류" }, { name: { ko: "잠옷", en: "Pajamas", ja: "パジャマ" }, category: "의류" },
        { name: { ko: "커플티", en: "Couple T-shirts", ja: "カップルTシャツ" }, category: "의류" },
        // K-POP 굿즈
        { name: { ko: "아이돌 앨범", en: "Idol Album", ja: "アイドルアルバム" }, category: "K-POP 굿즈" }, { name: { ko: "응원봉", en: "Light Stick", ja: "応援棒" }, category: "K-POP 굿즈" },
        { name: { ko: "포토카드", en: "Photo Card", ja: "フォトカード" }, category: "K-POP 굿즈" }, { name: { ko: "BT21 상품", en: "BT21 Goods", ja: "BT21グッズ" }, category: "K-POP 굿즈" },
        { name: { ko: "카카오프렌즈 상품", en: "Kakao Friends Goods", ja: "カカオフレンズグッズ" }, category: "K-POP 굿즈" }, { name: { ko: "라인프렌즈 상품", en: "Line Friends Goods", ja: "ラインフレンズグッズ" }, category: "K-POP 굿즈" },
        { name: { ko: "뽀로로 상품", en: "Pororo Goods", ja: "ポロログッズ" }, category: "K-POP 굿즈" }, { name: { ko: "웹툰 단행본", en: "Webtoon Books", ja: "ウェブトゥーン単行本" }, category: "K-POP 굿즈" },
        { name: { ko: "연예인 화보집", en: "Celebrity Photobook", ja: "芸能人写真集" }, category: "K-POP 굿즈" }, { name: { ko: "드라마 DVD", en: "Drama DVD", ja: "ドラマDVD" }, category: "K-POP 굿즈" },
        { name: { ko: "OST 앨범", en: "OST Album", ja: "OSTアルバム" }, category: "K-POP 굿즈" }, { name: { ko: "키링", en: "Keyring", ja: "キーリング" }, category: "K-POP 굿즈" },
        { name: { ko: "스티커", en: "Stickers", ja: "ステッカー" }, category: "K-POP 굿즈" }, { name: { ko: "인형", en: "Doll", ja: "人形" }, category: "K-POP 굿즈" },
        { name: { ko: "공식 굿즈", en: "Official Goods", ja: "公式グッズ" }, category: "K-POP 굿즈" },
        // 전통 상품
        { name: { ko: "부채", en: "Folding Fan", ja: "扇子" }, category: "전통 상품" }, { name: { ko: "복주머니", en: "Lucky Pouch", ja: "福巾着" }, category: "전통 상품" },
        { name: { ko: "도장", en: "Traditional Stamp", ja: "伝統的な判子" }, category: "전통 상품" }, { name: { ko: "전통 젓가락과 숟가락 세트", en: "Chopsticks & Spoon Set", ja: "伝統的な箸とスプーンセット" }, category: "전통 상품" },
        { name: { ko: "나전칠기 보석함", en: "Najeonchilgi Jewelry Box", ja: "螺鈿漆器の宝石箱" }, category: "전통 상품" }, { name: { ko: "한지 공예품", en: "Hanji Crafts", ja: "韓紙工芸品" }, category: "전통 상품" },
        { name: { ko: "민화 그림", en: "Minhwa Painting", ja: "民画" }, category: "전통 상품" }, { name: { ko: "탈", en: "Traditional Mask", ja: "伝統的な仮面" }, category: "전통 상품" },
        { name: { ko: "촛대", en: "Candlestick", ja: "燭台" }, category: "전통 상품" }, { name: { ko: "다기 세트", en: "Tea Set", ja: "茶器セット" }, category: "전통 상품" },
        { name: { ko: "소반", en: "Small Dining Table", ja: "小盤" }, category: "전통 상품" }, { name: { ko: "보자기", en: "Bojagi (Wrapping Cloth)", ja: "風呂敷" }, category: "전통 상품" },
        { name: { ko: "자개 거울", en: "Mother-of-pearl Mirror", ja: "螺鈿の鏡" }, category: "전통 상품" }, { name: { ko: "책갈피", en: "Bookmark", ja: "しおり" }, category: "전통 상품" },
        { name: { ko: "연", en: "Kite", ja: "凧" }, category: "전통 상품" }, { name: { ko: "제기", en: "Jegi", ja: "チェギ" }, category: "전통 상품" },
        { name: { ko: "윷놀이 세트", en: "Yut Nori Set", ja: "ユンノリセット" }, category: "전통 상품" }, { name: { ko: "공기놀이", en: "Gonggi Nori", ja: "コンギノリ" }, category: "전통 상품" },
        { name: { ko: "매듭 팔찌", en: "Knot Bracelet", ja: "結び目のブレスレット" }, category: "전통 상품" }, { name: { ko: "한글 디자인 상품", en: "Hangeul Design Goods", ja: "ハングルデザイングッズ" }, category: "전통 상품" },
        { name: { ko: "훈민정음 손수건", en: "Hunminjeongeum Handkerchief", ja: "訓民正音のハンカチ" }, category: "전통 상품" }, { name: { ko: "거북선 모형", en: "Geobukseon Model", ja: "亀甲船の模型" }, category: "전통 상품" },
        { name: { ko: "첨성대 모형", en: "Cheomseongdae Model", ja: "瞻星台の模型" }, category: "전통 상품" }, { name: { ko: "기와집 모형", en: "Giwajip Model", ja: "瓦屋根の家の模型" }, category: "전통 상품" },
        { name: { ko: "전통 문양 텀블러", en: "Traditional Pattern Tumbler", ja: "伝統文様のタンブラー" }, category: "전통 상품" }
    ];

    const grid = document.querySelector('.souvenir-grid');
    const categoryLinks = document.querySelectorAll('.dropdown-menu a[data-category]');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const langSwitcherLinks = document.querySelectorAll('#lang-switcher a');

    function renderItems(items) {
        grid.innerHTML = '';
        items.forEach(souvenir => {
            const item = document.createElement('div');
            item.className = 'souvenir-item';
            
            const nameSpan = document.createElement('span');
            nameSpan.textContent = souvenir.name[currentLang];
            item.appendChild(nameSpan);

            const koName = souvenir.name.ko;
            if (koName === '김치' || koName === '고추장' || koName === '된장') {
                let imageName = '';
                if (koName === '김치') imageName = 'kimchi';
                if (koName === '고추장') imageName = 'gochujang';
                if (koName === '된장') imageName = 'doenjang';
                
                item.style.backgroundImage = `url('https://raw.githubusercontent.com/snowingx5-boop/product-builder-lecture/main/public/images/${imageName}.jpg')`;
                item.style.backgroundSize = 'cover';
                item.style.backgroundPosition = 'center';
                nameSpan.style.color = 'white';
                nameSpan.style.textShadow = '1px 1px 2px rgba(0,0,0,0.7)';
            }
            grid.appendChild(item);
        });
    }

    function updateLanguage(lang) {
        currentLang = lang;
        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.getAttribute('data-translate-key');
            if (translations[key] && translations[key][lang]) {
                if (el.tagName === 'INPUT' && el.type === 'search') {
                    el.placeholder = translations[key][lang];
                } else {
                    el.textContent = translations[key][lang];
                }
            }
        });
        renderItems(souvenirs);
    }
    
    langSwitcherLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            updateLanguage(lang);
        });
    });

    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            if (category === 'all') {
                renderItems(souvenirs);
            } else {
                const filteredSouvenirs = souvenirs.filter(s => s.category === category);
                renderItems(filteredSouvenirs);
            }
        });
    });

    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        if (!searchTerm) {
            renderItems(souvenirs);
            return;
        }
        const filteredSouvenirs = souvenirs.filter(souvenir => 
            souvenir.name[currentLang].toLowerCase().includes(searchTerm)
        );
        renderItems(filteredSouvenirs);
    }

    searchBtn.addEventListener('click', handleSearch);
    
    searchInput.addEventListener('input', function() {
        if (searchInput.value === '') {
            renderItems(souvenirs);
        }
    });

    // Initial Render
    updateLanguage(currentLang); 
});
