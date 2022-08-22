(function (win) {
    var ratio, scaleValue, renderTime,
            document = window.document,
            docElem = document.documentElement,
            vpm = document.querySelector('meta[name="viewport"]');

    if (vpm) {
        var tempArray = vpm.getAttribute("content").match(/initial\-scale=(["']?)([\d\.]+)\1?/);
        if (tempArray) {
            scaleValue = parseFloat(tempArray[2]);
            ratio = parseInt(1 / scaleValue);
        }
    } else {
        vpm = document.createElement("meta");
        vpm.setAttribute("name", "viewport");
        vpm.setAttribute("content", "width=device-width, initial-scale=1, user-scalable=no, minimal-ui");
        docElem.firstElementChild.appendChild(vpm);
    }

    win.addEventListener("resize", function () {
        clearTimeout(renderTime);
        renderTime = setTimeout(initPage, 300);
    }, false);

    win.addEventListener("pageshow", function (e) {
        e.persisted && (clearTimeout(renderTime), renderTime = setTimeout(initPage, 300));
    }, false);

    "complete" === document.readyState ? document.body.style.fontSize = 12 * ratio + "px" : document.addEventListener("DOMContentLoaded", function () {
        document.body.style.fontSize = 12 * ratio + "px";
    }, false);

    initPage();

    function initPage() {
        var htmlWidth = docElem.getBoundingClientRect().width;
        // htmlWidth / ratio > 540 && (htmlWidth = 540 * ratio);
        win.rem = htmlWidth / 16;
        docElem.style.fontSize = win.rem + "px";
        // if (win.rem < 105) {
        //     docElem.style.fontSize = "105px"
        // }

    }
})(window);

(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

// 滚动监听
var showText, $alert, hrefPrefix = "./";
(function(win){
    var pathArr = window.location.href.split('/');
    var path = pathArr[pathArr.length - 2]
    if (path === 'school') {
        hrefPrefix = "../"
    }
    showText = function(e){ 
        var animateds = document.getElementsByClassName('animated');
        var windowHeight = window.innerHeight;
        for(var i=0;i<animateds.length;i++){
            var offsetTop = animateds[i].offsetTop + animateds[i].parentNode.offsetTop
            var diff = 20
            var animationName = i % 2 === 0 ? "fadeInLeft" : "fadeInRight"
            // user.html
            if (animateds[i].className.indexOf('inner-box__content ')>-1) {
                offsetTop += animateds[i].parentNode.parentNode.offsetTop + animateds[i].parentNode.parentNode.parentNode.offsetTop
                diff = document.querySelector('.bg-header').offsetHeight - 30
                animationName = "fadeInUp"
            }
            // index.html
            if (animateds[i].className.indexOf('inner-box ')>-1) {
                diff = 150
                animationName = "fadeInUp"
            }
            if (window.pageYOffset + windowHeight > offsetTop + diff) {
                animateds[i].style.animationName = animationName //添加动画
                animateds[i].style.visibility = "visible"
            } else {
                // animateds[i].style.animationName = "" //隐藏动画
            }
        }
    }

    var showHead = function(e){
        var headers = document.querySelectorAll('.header');
        var arrow = document.querySelector('.arrow'); 

        var windowHeight = window.innerHeight;
        var originLogo = (headers[0].className.indexOf('bg-header__head') > -1) ? hrefPrefix+'img/logo_white@3x.png' : hrefPrefix+'assets/logo@2x.png'

        if (document.body.className.indexOf('is-modal') > -1) {
            return
        }
        if (window.pageYOffset  > 60) {
            for (var i = headers.length - 1; i >= 0; i--) {
                headers[i].classList.add("fixed");
            }
            headers[0].firstElementChild.src=hrefPrefix + "assets/logo@2x.png"
            arrow.style.display = "block"
        } else if(window.pageYOffset  > 0) {
            arrow.style.display = "none"
        }else{
            for (var i = headers.length - 1; i >= 0; i--) {
                headers[i].classList.remove("fixed");
            }
            headers[0].firstElementChild.src=originLogo
        }

    }

    var scrollFun = function(){
        showText()
        showHead()
    }
    win.addEventListener('scroll', scrollFun);

    var scrollTop
    $alert = function(modalId) {
        var modalDiv =document.createElement('div');
        modalDiv.style="z-index:2011";
        modalDiv.className="modal"
        document.body.appendChild(modalDiv);

        scrollTop = document.documentElement.scrollTop
        document.body.style.top = scrollTop * -1 + 'px'
        document.body.classList.add('is-modal');
        document.getElementById(modalId).style.display = 'block'
        // function bodyScroll(event) {
        //     event.preventDefault();
        // }
        // document.body.addEventListener('touchmove', bodyScroll, false);
        var closeModal = function(e) {
            e.preventDefault()
            e.stopPropagation();
            document.body.classList.remove('is-modal');
            document.getElementById(modalId).style.display = 'none'
            modalDiv.parentNode && modalDiv.parentNode.removeChild(modalDiv);  
            // document.body.removeEventListener('touchmove', bodyScroll);
            window.scrollTo(0,scrollTop)
        }
        document.querySelector('.alert-box__close').addEventListener('click', function(e) {
            closeModal(e)
        })
    }

})(window)

function GetRequest() {
   var url = location.search; //获取url中"?"符后的字串
   var theRequest = new Object();
   if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      strs = str.split("&");
      for(var i = 0; i < strs.length; i ++) {
         theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
      }
   }
   return theRequest;
}

function showAlert(name) {
    const iframe = document.createElement('IFRAME');
    iframe.style.display = 'none';
    iframe.setAttribute('src', 'data:text/plain,');
    document.documentElement.appendChild(iframe);
    window.frames[0].window.alert(name);
    iframe.parentNode.removeChild(iframe);
};

// other
window.onload = function(){
    showText()

    document.body.addEventListener('touchmove', function(){
        if (document.getElementById('mobVideo5')) {
            document.getElementById('mobVideo5').play()
        }
    }, false);
    
    var arrow = document.querySelector('.arrow');
    var scroll_timer = null;
    var preScrollTop = null;
    arrow.addEventListener("click", function(){
        cancelAnimationFrame(scroll_timer);
        scroll_timer = requestAnimationFrame(function fn(){
                var oTop = document.body.scrollTop || document.documentElement.scrollTop;
                if(oTop > 0){
                    if (preScrollTop !=null && preScrollTop < oTop) {
                        preScrollTop = null
                        cancelAnimationFrame(scroll_timer);
                    }else {
                        document.body.scrollTop = document.documentElement.scrollTop = oTop - 100;
                        preScrollTop = oTop - 100
                        scroll_timer = requestAnimationFrame(fn);
                    }
                }else{
                    preScrollTop = null
                    cancelAnimationFrame(scroll_timer);
                }    
            });
    })

    var videos = document.getElementsByClassName('video_con');
    var userAgent = navigator.userAgent;
    var issafariBrowser = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
    var isIOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    
    for(var i=0;i<videos.length;i++){
        (function(p){
            if (!issafariBrowser) {
                videos[p].firstElementChild.addEventListener( 'click', function(e){
                    e.preventDefault()
                    if (this.paused) {
                        this.play()
                    }else{
                        this.pause()
                    }
                })
            }
            var video = videos[p].firstElementChild
            video.addEventListener( 'play', function(){
                pauseAll(p);
            })
        })(i)
    }
    function pauseAll(index){
        for ( var j = videos.length - 1; j >= 0; j--) {
            if ( j!= index) {
                videos[j].firstElementChild.pause();
            }
        }
    }

    ['fullscreenchange','webkitfullscreenchange','mozfullscreenchange'].forEach((item,index) => {
        window.addEventListener(item, function(){
            fullscreenchange()
        });
    })
    function fullscreenchange() {
        var isFullScreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
        for(var i=0;i<videos.length;i++){
            if (isFullScreen) {
                videos[i].firstElementChild.style.objectFit = 'contain'
            }else {
                videos[i].firstElementChild.style.objectFit = ''
            }
        }
     }
    
    if(!!window.BScroll){
        var wrapper = document.getElementById("column-scroll")
        var bs = new BScroll(wrapper, {
            scrollX: true,
            eventPassthrough: 'vertical'
        })
    }

    var menu = document.querySelector('.mob.menu'); 
    var headerMore = document.querySelector('.header .more')
    headerMore.addEventListener('click', function() {
        if (menu.className.indexOf('toggle') > -1) {
            menu.classList.remove('toggle')
            this.src = hrefPrefix + 'img/mobile/icon_list@3x.png'
        }else {
            menu.classList.add('toggle')
            this.src = hrefPrefix + 'img/icon_close@3x.png'
        }
    })

    document.querySelector('.mob.container').addEventListener('click', function(e) {
        menu.classList.remove('toggle')
        headerMore.src = hrefPrefix + 'img/mobile/icon_list@3x.png'
    })

    document.querySelector('.mob.bottom').addEventListener('click', function(e) {
        menu.classList.remove('toggle')
        headerMore.src = hrefPrefix + 'img/mobile/icon_list@3x.png'
    })

    document.querySelector('.header .download').addEventListener('click', function(e) {
        var utm_source = GetRequest()['utm_source']
        if (utm_source && utm_source === 'wechat_miniapp') {
            var oHref = document.createElement('a');
            oHref.setAttribute('id',"selector");
            oHref.setAttribute('style','position:absolute;top:-9999px;left:-9999px;');
            oHref.innerHTML = 'https://fastwordstatic.optimix.cn/apk_qr/teleprompter.apk';
            document.body.appendChild(oHref);
            var copyDOM = document.querySelectorAll('#selector');
            var range = document.createRange();  
            range.selectNode(copyDOM[0]);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            document.execCommand('copy'); 
            oHref.style.display='none';
            oHref.remove(); // 将input销毁
            showAlert('下载地址复制成功，请在浏览器中粘贴前往下载');
        } else {
            window.open('https://fastwordstatic.optimix.cn/apk_qr/teleprompter.apk','_blank')
        }
    })

    if(document.querySelector('.media-more')){
        document.querySelector('.media-more').addEventListener('click', function(e) {
            var medias = document.querySelectorAll('.media-list__inner')
            for(var i=0;i<medias.length;i++){
                medias[i].style.display = 'block';
            }
            this.style.display = 'none';
        })
    }

    var downloadApps = document.querySelectorAll('.mobDownload')
    if (downloadApps && downloadApps.length > 0) {
        for (var i = 0; i < downloadApps.length; i++) {
            downloadApps[i].id = 'mob_download_' + i;
            downloadApps[i].addEventListener('click', function(e) {
                var utm_source = GetRequest()['utm_source']
                var innerText = isIOS ? 'https://apps.apple.com/cn/app/id1557211448' : 'https://fastwordstatic.optimix.cn/apk_qr/teleprompter.apk'
                if (utm_source && utm_source === 'wechat_miniapp') {
                    var oHref = document.createElement('a');
                    oHref.setAttribute('id',"selector");
                    oHref.setAttribute('style','position:absolute;top:-9999px;left:-9999px;');
                    oHref.innerHTML = innerText;
                    document.body.appendChild(oHref);
                    var copyDOM = document.querySelectorAll('#selector');
                    var range = document.createRange();  
                    range.selectNode(copyDOM[0]);
                    window.getSelection().removeAllRanges();
                    window.getSelection().addRange(range);
                    document.execCommand('copy'); 
                    oHref.style.display='none';
                    oHref.remove(); // 将input销毁
                    showAlert('下载地址复制成功，请在浏览器中粘贴前往下载');
                } else {
                    window.open(innerText,'_blank')
                }
            })
        }
    }

}






