const gameData = {
  "忘憂": {
    question: "金針花又被稱為什麼，象徵放下煩惱？",
    answers: ["忘憂草", "玫瑰花", "向日葵"],
    correct: "忘憂草",
    message: "答對了！金針花又名忘憂草，象徵忘卻憂愁。"
  },
  "母愛": {
    question: "萱草在傳統文化中常象徵什麼？",
    answers: ["母愛與思念", "戰爭與勝利", "財富與權力"],
    correct: "母愛與思念",
    message: "答對了！萱草常代表母親、關懷與思念。"
  },
  "喜悅": {
    question: "金針花鮮明的橙黃色常讓人聯想到什麼感受？",
    answers: ["喜悅與希望", "寒冷與孤單", "神祕與恐懼"],
    correct: "喜悅與希望",
    message: "答對了！明亮花色讓金針花帶有喜悅意象。"
  },
  "思念": {
    question: "古典詩詞中的萱草意象，常寄託哪一種情感？",
    answers: ["對家人的牽掛", "對比賽的緊張", "對城市的陌生"],
    correct: "對家人的牽掛",
    message: "答對了！萱草常被用來表達遊子對家人的思念。"
  }
};

const startButton = document.querySelector("#startGame");
const arView = document.querySelector(".ar-view");
const arStatus = document.querySelector("#arStatus");
const progressText = document.querySelector("#progressText");
const progressFill = document.querySelector("#progressFill");
const petals = document.querySelectorAll(".petal");
const quizModal = document.querySelector("#quizModal");
const quizQuestion = document.querySelector("#quizQuestion");
const answerList = document.querySelector("#answerList");
const quizFeedback = document.querySelector("#quizFeedback");
const closeQuiz = document.querySelector("#closeQuiz");

let activePetal = null;
let collected = new Set();

function updateProgress() {
  const total = petals.length;
  const count = collected.size;
  const percent = total === 0 ? 0 : (count / total) * 100;

  progressFill.style.width = `${percent}%`;

  if (count === 0) {
    progressText.textContent = "任務進度：0 / 4";
  } else if (count < total) {
    progressText.textContent = `任務進度：${count} / 4，繼續收集文化花瓣`;
  } else {
    progressText.textContent = "任務完成：已解鎖金針花文化小檔案";
    arStatus.textContent = "恭喜完成忘憂花瓣 AR 探索任務！";
  }
}

function openQuiz(label) {
  activePetal = label;
  const data = gameData[label];

  quizQuestion.textContent = data.question;
  quizFeedback.textContent = "";
  answerList.innerHTML = "";

  data.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = answer;
    button.addEventListener("click", () => checkAnswer(answer));
    answerList.appendChild(button);
  });

  quizModal.classList.add("open");
  quizModal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  quizModal.classList.remove("open");
  quizModal.setAttribute("aria-hidden", "true");
}

function checkAnswer(answer) {
  const data = gameData[activePetal];

  if (answer !== data.correct) {
    quizFeedback.textContent = "再想想看，這題和金針花的文化象徵有關。";
    return;
  }

  collected.add(activePetal);
  document
    .querySelector(`[data-answer="${activePetal}"]`)
    .classList.add("collected");

  quizFeedback.textContent = data.message;
  arStatus.textContent = `已收集「${activePetal}」花瓣。`;
  updateProgress();

  window.setTimeout(closeModal, 900);
}

if (startButton && arView) {
  startButton.addEventListener("click", () => {
    arView.classList.add("ar-active");
    arStatus.textContent = "AR 掃描啟動，點擊畫面中的文化花瓣回答問題。";
    collected = new Set();
    petals.forEach((petal) => petal.classList.remove("collected"));
    updateProgress();
  });
}

petals.forEach((petal) => {
  petal.addEventListener("click", () => {
    if (!arView.classList.contains("ar-active")) {
      arStatus.textContent = "請先點擊「啟動 AR」開始任務。";
      return;
    }

    const label = petal.dataset.answer;
    if (!collected.has(label)) {
      openQuiz(label);
    }
  });
});

if (closeQuiz) {
  closeQuiz.addEventListener("click", closeModal);
}

if (quizModal) {
  quizModal.addEventListener("click", (event) => {
    if (event.target === quizModal) {
      closeModal();
    }
  });
}
const daylilyModel = document.querySelector("#daylilyModel");

if (daylilyModel) {
  daylilyModel.addEventListener("load", () => {
    const animations = daylilyModel.availableAnimations || [];

    if (animations.length > 0) {
      daylilyModel.animationName = animations[0];
      daylilyModel.play();
    }
  });
}
