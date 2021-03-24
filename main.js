// 入力欄
const app = new Vue({
  el:'#text-box',
  data: {
    name:'',
  },
});

// 画像の表示、切り替え
const apikey ='213a0234ce7bba2b2e94beb94fa5616e';

const getFlickrImageURL = (photo, size) => {
  let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${
    photo.secret
  }`;
  if (size) {
    // サイズ指定ありの場合
    url += `_${size}`;
  }
  url += '.jpg';
  return url;
};
const getFlickrPageURL = photo => `https://www.flickr.com/photos/${photo.owner}/${photo.id}`;
const getFlickrText = (photo) => {
  let text = `"${photo.title}" by ${photo.ownername}`;
  if (photo.license === '4') {
    // Creative Commons Attribution（CC BY）ライセンス
    text += ' / CC BY';
  }
  return text;
};
const RequestURL = (text) => {
  const parameters = $.param({
    method: 'flickr.photos.search',
    api_key:apikey,
    text: text, // 検索テキスト
    sort: 'interestingness-desc', // 興味深さ順
    per_page: 4, // 取得件数
    license: '4', // Creative Commons Attributionのみ
    extras: 'owner_name,license', // 追加で取得する情報
    format: 'json', // レスポンスをJSON形式に
    nojsoncallback: 1, // レスポンスの先頭に関数呼び出しを含めない
  });
  const url = `https://api.flickr.com/services/rest/?${parameters}`;
  console.log(url);
  return url;
};


new Vue ({
  el:"#main",
  components:{
    'carousel': VueCarousel.Carousel,
    'slide': VueCarousel.Slide      
  },
  data:{
    dogphotos:[],
  },
  created(){
    const dogurl =  RequestURL('dog');
    $.getJSON(dogurl, (data) => {
      if (data.stat !== 'ok') {
        return;
      }
      this.dogphotos = data.photos.photo.map(photo => ({
        id: photo.id,
        imageURL: getFlickrImageURL(photo, 'm'),
        pageURL: getFlickrPageURL(photo),
        text: getFlickrText(photo),
      }));    
    });
  }
});



// タブの切り替え
new Vue({
  el: '#tabs-class',
  data: {
    activeTab: '',
  },
});


// アコーディオン
$('.list-item').click(function() {
  const $contents = $(this).find('.contents');
  $contents.slideToggle();
});



// スライドメニュー

$(function(){
  $('#menu .show-menu').on('click', function(){
    var s = $('#menu');
    if ( s.hasClass('SHOW') ) { 
    /*メニューを閉じる */
      var w = s.width();
      s.animate({'left': -w + 'px'}, 500).removeClass('SHOW');
    } else {
    /*メニューを開く */
      s.animate({'left': '0'}, 500).addClass('SHOW');
    }
  });

  /* リサイズ時に、画面外に出しているメニューが表示されてしまうので、left 値を再設定 */
  $(window).on('resize', function(){
    var s = $('#menu');
    if ( ! s.hasClass('SHOW') ){
      var w = s.width();
      s.css('left', -w + 'px');
    }
  });
});



// 時間経過による画像の変化
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


// パララックス
// 背景画像のスクロール速度。数字が小さいほど速い。
const speed = 3;
const $window = $(window);

// スライド1枚の高さを保持する変数
let slideHeight;

// パララックスを適用する関数
const showParallax = () => {
  const scrollTop = $window.scrollTop();

  // 各スライドの背景位置をスクロールに合わせて変える
  $('.parallax-section-1').css({
    'background-position': `center ${Math.round((0 - scrollTop) / speed)}px`,
  });
  $('.parallax-section-2').css({
    'background-position': `center ${Math.round((slideHeight - scrollTop) / speed)}px`,
  });
  $('.parallax-section-3').css({
    'background-position': `center ${Math.round((slideHeight * 2 - scrollTop) / speed)}px`,
  });
  $('.parallax-section-4').css({
    'background-position': `center ${Math.round((slideHeight * 3 - scrollTop) / speed)}px`,
  });
};

// パララックスの初期設定をする関数
const initParallax = () => {
  // ウインドウの高さをスライド1枚分の高さとする
  slideHeight = $window.height();

  // 表示を更新
  showParallax();
};

// スクロールのたびにshowParallax関数を呼ぶ
$window.on('scroll', showParallax);

$window.on('resize', () => {
  // ウインドウがリサイズされるとここが実行される
  initParallax();
});

initParallax();



$(window).on('load resize',function(){
  var pos01 = 0;
  var pos02 = Math.round($("#content02").offset().top);
  var pos03 = Math.round($("#content03").offset().top);
  var pos04 = Math.round($("#content04").offset().top);

  $(window).on('load resize scroll',function(){
    var posScroll = $(window).scrollTop();
    if(pos01 <= posScroll && posScroll < pos02) {
      $("#list01").addClass('current').siblings('li').removeClass('current');
    } else if(pos02 <= posScroll && posScroll < pos03) {
      $("#list02").addClass('current').siblings('li').removeClass('current');
    } else if(pos03 <= posScroll && posScroll < pos04) {
      $("#list03").addClass('current').siblings('li').removeClass('current');
    } else if(pos04 <= posScroll && posScroll) {
      $("#list04").addClass('current').siblings('li').removeClass('current');
    }
  });
});


var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('js-main-movie', {
    videoId: 'w7VNjGuSK_k',
    height: '360',
    width: '640',
    playerVars: {
      controls: 0,
      autoplay: 1,
      disablekb:1,
      enablejsapi: 1,
      iv_load_policy: 3,
      playsinline: 1,
      rel: 0
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  event.target.mute();
  event.target.playVideo();
}

function onPlayerStateChange(event) {
  var ytStatus = event.target.getPlayerState();
  if (ytStatus == YT.PlayerState.ENDED) {
    player.mute();
    player.playVideo();
  }
}