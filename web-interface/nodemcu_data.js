//kodlar zaman içerisinde değişiklik gösterecek
fetch(SERVER_URL, {
  method: "GET",
})
  .then((res) => {
    if (!res.ok) {
      throw new Error("HTTP Error " + res.status);
    }
    return res.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Fetch Hatası : ", error);
  });
  window.onload = function() {
    fetchData();
    setInterval(fetchData, 5000); // Her 5 saniyede bir veriyi güncelle
};
