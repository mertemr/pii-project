const timeline = document.querySelector("#timeline");
const waterBtn = document.querySelector("#waterBtn");
const settingBtn = document.querySelector("#settingBtn");
const settingDetail = document.querySelector("#settingDetail");
const moisture = document.querySelector("#moisture");

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

function update_moisture() {
  fetch("/moisturelevel")
  .then((response) => {
    return response.text();
  }).then((data) => {
    moisture.innerHTML = JSON.parse(data).moisture_level;
  });
}

setInterval(() => {
  time += 1;
  timeline.innerHTML = `${time}`;
}, 1000);

setInterval(() => {
  update_moisture()
}, 10000);

update_moisture();