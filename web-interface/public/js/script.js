const timeline = document.querySelector("#timeline");
const waterBtn = document.querySelector("#waterBtn");
const settingBtn = document.querySelector("#settingBtn");
const settingDetail = document.querySelector("#settingDetail");

let time = 0;

settingBtn.addEventListener("click", () => {
  if (settingDetail.classList.contains("hidden")) {
    settingDetail.classList.remove("hidden");
  } else {
    settingDetail.classList.add("hidden");
  }
});

waterBtn.addEventListener("click", () => {
  if (time != 0) {
    time = 0;
  }
});

setInterval(() => {
  time += 1;
  timeline.innerHTML = `${time}`;
}, 1000);
