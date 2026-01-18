document.addEventListener('DOMContentLoaded', function() {
    let currentLang = 'ko'; // 기본 언어 설정

    // Function to convert Korean name to a slug for filename
    function slugify(text) {
      return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^\uAC00-\uD7A3a-z0-9-]/g, '') // Keep Korean, lowercase alphanumeric, and hyphens
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-');
    }

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

    const initialSouvenirs = [
        // 식품
        { name: { ko: "김치", en: "Kimchi", ja: "キムチ" }, category: "식품", description: { ko: "한국의 대표적인 발효 음식으로, 맵고 짭짤한 맛이 특징입니다. 다양한 요리에 활용됩니다.", en: "Kimchi is a staple in Korean cuisine, a traditional side dish of salted and fermented vegetables. It's spicy and savory.", ja: "韓国의 대표적인 발효 음식으로, 맵고 짭짤한 맛이 특징입니다. 다양한 요리에 활용됩니다。" } },
        { name: { ko: "고추장", en: "Gochujang", ja: "コチュジャン" }, category: "식품", description: { ko: "매콤하면서도 달콤한 맛이 나는 한국의 전통 발효 고추장입니다. 비빔밥, 떡볶이 등에 사용됩니다.", en: "Gochujang is a savory, sweet, and spicy fermented condiment, central to Korean cooking. Used in dishes like bibimbap and tteokbokki.", ja: "辛くて甘い味がする韓国의 전통 발효 고추장입니다. 비빔밥, 떡볶이 등에 사용됩니다。" } },
        { name: { ko: "된장", en: "Doenjang", ja: "味噌" }, category: "식품", description: { ko: "한국의 전통 발효 콩된장으로, 깊고 구수한 맛이 일품입니다. 된장찌개 등 다양한 국물 요리에 사용됩니다.", en: "Doenjang is a fermented soybean paste, a fundamental ingredient in Korean cuisine. It has a deep, earthy, and savory flavor, commonly used in stews.", ja: "韓国의 전통 발효 콩된장으로, 깊고 구수한 맛이 일품입니다. 된장찌개 등 다양한 국물 요리에 사용됩니다。" } },
        { name: { ko: "쌈장", en: "Ssamjang", ja: "サムジャン" }, category: "식품", description: { ko: "쌈 채소와 고기를 함께 싸 먹을 때 사용하는 매콤 짭짤한 양념장입니다.", en: "Ssamjang is a spicy dipping sauce, often used with grilled meats and leafy vegetables in Korean cuisine.", ja: "쌈 채소와 고기를 함께 싸 먹을 때 사용하는 매콤 짭짤한 양념장입니다。" } },
        { name: { ko: "신라면", en: "Shin Ramyun", ja: "辛ラーメン" }, category: "식품", description: { ko: "매콤한 맛이 특징인 한국의 인기 라면입니다. 전 세계적으로 사랑받고 있습니다.", en: "Shin Ramyun is a popular Korean instant noodle with a spicy flavor, enjoyed worldwide.", ja: "매콤한 맛이 특징인 한국의 인기 라면입니다. 전 세계적으로 사랑받고 있습니다。" } },
        { name: { ko: "불닭볶음면", en: "Buldak Noodles", ja: "ブルダック炒め麺" }, category: "식품", description: { ko: "극강의 매운맛을 자랑하는 볶음라면입니다. 매운맛을 즐기는 사람들에게 인기가 많습니다.", en: "Buldak Bokkeum Myeon is an extremely spicy stir-fried instant noodle, very popular among those who enjoy hot flavors.", ja: "극강의 매운맛을 자랑하는 볶음라면입니다. 매운맛을 즐기는 사람들에게 인기가 많습니다。" } },
        { name: { ko: "짜파게티", en: "Jjapagetti", ja: "チャパゲティ" }, category: "식품", description: { ko: "짜장면 맛을 구현한 인스턴트 짜장라면입니다. 온 가족이 즐겨 먹는 국민 라면입니다.", en: "Jjapagetti is an instant black bean paste noodle that recreates the taste of Jajangmyeon, a national favorite.", ja: "짜장면 맛을 구현한 인스턴트 짜장라면입니다. 온 가족이 즐겨 먹는 국민 라면입니다。" } },
        { name: { ko: "초코파이", en: "Choco Pie", ja: "チョコパイ" }, category: "식품", description: { ko: "부드러운 케이크 사이에 마시멜로가 들어있고 초콜릿으로 코팅된 국민 간식입니다.", en: "Choco Pie is a popular Korean snack consisting of marshmallow sandwiched between two layers of cake, coated in chocolate.", ja: "부드러운 케이크 사이에 마시멜로가 들어있고 초콜릿으로 코팅된 국민 간식입니다。" } },
        { name: { ko: "빼빼로", en: "Pepero", ja: "빼빼로" }, category: "식품", description: { ko: "길쭉한 막대 과자에 초콜릿이 코팅된 과자입니다. 빼빼로 데이에 주로 선물합니다.", en: "Pepero is a long stick biscuit coated in chocolate, often given as a gift on Pepero Day.", ja: "길쭉한 막대 과자에 초콜릿이 코팅된 과자입니다. 빼빼로 데이에 주로 선물합니다。" } },
        { name: { ko: "허니버터 아몬드", en: "Honey Butter Almond", ja: "ハニーバターアーモンド" }, category: "식품", description: { ko: "달콤하고 짭짤한 허니버터 맛 아몬드입니다. 중독성 강한 맛으로 인기가 많습니다.", en: "Honey Butter Almond is a sweet and salty almond snack with an addictive flavor, very popular.", ja: "달콤하고 짭짤한 허니버터 맛 아몬드입니다. 중독성 강한 맛으로 인기가 많습니다。" } },
        { name: { ko: "맛김", en: "Seasoned Laver", ja: "味付けのり" }, category: "식품", description: { ko: "바삭하고 고소한 맛의 김입니다. 밥과 함께 먹거나 간식으로 좋습니다.", en: "Seasoned Laver is crispy and savory seaweed, great with rice or as a snack.", ja: "바삭하고 고소한 맛의 김입니다. 밥과 함께 먹거나 간식으로 좋습니다。" } },
        { name: { ko: "막걸리", en: "Makgeolli", ja: "マッコリ" }, category: "식품", description: { ko: "한국의 전통 탁주로, 달콤하고 부드러운 맛이 특징입니다. 낮은 도수의 술입니다.", en: "Makgeolli is a traditional Korean rice wine, sweet and smooth with a low alcohol content.", ja: "한국의 전통 탁주로, 달콤하고 부드러운 맛이 특징입니다. 낮은 도수의 술입니다。" } },
        { name: { ko: "소주", en: "Soju", ja: "焼酎" }, category: "식품", description: { ko: "한국을 대표하는 증류주로, 맑고 깨끗한 맛이 특징입니다. 다양한 안주와 잘 어울립니다.", en: "Soju is a representative Korean distilled liquor, known for its clear and clean taste, pairing well with various dishes.", ja: "한국을 대표하는 증류주로, 맑고 깨끗한 맛이 특징입니다. 다양한 안주와 잘 어울립니다。" } },
        { name: { ko: "바나나맛 우유", en: "Banana Flavored Milk", ja: "バナナ味牛乳" }, category: "식품", description: { ko: "달콤한 바나나 맛이 나는 우유입니다. 남녀노소 누구나 좋아하는 음료입니다.", en: "Banana Flavored Milk is a sweet banana-flavored milk, beloved by all ages in Korea.", ja: "달콤한 바나나 맛이 나는 우유입니다. 남녀노소 누구나 좋아하는 음료입니다。" } },
        { name: { ko: "식혜", en: "Sikhye", ja: "シッケ" }, category: "식품", description: { ko: "엿기름으로 만든 한국의 전통 음료로, 달콤하고 시원한 맛이 특징입니다. 소화를 돕습니다.", en: "Sikhye is a traditional Korean sweet rice beverage, refreshing and aids digestion.", ja: "엿기름으로 만든 한국의 전통 음료로, 달콤하고 시원한 맛이 특징입니다. 소화를 돕습니다。" } },
        { name: { ko: "수정과", en: "Sujeonggwa", ja: "水正果" }, category: "식품", description: { ko: "계피와 생강을 주재료로 만든 한국의 전통 음료입니다. 달콤하고 개운한 맛이 특징입니다.", en: "Sujeonggwa is a traditional Korean cinnamon punch, made with ginger. It has a sweet and refreshing taste.", ja: "계피와 생강을 주재료로 만든 한국의 전통 음료입니다. 달콤하고 개운한 맛이 특징입니다。" } },
        { name: { ko: "약과", en: "Yakgwa", ja: "薬菓" }, category: "식품", description: { ko: "밀가루에 꿀과 참기름을 넣어 만든 한국의 전통 과자입니다. 달콤하고 부드러운 식감이 특징입니다.", en: "Yakgwa is a traditional Korean confectionery made from wheat flour, honey, and sesame oil, known for its sweet and soft texture.", ja: "밀가루에 꿀과 참기름을 넣어 만든 한국의 전통 과자입니다. 달콤하고 부드러운 식감이 특징입니다。" } },
        { name: { ko: "붕어빵", en: "Bungeo-ppang", ja: "たい焼き" }, category: "식품", description: { ko: "붕어 모양의 빵 안에 팥앙금이나 슈크림이 들어있는 겨울철 대표 간식입니다.", en: "Bungeo-ppang is a fish-shaped pastry filled with red bean paste or custard cream, a popular winter snack.", ja: "붕어 모양의 빵 안에 팥앙금이나 슈크림이 들어있는 겨울철 대표 간식입니다。" } },
        { name: { ko: "호떡", en: "Hotteok", ja: "ホットク" }, category: "식품", description: { ko: "밀가루 반죽 안에 설탕, 견과류 등을 넣어 기름에 지져 만든 한국의 길거리 간식입니다. 달콤하고 쫄깃한 맛이 특징입니다.", en: "Hotteok is a sweet, chewy Korean street pancake filled with brown sugar syrup and nuts, fried in oil.", ja: "밀가루 반죽 안에 설탕, 견과류 등을 넣어 기름에 지져 만든 한국의 길거리 간식입니다. 달콤하고 쫄깃한 맛이 특징입니다。" } },
        { name: { ko: "떡볶이 키트", en: "Tteokbokki Kit", ja: "トッポッキキット" }, category: "식품", description: { ko: "집에서 간편하게 떡볶이를 만들어 먹을 수 있는 키트입니다. 매콤달콤한 맛을 즐길 수 있습니다.", en: "Tteokbokki Kit allows you to easily make Tteokbokki at home, enjoying its spicy and sweet flavor.", ja: "집에서 간편하게 떡볶이를 만들어 먹을 수 있는 키트입니다. 매콤달콤한 맛을 즐길 수 있습니다。" } },
        { name: { ko: "인삼차", en: "Ginseng Tea", ja: "高麗人参茶" }, category: "식품", description: { ko: "피로회복에 좋은 인삼으로 만든 전통차입니다. 따뜻하게 마시면 몸을 든든하게 해줍니다.", en: "Ginseng Tea is a traditional tea made from ginseng, known for its revitalizing properties. It warms and strengthens the body.", ja: "피로회복에 좋은 인삼으로 만든 전통차입니다. 따뜻하게 마시면 몸을 든든하게 해줍니다。" } },
        { name: { ko: "유자차", en: "Yuja Tea", ja: "ゆず茶" }, category: "식품", description: { ko: "새콤달콤한 유자로 만든 차입니다. 감기 예방에 좋으며, 향긋한 유자 향이 일품입니다.", en: "Yuja Tea is a sweet and tangy tea made from yuzu fruit. It's good for preventing colds and has a delightful yuzu fragrance.", ja: "새콤달콤한 유자로 만든 차입니다. 감기 예방에 좋으며, 향긋한 유자 향이 일품입니다。" } },
        { name: { ko: "한과", en: "Hangwa", ja: "韓菓" }, category: "식품", description: { ko: "한국의 전통 과자로, 기름에 튀기거나 구워 만듭니다. 고운 색감과 섬세한 문양이 특징입니다.", en: "Hangwa refers to various traditional Korean confections, often fried or baked, characterized by their beautiful colors and intricate patterns.", ja: "한국의 전통 과자로, 기름에 튀기거나 구워 만듭니다. 고운 색감과 섬세한 문양이 특징입니다。" } },
        { name: { ko: "전통주", en: "Traditional Liquor", ja: "伝統酒" }, category: "식품", description: { ko: "쌀, 곡물 등을 발효시켜 만든 한국의 전통적인 술입니다. 깊은 풍미와 역사를 자랑합니다.", en: "Traditional Korean liquors are fermented drinks made from rice and grains, boasting deep flavors and rich history.", ja: "쌀, 곡물 등을 발효시켜 만든 한국의 전통적인 술입니다. 깊은 풍미와 역사를 자랑합니다。" } },
        { name: { ko: "김부각", en: "Gim-bugak", ja: "海苔の天ぷら" }, category: "식품", description: { ko: "김에 찹쌀풀을 발라 튀겨 만든 전통 간식입니다. 바삭하고 고소한 맛이 일품입니다.", en: "Gim-bugak is a traditional Korean snack made by frying seaweed coated with glutinous rice paste, known for its crispy and savory taste.", ja: "김에 찹쌀풀을 발라 튀겨 만든 전통 간식입니다. 바삭하고 고소한 맛이 일품입니다。" } },

        // 화장품
        { name: { ko: "마스크팩", en: "Face Mask Sheet", ja: "フェイスマスクシート" }, category: "화장품", description: { ko: "다양한 효능의 에센스를 머금은 시트팩입니다. 피부 보습과 진정에 탁월합니다.", en: "Face Mask Sheets are soaked in various beneficial essences, excellent for moisturizing and soothing the skin.", ja: "다양한 효능의 에센스를 머금은 시트팩입니다. 피부 보습과 진정에 탁월합니다。" } },
        { name: { ko: "핸드크림", en: "Hand Cream", ja: "ハンドクリーム" }, category: "화장품", description: { ko: "건조한 손을 촉촉하게 가꿔주는 필수품입니다. 다양한 향과 보습력으로 인기가 많습니다.", en: "Hand cream is an essential item for moisturizing dry hands, popular for its various scents and hydrating power.", ja: "건조한 손을 촉촉하게 가꿔주는 필수품입니다. 다양한 향과 보습력으로 인기가 많습니다。" } },
        { name: { ko: "BB크림", en: "BB Cream", ja: "BBクリーム" }, category: "화장품", description: { ko: "피부 톤을 보정하고 잡티를 커버해주는 베이스 메이크업 제품입니다. 자연스러운 피부 표현에 좋습니다.", en: "BB Cream is a base makeup product that evens out skin tone and covers blemishes, great for natural-looking skin.", ja: "피부 톤을 보정하고 잡티를 커버해주는 베이스 메이크업 제품입니다. 자연스러운 피부 표현에 좋습니다。" } },
        { name: { ko: "쿠션 파운데이션", en: "Cushion Foundation", ja: "クッションファンデーション" }, category: "화장품", description: { ko: "휴대하기 간편하고 촉촉하게 발리는 파운데이션입니다. 수정 화장에 용이합니다.", en: "Cushion Foundation is a portable and moisturizing foundation, convenient for touch-ups.", ja: "휴대하기 간편하고 촉촉하게 발리는 파운데이션입니다. 수정 화장에 용이합니다。" } },
        { name: { ko: "달팽이 크림", en: "Snail Cream", ja: "カタツムリクリーム" }, category: "화장품", description: { ko: "달팽이 점액 여과물이 함유되어 피부 재생과 보습에 도움을 줍니다. 피부 탄력 개선에 효과적입니다.", en: "Snail Cream contains snail secretion filtrate, aiding in skin regeneration and hydration, effective for improving skin elasticity.", ja: "달팽이 점액 여과물이 함유되어 피부 재생과 보습에 도움을 줍니다. 피부 탄력 개선에 효과적입니다。" } },
        { name: { ko: "필링젤", en: "Peeling Gel", ja: "ピーリングジェル" }, category: "화장품", description: { ko: "피부 각질을 부드럽게 제거해주는 제품입니다. 사용 후 매끄러운 피부를 느낄 수 있습니다.", en: "Peeling Gel gently removes dead skin cells, leaving skin smooth after use.", ja: "피부 각질을 부드럽게 제거해주는 제품입니다. 사용 후 매끄러운 피부를 느낄 수 있습니다。" } },
        { name: { ko: "립 틴트", en: "Lip Tint", ja: "リップティント" }, category: "화장품", description: { ko: "입술에 자연스럽게 스며들어 생기 있는 컬러를 부여하는 제품입니다. 지속력이 좋습니다.", en: "Lip Tint naturally blends into the lips, giving them vibrant color with good longevity.", ja: "입술에 자연스럽게 스며들어 생기 있는 컬러를 부여하는 제품입니다. 지속력이 좋습니다。" } },
        { name: { ko: "수분 크림", en: "Moisturizing Cream", ja: "水分クリーム" }, category: "화장품", description: { ko: "건조한 피부에 깊은 보습감을 선사하는 크림입니다. 피부 장벽 강화에 도움을 줍니다.", en: "Moisturizing Cream provides deep hydration to dry skin, helping to strengthen the skin barrier.", ja: "건조한 피부에 깊은 보습감을 선사하는 크림입니다. 피부 장벽 강화에 도움을 줍니다。" } },
        { name: { ko: "선크림", en: "Sunscreen", ja: "日焼け止め" }, category: "화장품", description: { ko: "자외선으로부터 피부를 보호해주는 필수품입니다. 산뜻한 사용감과 강력한 차단 효과가 특징입니다.", en: "Sunscreen is an essential product for protecting skin from UV rays, known for its fresh feel and strong blocking effect.", ja: "자외선으로부터 피부를 보호해주는 필수품입니다. 산뜻한 사용감과 강력한 차단 효과가 특징입니다。" } },
        { name: { ko: "클렌징폼", en: "Cleansing Foam", ja: "クレンジングフォーム" }, category: "화장품", description: { ko: "피부 노폐물을 깨끗하게 제거해주는 세안제입니다. 부드러운 거품으로 자극 없이 세안할 수 있습니다.", en: "Cleansing Foam effectively removes skin impurities, allowing for gentle cleansing without irritation with its soft lather.", ja: "피부 노폐물을 깨끗하게 제거해주는 세안제입니다. 부드러운 거품으로 자극 없이 세안할 수 있습니다。" } },
        { name: { ko: "토너", en: "Toner", ja: "トナー" }, category: "화장품", description: { ko: "세안 후 피부결을 정돈하고 다음 단계의 스킨케어 흡수를 돕는 제품입니다.", en: "Toner preps the skin after cleansing, refining its texture and aiding the absorption of subsequent skincare products.", ja: "세안 후 피부결을 정돈하고 다음 단계의 스킨케어 흡수를 돕는 제품입니다。" } },
        { name: { ko: "에센스", en: "Essence", ja: "エッセンス" }, category: "화장품", description: { ko: "고농축 유효 성분이 피부에 깊숙이 영양을 공급하는 제품입니다. 피부 고민 해결에 도움을 줍니다.", en: "Essence is a highly concentrated product that deeply nourishes the skin with active ingredients, helping to address various skin concerns.", ja: "고농축 유효 성분이 피부에 깊숙이 영양을 공급하는 제품입니다. 피부 고민 해결에 도움을 줍니다。" } },
        { name: { ko: "아이크림", en: "Eye Cream", ja: "アイクリーム" }, category: "화장품", description: { ko: "눈가 피부에 집중적인 영양과 보습을 제공하여 주름 개선에 도움을 줍니다.", en: "Eye Cream provides intensive nourishment and hydration to the delicate skin around the eyes, helping to improve wrinkles.", ja: "눈가 피부에 집중적인 영양과 보습을 제공하여 주름 개선에 도움을 줍니다。" } },
        { name: { ko: "네일 스티커", en: "Nail Stickers", ja: "ネイルステッカー" }, category: "화장품", description: { ko: "다양한 디자인으로 손쉽게 네일 아트를 연출할 수 있는 스티커입니다. 빠르고 간편하게 멋을 낼 수 있습니다.", en: "Nail Stickers allow you to easily create various nail art designs, quickly and conveniently adding flair.", ja: "다양한 디자인으로 손쉽게 네일 아트를 연출할 수 있는 스티커입니다. 빠르고 간편하게 멋을 낼 수 있습니다。" } },
        { name: { ko: "코팩", en: "Nose Pack", ja: "鼻パック" }, category: "화장품", description: { ko: "코 부위의 블랙헤드와 피지를 효과적으로 제거해주는 팩입니다. 깨끗하고 매끄러운 코를 유지할 수 있습니다.", en: "Nose Pack effectively removes blackheads and sebum from the nose area, helping to maintain a clean and smooth nose.", ja: "코 부위의 블랙헤드와 피지를 효과적으로 제거해주는 팩입니다. 깨끗하고 매끄러운 코를 유지할 수 있습니다。" } },
        { name: { ko: "풋 마스크", en: "Foot Mask", ja: "フットマスク" }, category: "화장품", description: { ko: "거칠어진 발을 부드럽고 촉촉하게 가꿔주는 마스크입니다. 각질 제거 및 보습에 효과적입니다.", en: "Foot Mask softens and moisturizes rough feet, effective for exfoliation and hydration.", ja: "거칠어진 발을 부드럽고 촉촉하게 가꿔주는 마스크입니다. 각질 제거 및 보습에 효과적입니다。" } },
        { name: { ko: "헤어 에센스", en: "Hair Essence", ja: "ヘアエッセンス" }, category: "화장품", description: { ko: "손상된 모발에 영양과 윤기를 부여하는 제품입니다. 머릿결을 부드럽게 가꿔줍니다.", en: "Hair Essence provides nourishment and shine to damaged hair, making it soft and smooth.", ja: "손상된 모발에 영양과 윤기를 부여하는 제품입니다. 머릿결을 부드럽게 가꿔줍니다。" } },
        { name: { ko: "알로에젤", en: "Aloe Gel", ja: "アロエジェル" }, category: "화장품", description: { ko: "피부 진정 및 보습에 탁월한 알로에 추출물이 함유된 젤입니다. 뜨거운 햇빛에 지친 피부에 좋습니다.", en: "Aloe Gel contains aloe extract excellent for soothing and moisturizing skin, good for sun-fatigued skin.", ja: "피부 진정 및 보습에 탁월한 알로에 추출물이 함유된 젤입니다. 뜨거운 햇빛에 지친 피부에 좋습니다。" } },
        { name: { ko: "블러셔", en: "Blusher", ja: "チーク" }, category: "화장품", description: { ko: "생기 있는 볼을 연출해주는 메이크업 제품입니다. 다양한 컬러와 제형으로 분위기를 바꿀 수 있습니다.", en: "Blusher is a makeup product that creates lively cheeks, allowing you to express your personality with various designs and colors.", ja: "생기 있는 볼을 연출해주는 메이크업 제품입니다. 다양한 컬러와 제형으로 분위기를 바꿀 수 있습니다。" } },
        { name: { ko: "아이섀도 팔레트", en: "Eyeshadow Palette", ja: "アイシャドウパレット" }, category: "화장품", description: { ko: "다양한 색상의 아이섀도가 담긴 팔레트입니다. 여러 가지 아이 메이크업을 연출할 수 있습니다.", en: "Eyeshadow Palette contains various colors of eyeshadow, allowing for diverse eye makeup looks.", ja: "다양한 색상의 아이섀도가 담긴 팔레트입니다. 여러 가지 아이 메이크업을 연출할 수 있습니다。" } },

        // 의류
        { name: { ko: "개량 한복", en: "Modernized Hanbok", ja: "改良韓服" }, category: "의류", description: { ko: "현대적인 감각으로 재해석된 한복입니다. 일상생활에서도 편안하게 입을 수 있습니다.", en: "Modernized Hanbok is a reinterpreted traditional Korean attire with a contemporary feel, comfortable for daily wear.", ja: "현대적인 감각으로 재해석된 한복입니다. 일상생활에서도 편안하게 입을 수 있습니다。" } },
        { name: { ko: "캐릭터 양말", en: "Character Socks", ja: "キャラクター靴下" }, category: "의류", description: { ko: "귀여운 한국 캐릭터가 그려진 양말입니다. 가볍고 센스 있는 선물로 좋습니다.", en: "Character Socks feature cute Korean characters, making them a light and thoughtful gift.", ja: "귀여운 한국 캐릭터가 그려진 양말입니다. 가볍고 센스 있는 선물로 좋습니다。" } },
        { name: { ko: "K-POP 아이돌 티셔츠", en: "K-POP Idol T-shirts", ja: "K-POPアイドルTシャツ" }, category: "의류", description: { ko: "좋아하는 K-POP 아이돌의 로고나 이미지가 새겨진 티셔츠입니다. 팬심을 표현하기 좋습니다.", en: "K-POP Idol T-shirts feature logos or images of favorite K-POP idols, perfect for expressing fan devotion.", ja: "좋아하는 K-POP 아이돌의 로고나 이미지가 새겨진 티셔츠입니다. 팬심을 표현하기 좋습니다。" } },
        { name: { ko: "동대문표 옷", en: "Dongdaemun-style Clothes", ja: "東大門スタイルの服" }, category: "의류", description: { ko: "최신 유행을 반영한 다양한 디자인의 옷입니다. 합리적인 가격으로 패션을 즐길 수 있습니다.", en: "Dongdaemun-style Clothes reflect the latest trends with various designs, allowing you to enjoy fashion at reasonable prices.", ja: "최신 유행을 반영한 다양한 디자인의 옷입니다. 합리적인 가격으로 패션을 즐길 수 있습니다。" } },
        { name: { ko: "꽃신", en: "Flower Shoes", ja: "花靴" }, category: "의류", description: { ko: "아름다운 꽃무늬 자수가 놓인 한국의 전통 신발입니다. 고운 한복에 잘 어울립니다.", en: "Flower Shoes are traditional Korean shoes adorned with beautiful floral embroidery, pairing well with elegant Hanbok.", ja: "아름다운 꽃무늬 자수가 놓인 한국의 전통 신발입니다. 고운 한복에 잘 어울립니다。" } },
        { name: { ko: "비녀", en: "Binyeo (Hairpin)", ja: "かんざし" }, category: "의류", description: { ko: "전통 한복에 사용하는 장식용 머리꽂이입니다. 다양한 재료와 섬세한 세공이 특징입니다.", en: "Binyeo is a decorative hairpin used with traditional Hanbok, characterized by various materials and delicate craftsmanship.", ja: "전통 한복에 사용하는 장식용 머리꽂이입니다. 다양한 재료와 섬세한 세공이 특징입니다。" } },
        { name: { ko: "노리개", en: "Norigae (Tassel)", ja: "ノリゲ" }, category: "의류", description: { ko: "한복 저고리나 치마에 다는 전통 장신구입니다. 아름다운 색감과 섬세한 매듭이 특징입니다.", en: "Norigae is a traditional Korean ornamental pendant worn with Hanbok, featuring beautiful colors and delicate knotting.", ja: "한복 저고리나 치마에 다는 전통 장신구입니다. 아름다운 색감과 섬세한 매듭이 특징입니다。" } },
        { name: { ko: "한국적인 디자인의 스카프", en: "Korean Design Scarf", ja: "韓国風スカーフ" }, category: "의류", description: { ko: "한국의 전통 문양이나 풍경이 담긴 스카프입니다. 패션 포인트로 활용하기 좋습니다.", en: "Korean Design Scarf features traditional Korean patterns or landscapes, excellent for use as a fashion accent.", ja: "한국의 전통 문양이나 풍경이 담긴 스카프입니다. 패션 포인트로 활용하기 좋습니다。" } },
        { name: { ko: "네임택", en: "Name Tag", ja: "ネームタグ" }, category: "의류", description: { ko: "캐리어, 가방 등에 달아 개인 정보를 표시하는 태그입니다. 한국적인 디자인이 인기가 많습니다.", en: "Name Tag is a tag for displaying personal information on luggage or bags, with Korean designs being very popular.", ja: "캐리어, 가방 등에 달아 개인 정보를 표시하는 태그입니다. 한국적인 디자인이 인기가 많습니다。" } },
        { name: { ko: "에코백", en: "Eco Bag", ja: "エコバッグ" }, category: "의류", description: { ko: "친환경 소재로 만든 가방으로, 다양한 한국적인 디자인이 인기가 많습니다. 가볍고 실용적입니다.", en: "Eco Bag is a bag made from eco-friendly materials, with various Korean designs being very popular. It's light and practical.", ja: "친환경 소재로 만든 가방으로, 다양한 한국적인 디자인이 인기가 많습니다. 가볍고 실용적입니다。" } },
        { name: { ko: "볼캡", en: "Ball Cap", ja: "ボールキャップ" }, category: "의류", description: { ko: "캐주얼한 복장에 잘 어울리는 모자입니다. 다양한 디자인과 컬러로 개성을 표현할 수 있습니다.", en: "Ball Cap is a hat that pairs well with casual outfits, allowing you to express your personality with various designs and colors.", ja: "캐주얼한 복장에 잘 어울리는 모자입니다. 다양한 디자인과 컬러로 개성을 표현할 수 있습니다。" } },
        { name: { ko: "등산복", en: "Hiking Clothes", ja: "登山服" }, category: "의류", description: { ko: "한국의 아름다운 산을 등반할 때 유용한 기능성 등산복입니다. 쾌적하고 안전한 등반을 돕습니다.", en: "Hiking Clothes are functional garments useful for climbing Korea's beautiful mountains, aiding in comfortable and safe climbing.", ja: "한국의 아름다운 산을 등반할 때 유용한 기능성 등산복입니다. 쾌적하고 안전한 등반을 돕습니다。" } },
        { name: { ko: "실내용 슬리퍼", en: "Indoor Slippers", ja: "室内スリッパ" }, category: "의류", description: { ko: "집에서 편안하게 신을 수 있는 슬리퍼입니다. 다양한 캐릭터 디자인이 인기가 많습니다.", en: "Indoor Slippers are comfortable footwear for home, with various character designs being very popular.", ja: "집에서 편안하게 신을 수 있는 슬리퍼입니다. 다양한 캐릭터 디자인이 인기가 많습니다。" } },
        { name: { ko: "잠옷", en: "Pajamas", ja: "パジャマ" }, category: "의류", description: { ko: "편안한 잠자리를 위한 부드러운 소재의 잠옷입니다. 귀여운 디자인이 많습니다.", en: "Pajamas are made from soft materials for comfortable sleep, often featuring cute designs.", ja: "편안한 잠자리를 위한 부드러운 소재의 잠옷입니다. 귀여운 디자인이 많습니다。" } },
        { name: { ko: "커플티", en: "Couple T-shirts", ja: "カップルTシャツ" }, category: "의류", description: { ko: "연인끼리 맞춰 입는 티셔츠입니다. 한국의 커플 문화에서 중요한 아이템입니다.", en: "Couple T-shirts are worn by romantic partners, an important item in Korean couple culture.", ja: "연인끼리 맞춰 입는 티셔츠입니다. 한국의 커플 문화에서 중요한 아이템입니다。" } },

        // K-POP 굿즈
        { name: { ko: "아이돌 앨범", en: "Idol Album", ja: "アイドルアルバム" }, category: "K-POP 굿즈", description: { ko: "좋아하는 K-POP 아이돌의 최신 앨범입니다. 포토카드, 포스터 등 다양한 구성품이 포함됩니다.", en: "Idol Album is the latest album of a favorite K-POP idol, often including various components like photo cards and posters.", ja: "좋아하는 K-POP 아이돌의 최신 앨범입니다. 포토카드, 포스터 등 다양한 구성품이 포함됩니다。" } },
        { name: { ko: "응원봉", en: "Light Stick", ja: "応援棒" }, category: "K-POP 굿즈", description: { ko: "좋아하는 아이돌 그룹의 상징적인 응원봉입니다. 콘서트나 팬미팅에서 필수 아이템입니다.", en: "Light Stick is the iconic cheering tool for a favorite idol group, an essential item for concerts and fan meetings.", ja: "좋아하는 아이돌 그룹의 상징적인 응원봉입니다. 콘서트나 팬미팅에서 필수 아이템입니다。" } },
        { name: { ko: "포토카드", en: "Photo Card", ja: "フォトカード" }, category: "K-POP 굿즈", description: { ko: "아이돌 멤버들의 사진이 담긴 카드입니다. 앨범 구매 시 랜덤으로 제공되기도 합니다.", en: "Photo Card is a card with pictures of idol members, sometimes randomly provided with album purchases.", ja: "아이돌 멤버들의 사진이 담긴 카드입니다. 앨범 구매 시 랜덤으로 제공되기도 합니다。" } },
        { name: { ko: "BT21 상품", en: "BT21 Goods", ja: "BT21グッズ" }, category: "K-POP 굿즈", description: { ko: "BTS와 라인프렌즈가 협업하여 만든 캐릭터 상품입니다. 인형, 문구류 등 다양한 제품이 있습니다.", en: "BT21 Goods are character products created in collaboration between BTS and LINE FRIENDS, including dolls, stationery, and more.", ja: "BTS와 라인프렌즈가 협업하여 만든 캐릭터 상품입니다. 인형, 문구류 등 다양한 제품이 있습니다。" } },
        { name: { ko: "카카오프렌즈 상품", en: "Kakao Friends Goods", ja: "カカオフレンズグッズ" }, category: "K-POP 굿즈", description: { ko: "카카오톡 이모티콘 캐릭터를 활용한 상품입니다. 인형, 생활용품 등 다양한 제품이 있습니다.", en: "Kakao Friends Goods are products featuring KakaoTalk emoticon characters, including dolls, household items, and more.", ja: "카카오톡 이모티콘 캐릭터를 활용한 상품입니다. 인형, 생활용품 등 다양한 제품이 있습니다。" } },
        { name: { ko: "라인프렌즈 상품", en: "Line Friends Goods", ja: "ラインフレンज़グッズ" }, category: "K-POP 굿즈", description: { ko: "라인 메신저 캐릭터를 활용한 상품입니다. 전 세계적으로 인기가 많습니다.", en: "LINE Friends Goods are products featuring LINE messenger characters, popular worldwide.", ja: "라인 메신저 캐릭터를 활용한 상품입니다. 전 세계적으로 인기가 많습니다。" } },
        { name: { ko: "뽀로로 상품", en: "Pororo Goods", ja: "ポロログッズ" }, category: "K-POP 굿즈", description: { ko: "어린이들에게 사랑받는 뽀로로 캐릭터 상품입니다. 완구, 의류 등 다양한 제품이 있습니다.", en: "Pororo Goods are character products of the beloved children's character Pororo, including toys, apparel, and more.", ja: "어린이들에게 사랑받는 뽀로로 캐릭터 상품입니다. 완구, 의류 등 다양한 제품이 있습니다。" } },
        { name: { ko: "웹툰 단행본", en: "Webtoon Books", ja: "ウェブトゥーン単行本" }, category: "K-POP 굿즈", description: { ko: "인기 웹툰을 책으로 엮은 단행본입니다. 만화 팬들에게 좋은 선물입니다.", en: "Webtoon Books are collected editions of popular webtoons, making great gifts for comic fans.", ja: "인기 웹툰을 책으로 엮은 단행본입니다. 만화 팬들에게 좋은 선물입니다。" } },
        { name: { ko: "연예인 화보집", en: "Celebrity Photobook", ja: "芸能人写真集" }, category: "K-POP 굿즈", description: { ko: "좋아하는 연예인의 아름다운 사진이 담긴 화보집입니다. 팬들에게 소장 가치가 높습니다.", en: "Celebrity Photobook features beautiful photos of favorite celebrities, highly collectible for fans.", ja: "좋아하는 연예인의 아름다운 사진이 담긴 화보집입니다. 팬들에게 소장 가치가 높습니다。" } },
        { name: { ko: "드라마 DVD", en: "Drama DVD", ja: "ドラマDVD" }, category: "K-POP 굿즈", description: { ko: "인기 한국 드라마를 소장할 수 있는 DVD입니다. 다시 보고 싶은 명장면을 언제든 감상할 수 있습니다.", en: "Drama DVD allows you to own popular Korean dramas, watch memorable scenes anytime you want.", ja: "인기 한국 드라마를 소장할 수 있는 DVD입니다. 다시 보고 싶은 명장면을 언제든 감상할 수 있습니다。" } },
        { name: { ko: "OST 앨범", en: "OST Album", ja: "OSTアルバム" }, category: "K-POP 굿즈", description: { ko: "인기 드라마나 영화의 배경 음악이 담긴 앨범입니다. 감동적인 순간을 음악으로 다시 느낄 수 있습니다.", en: "OST Album contains background music from popular dramas or movies, allowing you to relive emotional moments through music.", ja: "인기 드라마나 영화의 배경 음악이 담긴 앨범입니다. 감동적인 순간을 음악으로 다시 느낄 수 있습니다。" } },
        { name: { ko: "키링", en: "Keyring", ja: "キーリング" }, category: "K-POP 굿즈", description: { ko: "다양한 캐릭터나 아이돌 로고가 새겨진 열쇠고리입니다. 가방이나 열쇠에 달아 포인트를 줄 수 있습니다.", en: "Keyring features various characters or idol logos, can be attached to bags or keys for a personal touch.", ja: "다양한 캐릭터나 아이돌 로고가 새겨진 열쇠고리입니다. 가방이나 열쇠에 달아 포인트를 줄 수 있습니다。" } },
        { name: { ko: "스티커", en: "Stickers", ja: "ステッカー" }, category: "K-POP 굿즈", description: { ko: "다양한 디자인과 캐릭터 스티커입니다. 다이어리, 노트북 등을 꾸미는 데 활용할 수 있습니다.", en: "Stickers come in various designs and characters, useful for decorating diaries, laptops, and more.", ja: "다양한 디자인과 캐릭터 스티커입니다. 다이어리, 노트북 등을 꾸미는 데 활용할 수 있습니다。" } },
        { name: { ko: "인형", en: "Doll", ja: "人形" }, category: "K-POP 굿즈", description: { ko: "귀여운 한국 캐릭터나 아이돌 인형입니다. 소장 가치가 높으며 선물용으로도 좋습니다.", en: "Doll features cute Korean characters or idol figures, highly collectible and great as a gift.", ja: "귀여운 한국 캐릭터나 아이돌 인형입니다. 소장 가치가 높으며 선물용으로도 좋습니다。" } },
        { name: { ko: "공식 굿즈", en: "Official Goods", ja: "公式グッズ" }, category: "K-POP 굿즈", description: { ko: "아이돌 그룹이나 연예인의 공식 로고가 새겨진 상품입니다. 팬심을 표현하는 데 필수 아이템입니다.", en: "Official Goods are merchandise featuring the official logos of idol groups or celebrities, essential for expressing fan devotion.", ja: "아이돌 그룹이나 연예인의 공식 로고가 새겨진 상품입니다. 팬심을 표현하는 데 필수 아이템입니다。" } },

        // 전통 상품
        { name: { ko: "부채", en: "Folding Fan", ja: "扇子" }, category: "전통 상품", description: { ko: "아름다운 그림이나 글씨가 새겨진 한국의 전통 부채입니다. 여름철 시원함을 선사하며 장식용으로도 좋습니다.", en: "Folding Fan is a traditional Korean fan adorned with beautiful paintings or calligraphy, providing coolness in summer and serving as a decorative item.", ja: "아름다운 그림이나 글씨가 새겨진 한국의 전통 부채입니다. 여름철 시원함을 선사하며 장식용으로도 좋습니다。" } },
        { name: { ko: "복주머니", en: "Lucky Pouch", ja: "福巾着" }, category: "전통 상품", description: { ko: "새해에 복을 기원하며 주고받는 한국의 전통 주머니입니다. 복을 담는다는 의미가 있습니다.", en: "Lucky Pouch is a traditional Korean pouch exchanged during the New Year to wish for good fortune, symbolizing the collection of blessings.", ja: "새해에 복을 기원하며 주고받는 한국의 전통 주머니입니다. 복을 담는다는 의미가 있습니다。" } },
        { name: { ko: "도장", en: "Traditional Stamp", ja: "伝統的な判子" }, category: "전통 상품", description: { ko: "한국인의 이름이 새겨진 개인 도장입니다. 문서 서명 시 사용되며, 기념품으로도 인기가 많습니다.", en: "Traditional Stamp is a personal seal engraved with a Korean name, used for document signatures and popular as a souvenir.", ja: "한국인의 이름이 새겨진 개인 도장입니다. 문서 서명 시 사용되며, 기념품으로도 인기가 많습니다。" } },
        { name: { ko: "전통 젓가락과 숟가락 세트", en: "Chopsticks & Spoon Set", ja: "伝統的な箸とスプーンセット" }, category: "전통 상품", description: { ko: "한국의 전통 문양이 새겨진 젓가락과 숟가락 세트입니다. 실용적이면서도 아름다운 선물입니다.", en: "Chopsticks & Spoon Set features traditional Korean patterns, a practical yet beautiful gift.", ja: "한국의 전통 문양이 새겨진 젓가락과 숟가락 세트입니다. 실용적이면서도 아름다운 선물입니다。" } },
        { name: { ko: "나전칠기 보석함", en: "Najeonchilgi Jewelry Box", ja: "螺鈿漆器の宝石箱" }, category: "전통 상품", description: { ko: "자개로 섬세하게 장식된 한국의 전통 보석함입니다. 고급스러운 선물로 좋습니다.", en: "Najeonchilgi Jewelry Box is a traditional Korean jewelry box exquisitely adorned with mother-of-pearl, making for a luxurious gift.", ja: "자개로 섬세하게 장식된 한국의 전통 보석함입니다. 고급스러운 선물로 좋습니다。" } },
        { name: { ko: "한지 공예품", en: "Hanji Crafts", ja: "韓紙工芸品" }, category: "전통 상품", description: { ko: "닥나무로 만든 한국 전통 종이인 한지로 만든 공예품입니다. 아름다운 색감과 독특한 질감이 특징입니다.", en: "Hanji Crafts are artworks made from Hanji, traditional Korean paper derived from mulberry trees, characterized by beautiful colors and unique textures.", ja: "닥나무로 만든 한국 전통 종이인 한지로 만든 공예품입니다. 아름다운 색감과 독특한 질감이 특징입니다。" } },
        { name: { ko: "민화 그림", en: "Minhwa Painting", ja: "민화" }, category: "전통 상품", description: { ko: "한국의 서민들이 그리던 그림으로, 해학적이고 자유로운 표현이 특징입니다. 복을 기원하는 의미가 담겨 있습니다.", en: "Minhwa Painting refers to Korean folk paintings, characterized by their humorous and free expressions, often carrying wishes for good fortune.", ja: "한국의 서민들이 그리던 그림으로, 해학적이고 자유로운 표현이 특징입니다. 복을 기원하는 의미가 담겨 있습니다。" } },
        { name: { ko: "탈", en: "Traditional Mask", ja: "伝統的な仮面" }, category: "전통 상품", description: { ko: "한국의 전통 공연에서 사용되던 가면입니다. 다양한 표정과 색감으로 해학적인 아름다움을 표현합니다.", en: "Traditional Mask is a mask used in Korean traditional performances, expressing humorous beauty with various expressions and colors.", ja: "한국의 전통 공연에서 사용되던 가면입니다. 다양한 표정과 색감으로 해학적인 아름다움을 표현합니다。" } },
        { name: { ko: "촛대", en: "Candlestick", ja: "燭台" }, category: "전통 상품", description: { ko: "한국의 전통 문양이나 디자인이 적용된 촛대입니다. 인테리어 소품으로 활용하기 좋습니다.", en: "Candlestick features traditional Korean patterns or designs, excellent for use as an interior decoration item.", ja: "한국의 전통 문양이나 디자인이 적용된 촛대입니다. 인테리어 소품으로 활용하기 좋습니다。" } },
        { name: { ko: "다기 세트", en: "Tea Set", ja: "茶器セット" }, category: "전통 상품", description: { ko: "한국의 전통 차를 즐길 수 있는 다기 세트입니다. 도자기의 아름다움을 느낄 수 있습니다.", en: "Tea Set allows you to enjoy traditional Korean tea, appreciating the beauty of its ceramics.", ja: "한국의 전통 차를 즐길 수 있는 다기 세트입니다. 도자기의 아름다움을 느낄 수 있습니다。" } },
        { name: { ko: "소반", en: "Small Dining Table", ja: "小盤" }, category: "전통 상품", description: { ko: "작고 아담한 한국의 전통 밥상입니다. 차를 마시거나 간단한 다과를 즐길 때 사용합니다.", en: "Small Dining Table is a compact and charming traditional Korean dining table, used for drinking tea or enjoying light refreshments.", ja: "작고 아담한 한국의 전통 밥상입니다. 차를 마시거나 간단한 다과를 즐길 때 사용합니다。" } },
        { name: { ko: "보자기", en: "Bojagi (Wrapping Cloth)", ja: "風呂敷" }, category: "전통 상품", description: { ko: "물건을 싸거나 덮는 데 사용하는 한국의 전통 보자기로, 아름다운 색감과 조각보 디자인이 특징입니다.", en: "Bojagi is a traditional Korean wrapping cloth used for wrapping or covering items, characterized by beautiful colors and patchwork designs.", ja: "물건을 싸거나 덮는 데 사용하는 한국의 전통 보자기로, 아름다운 색감과 조각보 디자인이 특징입니다。" } },
        { name: { ko: "자개 거울", en: "Mother-of-pearl Mirror", ja: "螺鈿の鏡" }, category: "전통 상품", description: { ko: "자개로 섬세하게 장식된 거울입니다. 전통 공예의 아름다움을 느낄 수 있습니다.", en: "Mother-of-pearl Mirror is a mirror delicately adorned with mother-of-pearl, allowing you to appreciate the beauty of traditional craftsmanship.", ja: "자개로 섬세하게 장식된 거울입니다. 전통 공예의 아름다움을 느낄 수 있습니다。" } },
        { name: { ko: "책갈피", en: "Bookmark", ja: "しおり" }, category: "전통 상품", description: { ko: "한국의 전통 문양이나 그림이 새겨진 책갈피입니다. 독서를 즐기는 사람들에게 좋은 선물입니다.", en: "Bookmark features traditional Korean patterns or drawings, making it a great gift for book lovers.", ja: "한국의 전통 문양이나 그림이 새겨진 책갈피입니다. 독서를 즐기는 사람들에게 좋은 선물입니다。" } },
        { name: { ko: "연", en: "Kite", ja: "凧" }, category: "전통 상품", description: { ko: "한국의 전통적인 연으로, 다양한 형태와 색깔로 하늘을 아름답게 수놓습니다. 아이들과 함께 즐기기 좋습니다.", en: "Kite is a traditional Korean kite, adorning the sky with various shapes and colors, great for enjoying with children.", ja: "한국의 전통적인 연으로, 다양한 형태와 색깔로 하늘을 아름답게 수놓습니다. 아이들과 함께 즐기기 좋습니다。" } },
        { name: { ko: "제기", en: "Jegi", ja: "チェギ" }, category: "전통 상품", description: { ko: "전통 놀이인 제기차기에 사용되는 도구입니다. 발로 차서 땅에 떨어뜨리지 않고 오래 버티는 놀이입니다.", en: "Jegi is a tool used in the traditional Korean game of Jegichagi, where players kick it to keep it from falling to the ground for as long as possible.", ja: "전통 놀이인 제기차기에 사용되는 도구입니다. 발로 차서 땅에 떨어뜨리지 않고 오래 버티는 놀이입니다。" } },
        { name: { ko: "윷놀이 세트", en: "Yut Nori Set", ja: "ユンノリセット" }, category: "전통 상품", description: { ko: "한국의 전통 보드게임인 윷놀이를 즐길 수 있는 세트입니다. 가족이나 친구들과 함께 즐기기 좋습니다.", en: "Yut Nori Set allows you to enjoy Yut Nori, a traditional Korean board game, great for playing with family or friends.", ja: "한국의 전통 보드게임인 윷놀이를 즐길 수 있는 세트입니다. 가족이나 친구들과 함께 즐기기 좋습니다。" } },
        { name: { ko: "공기놀이", en: "Gonggi Nori", ja: "コンギノリ" }, category: "전통 상품", description: { ko: "작은 돌이나 플라스틱 조각을 가지고 노는 한국의 전통 놀이입니다. 순발력과 집중력을 기르기 좋습니다.", en: "Gonggi Nori is a traditional Korean game played with small stones or plastic pieces, great for developing agility and concentration.", ja: "작은 돌이나 플라스틱 조각을 가지고 노는 한국의 전통 놀이입니다. 순발력과 집중력을 기르기 좋습니다。" } },
        { name: { ko: "매듭 팔찌", en: "Knot Bracelet", ja: "結び目のブレスレット" }, category: "전통 상품", description: { ko: "한국의 전통 매듭 방식으로 만든 팔찌입니다. 소박하면서도 아름다운 멋이 특징입니다.", en: "Knot Bracelet is a bracelet made using traditional Korean knotting techniques, characterized by its simple yet beautiful charm.", ja: "한국의 전통 매듭 방식으로 만든 팔찌입니다. 소박하면서도 아름다운 멋이 특징입니다。" } },
        { name: { ko: "한글 디자인 상품", en: "Hangeul Design Goods", ja: "ハングルデザイングッズ" }, category: "전통 상품", description: { ko: "아름다운 한글 폰트나 디자인을 활용한 상품입니다. 한국의 문화를 알리는 데 좋습니다.", en: "Hangeul Design Goods are products utilizing beautiful Hangeul fonts or designs, great for promoting Korean culture.", ja: "아름다운 한글 폰트나 디자인을 활용한 상품입니다. 한국의 문화를 알리는 데 좋습니다。" } },
        { name: { ko: "훈민정음 손수건", en: "Hunminjeongeum Handkerchief", ja: "訓民正音のハンカチ" }, category: "전통 상품", description: { ko: "훈민정음 서문을 새긴 손수건입니다. 한국의 역사와 문화를 느낄 수 있는 의미 있는 선물입니다.", en: "Hunminjeongeum Handkerchief features the preface of Hunminjeongeum, a meaningful gift that conveys Korean history and culture.", ja: "훈민정음 서문을 새긴 손수건입니다. 한국의 역사와 문화를 느낄 수 있는 의미 있는 선물입니다。" } },
        { name: { ko: "거북선 모형", en: "Geobukseon Model", ja: "亀甲船の模型" }, category: "전통 상품", description: { ko: "조선 시대 이순신 장군이 만든 거북선 모형입니다. 한국의 역사와 과학 기술을 엿볼 수 있습니다.", en: "Geobukseon Model is a replica of the Turtle Ship created by Admiral Yi Sun-sin during the Joseon Dynasty, offering a glimpse into Korean history and technology.", ja: "조선 시대 이순신 장군이 만든 거북선 모형입니다. 한국의 역사와 과학 기술을 엿볼 수 있습니다。" } },
        { name: { ko: "첨성대 모형", en: "Cheomseongdae Model", ja: "瞻星台の模型" }, category: "전통 상품", description: { ko: "신라 시대에 만들어진 천문 관측대인 첨성대 모형입니다. 한국의 고대 과학 기술을 보여줍니다.", en: "Cheomseongdae Model is a replica of the astronomical observatory built during the Silla Dynasty, showcasing ancient Korean scientific technology.", ja: "신라 시대에 만들어진 천문 관측대인 첨성대 모형입니다. 한국의 고대 과학 기술을 보여줍니다。" } },
        { name: { ko: "기와집 모형", en: "Giwajip Model", ja: "瓦屋根の家の模型" }, category: "전통 상품", description: { ko: "한국의 전통 가옥인 기와집 모형입니다. 한국적인 아름다움과 정교함을 느낄 수 있습니다.", en: "Giwajip Model is a replica of a traditional Korean tiled-roof house, allowing you to appreciate Korean beauty and intricate craftsmanship.", ja: "한국의 전통 가옥인 기와집 모형입니다. 한국적인 아름다움과 정교함을 느낄 수 있습니다。" } },
        { name: { ko: "전통 문양 텀블러", en: "Traditional Pattern Tumbler", ja: "伝統文様のタンブラー" }, category: "전통 상품", description: { ko: "한국의 전통 문양이 새겨진 텀블러입니다. 실용적이면서도 한국적인 멋을 느낄 수 있습니다.", en: "Traditional Pattern Tumbler features traditional Korean patterns, offering a practical item with Korean charm.", ja: "한국의 전통 문양이 새겨진 텀블러입니다. 실용적이면서도 한국적인 멋을 느낄 수 있습니다。" } }
    ];

    const souvenirs = initialSouvenirs.map(s => {
        const imageUrlPrefix = 'https://raw.githubusercontent.com/snowingx5-boop/product-builder-lecture/main/public/images/';
        let imageUrl = '';
        const koName = s.name.ko;

        // Special handling for the three existing images
        if (koName === '김치') {
            imageUrl = imageUrlPrefix + 'kimchi.jpg';
        } else if (koName === '고추장') {
            imageUrl = imageUrlPrefix + 'gochujang.jpg';
        } else if (koName === '된장') {
            imageUrl = imageUrlPrefix + 'doenjang.jpg';
        } else {
            // For all other souvenirs, use the slugified name
            imageUrl = imageUrlPrefix + slugify(koName) + '.jpg';
        }
        return { ...s, imageUrl: imageUrl };
    });

    // Modal elements
    const souvenirModal = document.getElementById('souvenirModal');
    const closeButton = document.querySelector('.close-button');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');

    const grid = document.querySelector('.souvenir-grid');
    const categoryLinks = document.querySelectorAll('.dropdown-menu a[data-category]');
    const langSwitcherLinks = document.querySelectorAll('#lang-switcher a');

    function renderItems(items) {
        grid.innerHTML = '';
        items.forEach(souvenir => {
            const item = document.createElement('div');
            item.className = 'souvenir-item';
            item.dataset.souvenir = JSON.stringify(souvenir); // Store souvenir data

            const nameSpan = document.createElement('span');
            nameSpan.textContent = souvenir.name[currentLang];
            item.appendChild(nameSpan);

            // Use the imageUrl property
            if (souvenir.imageUrl) {
                item.style.backgroundImage = `url('${souvenir.imageUrl}')`;
                item.style.backgroundSize = 'cover';
                item.style.backgroundPosition = 'center';
                nameSpan.style.color = 'white'; // Keep text visible on image
                nameSpan.style.textShadow = '1px 1px 2px rgba(0,0,0,0.7)'; // Keep text visible on image
            }
            grid.appendChild(item);
        });
        
        // Add event listeners for modal
        document.querySelectorAll('.souvenir-item').forEach(item => {
            item.addEventListener('click', function() {
                const souvenir = JSON.parse(this.dataset.souvenir);
                showModal(souvenir);
            });
        });
    }

    function showModal(souvenir) {
        modalTitle.textContent = souvenir.name[currentLang];
        modalDescription.textContent = souvenir.description[currentLang];
        souvenirModal.style.display = 'flex';
    }

    function closeModal() {
        souvenirModal.style.display = 'none';
    }

    // Close modal when clicking on the close button
    closeButton.addEventListener('click', closeModal);

    // Close modal when clicking anywhere outside of the modal content
    window.addEventListener('click', function(event) {
        if (event.target == souvenirModal) {
            closeModal();
        }
    });

    function updateLanguage(lang) {
        currentLang = lang;
        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.getAttribute('data-translate-key');
            if (translations[key] && translations[key][lang]) {
                if (el.tagName === 'INPUT' && el.type === 'search') {
                    // Search input is removed
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

    // Initial Render
    updateLanguage(currentLang); 
});