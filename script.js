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

const immersiveTopics = {
  flower: {
    label: "Flower",
    title: "花朵：橘黃色的忘憂之花",
    text: "金針花花形多為漏斗狀或喇叭狀，橘黃色花瓣明亮醒目。單朵花通常只開一天左右，但整株會輪流開花，因此花季仍能持續數週。",
    photo: "images/immersive/IMG_7893.jpg",
    alt: "金針花正面近照"
  },

  bud: {
    label: "Bud",
    title: "花苞：食用金針菜的來源",
    text: "未開花的花苞可作為食用金針菜，常見料理包含金針排骨湯與炒金針。不過部分品種需經過適當處理才可安全食用。",
    photo: "images/immersive/IMG_7894.jpg",
    alt: "金針花花苞近照"
  },

  leaf: {
    label: "Leaf",
    title: "葉片：細長叢生的植株特徵",
    text: "金針花葉片細長，叢生於基部。它喜歡充足陽光，也能在半日照環境生長，適合排水良好的砂質土或壤土。",
    photo: "images/immersive/IMG_7895.jpg",
    alt: "金針花葉片與植株"
  },

  place: {
    label: "Campus",
    title: "校園位置：道路與綠地旁的花帶",
    text: "這一區金針花位於校園道路、步道與建築旁，周圍有樹木、草地與其他花卉，適合作為校園植物導覽的互動觀察點。",
    photo: "images/immersive/IMG_7898.jpg",
    alt: "金針花校園位置遠景"
  }
};

const immersiveViewer = document.querySelector(".immersive-viewer");
const immersiveScene = document.querySelector("#immersiveScene");
const immersiveLabel = document.querySelector("#immersiveLabel");
const immersiveTitle = document.querySelector("#immersiveTitle");
const immersiveText = document.querySelector("#immersiveText");
const immersivePhoto = document.querySelector("#immersivePhoto");
const hotspots = document.querySelectorAll(".hotspot");
const sceneButtons = document.querySelectorAll(".scene-strip button");

function setImmersiveTopic(topicName) {
  const topic = immersiveTopics[topicName];

  if (!topic) {
    return;
  }
  }

immersiveLabel.textContent = topic.label;
  immersiveTitle.textContent = topic.title;
  immersiveText.textContent = topic.text;
  immersivePhoto.src = topic.photo;
  immersivePhoto.alt = topic.alt;

   hotspots.forEach((hotspot) => {
    hotspot.classList.toggle("active", hotspot.dataset.topic === topicName);
});

hotspots.forEach((hotspot) => {
  hotspot.addEventListener("click", () => {
    setImmersiveTopic(hotspot.dataset.topic);
  });
});


  sceneButtons.forEach((button) => {
  button.addEventListener("click", () => {
    immersiveScene.src = button.dataset.scene;
  sceneButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

  if (immersiveViewer) {
      immersiveViewer.scrollTo({ left: immersiveViewer.scrollWidth * 0.42, behavior: "smooth" });
    }
  });
});

  if (sceneButtons.length > 1) {
  sceneButtons[1].classList.add("active");
}

if (immersiveViewer) {
  let isDragging = false;
  let startX = 0;
  let startScrollLeft = 0;

  immersiveViewer.addEventListener("pointerdown", (event) => {
    isDragging = true;
    immersiveViewer.setPointerCapture(event.pointerId);
    startX = event.clientX;
    startScrollLeft = immersiveViewer.scrollLeft;
  });


  immersiveViewer.addEventListener("pointermove", (event) => {
    if (!isDragging) {
      return;
    }

    const delta = event.clientX - startX;
    immersiveViewer.scrollLeft = startScrollLeft - delta;
  });

 immersiveViewer.addEventListener("pointerup", () => {
    isDragging = false;
  });

  immersiveViewer.addEventListener("pointercancel", () => {
    isDragging = false;
  });


    window.addEventListener("load", () => {
    immersiveViewer.scrollLeft = immersiveViewer.scrollWidth * 0.42;
  });
}