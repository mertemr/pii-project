//kodlar zaman içerisinde değişiklik gösterecek
fetch("modemcu_url")
.then(response => {
    if(!response.ok){
        throw new Error ("HTTP Error " + response.status);
    }
    return response.json();
})
.then(jsonResponse => {
    var contentDetail = document.getElementById('contentDetail');
    contentDetail.innerHTML = JSON.stringify(jsonResponse,null,2)
})
.catch(error => {
    console.error("Fetch Hatası : ",error);
})