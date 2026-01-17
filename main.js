document.addEventListener('DOMContentLoaded', function() {
    const souvenirs = [
        // 식품
        { name: "김치", category: "식품" }, { name: "고추장", category: "식품" }, { name: "된장", category: "식품" },
        { name: "쌈장", category: "식품" }, { name: "신라면", category: "식품" }, { name: "불닭볶음면", category: "식품" },
        { name: "짜파게티", category: "식품" }, { name: "초코파이", category: "식품" }, { name: "빼빼로", category: "식품" },
        { name: "허니버터 아몬드", category: "식품" }, { name: "맛김", category: "식품" }, { name: "막걸리", category: "식품" },
        { name: "소주", category: "식품" }, { name: "바나나맛 우유", category: "식품" }, { name: "식혜", category: "식품" },
        { name: "수정과", category: "식품" }, { name: "약과", category: "식품" }, { name: "붕어빵", category: "식품" },
        { name: "호떡", category: "식품" }, { name: "떡볶이 키트", category: "식품" }, { name: "인삼차", category: "식품" },
        { name: "유자차", category: "식품" }, { name: "한과", category: "식품" }, { name: "전통주", category: "식품" },
        { name: "김부각", category: "식품" },
        // 화장품
        { name: "마스크팩", category: "화장품" }, { name: "핸드크림", category: "화장품" }, { name: "BB크림", category: "화장품" },
        { name: "쿠션 파운데이션", category: "화장품" }, { name: "달팽이 크림", category: "화장품" }, { name: "필링젤", category: "화장품" },
        { name: "립 틴트", category: "화장품" }, { name: "수분 크림", category: "화장품" }, { name: "선크림", category: "화장품" },
        { name: "클렌징폼", category: "화장품" }, { name: "토너", category: "화장품" }, { name: "에센스", category: "화장품" },
        { name: "아이크림", category: "화장품" }, { name: "네일 스티커", category: "화장품" }, { name: "코팩", category: "화장품" },
        { name: "풋 마스크", category: "화장품" }, { name: "헤어 에센스", category: "화장품" }, { name: "알로에젤", category: "화장품" },
        { name: "블러셔", category: "화장품" }, { name: "아이섀도 팔레트", category: "화장품" },
        // 의류
        { name: "개량 한복", category: "의류" }, { name: "캐릭터 양말", category: "의류" }, { name: "K-POP 아이돌 티셔츠", category: "의류" },
        { name: "동대문표 옷", category: "의류" }, { name: "꽃신", category: "의류" }, { name: "비녀", category: "의류" },
        { name: "노리개", category: "의류" }, { name: "한국적인 디자인의 스카프", category: "의류" }, { name: "네임택", category: "의류" },
        { name: "에코백", category: "의류" }, { name: "볼캡", category: "의류" }, { name: "등산복", category: "의류" },
        { name: "실내용 슬리퍼", category: "의류" }, { name: "잠옷", category: "의류" }, { name: "커플티", category: "의류" },
        // K-POP 굿즈
        { name: "아이돌 앨범", category: "K-POP 굿즈" }, { name: "응원봉", category: "K-POP 굿즈" }, { name: "포토카드", category: "K-POP 굿즈" },
        { name: "BT21 상품", category: "K-POP 굿즈" }, { name: "카카오프렌즈 상품", category: "K-POP 굿즈" }, { name: "라인프렌즈 상품", category: "K-POP 굿즈" },
        { name: "뽀로로 상품", category: "K-POP 굿즈" }, { name: "웹툰 단행본", category: "K-POP 굿즈" }, { name: "연예인 화보집", category: "K-POP 굿즈" },
        { name: "드라마 DVD", category: "K-POP 굿즈" }, { name: "OST 앨범", category: "K-POP 굿즈" }, { name: "키링", category: "K-POP 굿즈" },
        { name: "스티커", category: "K-POP 굿즈" }, { name: "인형", category: "K-POP 굿즈" }, { name: "공식 굿즈", category: "K-POP 굿즈" },
        // 전통 상품
        { name: "부채", category: "전통 상품" }, { name: "복주머니", category: "전통 상품" }, { name: "도장", category: "전통 상품" },
        { name: "전통 젓가락과 숟가락 세트", category: "전통 상품" }, { name: "나전칠기 보석함", category: "전통 상품" }, { name: "한지 공예품", category: "전통 상품" },
        { name: "민화 그림", category: "전통 상품" }, { name: "탈", category: "전통 상품" }, { name: "촛대", category: "전통 상품" },
        { name: "다기 세트", category: "전통 상품" }, { name: "소반", category: "전통 상품" }, { name: "보자기", category: "전통 상품" },
        { name: "자개 거울", category: "전통 상품" }, { name: "책갈피", category: "전통 상품" }, { name: "연", category: "전통 상품" },
        { name: "제기", category: "전통 상품" }, { name: "윷놀이 세트", category: "전통 상품" }, { name: "공기놀이", category: "전통 상품" },
        { name: "매듭 팔찌", category: "전통 상품" }, { name: "한글 디자인 상품", category: "전통 상품" }, { name: "훈민정음 손수건", category: "전통 상품" },
        { name: "거북선 모형", category: "전통 상품" }, { name: "첨성대 모형", category: "전통 상품" }, { name: "기와집 모형", category: "전통 상품" },
        { name: "전통 문양 텀블러", category: "전통 상품" }
    ];

    const grid = document.querySelector('.souvenir-grid');
    const categoryLinks = document.querySelectorAll('.dropdown-menu a');

    function renderItems(items) {
        grid.innerHTML = '';
        items.forEach(souvenir => {
            const item = document.createElement('div');
            item.className = 'souvenir-item';
            if (souvenir.name === '김치') {
                item.id = 'souvenir-kimchi'; // Add specific ID for kimchi
            }
            item.textContent = souvenir.name;
            grid.appendChild(item);
        });
    }

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

    // 초기 로드 시 모든 아이템 표시
    renderItems(souvenirs);

    // 맨 위로 가기 버튼 로직
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
    window.onscroll = function() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    };

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
});
