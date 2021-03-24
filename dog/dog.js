const type = document.getElementById('type');
const image = document.getElementById('image');
// ボタンをクリックしたらイベント発動
setInterval(() => {
  fetch('https://dog.ceo/api/breeds/image/random') // APIのURL
    .then(response => {
      return response.json();
    })
    .then(myJson => {
      // imgタグに取得したURL画像を入れる
      image.src = myJson['message'];
    });
},2000);
