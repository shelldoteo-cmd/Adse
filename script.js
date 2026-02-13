const heavenlyStems = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"];
const earthlyBranches = ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"];

const elementCycle = ["목", "화", "토", "금", "수"];
const elementDescriptions = {
  목: "성장과 확장의 기운이 강합니다. 새로운 시도를 두려워하지 않는 편입니다.",
  화: "열정과 표현력이 돋보입니다. 사람들과의 교류에서 힘을 얻는 타입입니다.",
  토: "안정감과 균형 감각이 좋습니다. 꾸준함으로 성과를 만드는 성향입니다.",
  금: "분석력과 결단력이 강합니다. 기준이 명확해 신뢰를 얻기 쉽습니다.",
  수: "지혜와 통찰이 좋은 편입니다. 유연하게 상황을 읽는 능력이 뛰어납니다.",
};

function getYearPillar(year) {
  const stemIndex = (year - 4) % 10;
  const branchIndex = (year - 4) % 12;
  return `${heavenlyStems[stemIndex]}${earthlyBranches[branchIndex]}`;
}

function getElementByHour(hour) {
  return elementCycle[hour % 5];
}

function getCompatibilityTips(element) {
  const tips = {
    목: ["창업/기획 분야", "자기계발 루틴 강화", "봄철 활동성 활용"],
    화: ["브랜딩/마케팅", "대인관계 확장", "여름철 집중 프로젝트"],
    토: ["운영/관리 직무", "자산관리 계획", "중장기 목표 설정"],
    금: ["데이터/재무 분야", "원칙 기반 의사결정", "가을철 정리 습관"],
    수: ["연구/콘텐츠 분야", "학습과 기록", "겨울철 내실 다지기"],
  };

  return tips[element];
}

function renderResult({ name, pillar, element, gender }) {
  const result = document.getElementById("result");
  const genderText = {
    male: "남성",
    female: "여성",
    other: "기타",
  }[gender];

  const tips = getCompatibilityTips(element)
    .map((tip) => `<li class="tag">${tip}</li>`)
    .join("");

  result.innerHTML = `
    <h2 class="result-title">${name}님의 사주풀이 결과</h2>
    <p><strong>연주(년주):</strong> ${pillar}</p>
    <p><strong>핵심 오행:</strong> ${element}</p>
    <p><strong>성별:</strong> ${genderText}</p>
    <p>${elementDescriptions[element]}</p>
    <h3>추천 방향</h3>
    <ul class="tag-list">${tips}</ul>
    <small>※ 본 결과는 데모용 간이 해석입니다.</small>
  `;

  result.classList.remove("hidden");
}

document.getElementById("saju-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const birthDateValue = document.getElementById("birthDate").value;
  const birthHour = Number(document.getElementById("birthHour").value);
  const gender = document.getElementById("gender").value;

  if (!name || !birthDateValue || Number.isNaN(birthHour) || birthHour < 0 || birthHour > 23) {
    alert("입력값을 다시 확인해주세요.");
    return;
  }

  const birthDate = new Date(birthDateValue);
  const year = birthDate.getFullYear();

  renderResult({
    name,
    pillar: getYearPillar(year),
    element: getElementByHour(birthHour),
    gender,
  });
});
