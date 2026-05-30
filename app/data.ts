export type NewsArticle = {
  slug: string;
  date: string;
  weekday: string;
  category: string;
  level: string;
  titleJa: string;
  titleKo: string;
  summary: string;
  source: string;
  sourceUrl: string;
  words: {
    ja: string;
    furigana: string;
    ko: string;
  }[];
  grammar: {
    pattern: string;
    meaning: string;
    exampleJa: string;
    exampleKo: string;
  }[];
  sentences: {
    ja: string;
    ko: string;
  }[];
};

export const articles: NewsArticle[] = [
  {
    slug: "2026-05-28-regional-tourism",
    date: "2026.05.28",
    weekday: "WED",
    category: "사회",
    level: "N3-N1",
    titleJa: "地方観光、学びの旅として再注目",
    titleKo: "지역 관광, 배움의 여행으로 다시 주목",
    summary:
      "일본 각지의 지역 관광이 단순한 방문을 넘어 역사와 생활문화를 배우는 체험형 프로그램으로 확장되고 있습니다.",
    source: "NHK NEWS WEB",
    sourceUrl: "https://www3.nhk.or.jp/news/",
    words: [
      { ja: "地方", furigana: "ちほう", ko: "지방, 지역" },
      { ja: "観光", furigana: "かんこう", ko: "관광" },
      { ja: "再注目", furigana: "さいちゅうもく", ko: "재주목" },
      { ja: "体験型", furigana: "たいけんがた", ko: "체험형" },
      { ja: "取り組み", furigana: "とりくみ", ko: "시도, 대처" },
      { ja: "背景", furigana: "はいけい", ko: "배경" },
    ],
    grammar: [
      {
        pattern: "〜として",
        meaning: "어떤 입장, 자격, 역할을 나타낼 때 사용합니다.",
        exampleJa: "地域の歴史を学ぶ機会として人気を集めています。",
        exampleKo: "지역의 역사를 배우는 기회로서 인기를 모으고 있습니다.",
      },
      {
        pattern: "〜をきっかけに",
        meaning: "어떤 일이 변화나 행동의 계기가 되었음을 나타냅니다.",
        exampleJa: "旅行をきっかけに日本語を学び始めました。",
        exampleKo: "여행을 계기로 일본어를 배우기 시작했습니다.",
      },
      {
        pattern: "〜だけでなく",
        meaning: "A뿐만 아니라 B도 해당한다는 확장 표현입니다.",
        exampleJa: "観光だけでなく、文化理解にもつながります。",
        exampleKo: "관광뿐만 아니라 문화 이해로도 이어집니다.",
      },
    ],
    sentences: [
      {
        ja: "日本各地で、地方観光を学びの旅として見直す動きが広がっています。",
        ko: "일본 각지에서 지역 관광을 배움의 여행으로 다시 바라보는 움직임이 확산되고 있습니다.",
      },
      {
        ja: "参加者は名所を訪れるだけでなく、地域の人々から歴史や生活文化を学びます。",
        ko: "참가자는 명소를 방문하는 데 그치지 않고 지역 사람들에게서 역사와 생활문화를 배웁니다.",
      },
      {
        ja: "自治体はこうした取り組みを通じて、滞在時間の増加を期待しています。",
        ko: "지자체는 이러한 시도를 통해 체류 시간 증가를 기대하고 있습니다.",
      },
    ],
  },
  {
    slug: "2026-05-27-workplace-japanese",
    date: "2026.05.27",
    weekday: "TUE",
    category: "비즈니스",
    level: "N2-N1",
    titleJa: "職場の日本語、敬語より文脈理解が鍵",
    titleKo: "직장 일본어, 경어보다 문맥 이해가 핵심",
    summary: "일본 기업 현장에서 실제 소통 능력을 높이기 위한 학습 방식이 주목받고 있습니다.",
    source: "MIYU EDIT",
    sourceUrl: "/news/2026-05-27-workplace-japanese",
    words: [
      { ja: "職場", furigana: "しょくば", ko: "직장" },
      { ja: "敬語", furigana: "けいご", ko: "경어" },
      { ja: "文脈", furigana: "ぶんみゃく", ko: "문맥" },
    ],
    grammar: [],
    sentences: [],
  },
  {
    slug: "2026-05-26-food-culture",
    date: "2026.05.26",
    weekday: "MON",
    category: "문화",
    level: "N4-N2",
    titleJa: "和食文化、海外の若者に広がる",
    titleKo: "일식 문화, 해외 청년층으로 확산",
    summary: "일본 음식 문화가 언어 학습과 함께 소비되는 현상이 이어지고 있습니다.",
    source: "MIYU EDIT",
    sourceUrl: "/news/2026-05-26-food-culture",
    words: [
      { ja: "和食", furigana: "わしょく", ko: "일식" },
      { ja: "海外", furigana: "かいがい", ko: "해외" },
      { ja: "若者", furigana: "わかもの", ko: "젊은이" },
    ],
    grammar: [],
    sentences: [],
  },
  {
    slug: "2026-05-25-study-abroad",
    date: "2026.05.25",
    weekday: "SUN",
    category: "유학",
    level: "N3-N1",
    titleJa: "留学準備、ニュース読解で語彙力強化",
    titleKo: "유학 준비, 뉴스 독해로 어휘력 강화",
    summary: "EJU와 대학 진학을 준비하는 학습자에게 시사 독해의 중요성이 커지고 있습니다.",
    source: "MIYU EDIT",
    sourceUrl: "/news/2026-05-25-study-abroad",
    words: [
      { ja: "留学", furigana: "りゅうがく", ko: "유학" },
      { ja: "読解", furigana: "どっかい", ko: "독해" },
      { ja: "語彙力", furigana: "ごいりょく", ko: "어휘력" },
    ],
    grammar: [],
    sentences: [],
  },
  {
    slug: "2026-05-24-weather-report",
    date: "2026.05.24",
    weekday: "SAT",
    category: "생활",
    level: "N5-N3",
    titleJa: "梅雨入り前、天気表現を確認",
    titleKo: "장마 전, 날씨 표현 확인",
    summary: "일상 회화와 뉴스에서 자주 등장하는 날씨 표현을 정리합니다.",
    source: "MIYU EDIT",
    sourceUrl: "/news/2026-05-24-weather-report",
    words: [
      { ja: "梅雨", furigana: "つゆ", ko: "장마" },
      { ja: "天気", furigana: "てんき", ko: "날씨" },
      { ja: "確認", furigana: "かくにん", ko: "확인" },
    ],
    grammar: [],
    sentences: [],
  },
];

export const featuredArticle = articles[0];
