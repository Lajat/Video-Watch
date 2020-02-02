var data2 = JSON.parse(localStorage.getItem("videoData"));

var videoPlayer = document.getElementById('video-player');

// window.onbeforeunload = function() {
//     var t = document.getElementById("main-playlist").querySelectorAll("div");
// t[0].style.border = "2px solid grey";
//   }

function createVideoCard(obj) {
    var wrapper = document.createElement('div');
    wrapper.className = "wrapper1";
    wrapper.id = "wrap";

    var thumbnail = document.createElement('img');
    thumbnail.className = "thumbnail";
    thumbnail.src = obj.thumbnail;
    
    var title = document.createElement('h4');
    title.className = "title";
    title.innerHTML = obj.title;

    wrapper.appendChild(thumbnail);
    wrapper.appendChild(title);

    wrapper.onclick = function() {
          for(var j=0;j<data2.length;j++) {
            if(obj.id === data2[j].id){
                wrapper.classList.remove("wrapper1");
                wrapper.classList.add("wrapper2");
                localStorage.setItem("position", j);
                videoPlayer.src = "https://player.vimeo.com/video/" + data2[j].vimeoId;

                var x = data2[j].views;
                if(x.toString().length < 7)
                viewsInNumber.innerHTML = data2[j].views/1000 +"K" + " views";
                if(x.toString().length >=7 && x.toString().length < 10)
                viewsInNumber.innerHTML = (data2[j].views/1000000).toFixed(2) +"M" + " views";

                videoTitle.innerHTML = data2[j].title;
                videoDescription.innerHTML = data2[j].description;

                if(data2[j].isLiked === true || data2[j].isLiked === "true"){
                    like.style.color = "yellow";
                }
                else{
                    like.style.color = "black";
                }
    
                if(data2[j].isSaved === true || data2[j].isSaved === "true") {
                    bookmark.style.color = "yellow";
                }
                else {
                    console.log(data2[j].isSaved);
                    bookmark.style.color = "black";
                }
            }
        }
    }
    return wrapper;
}

like.onclick = function() {
    var position = localStorage.getItem("position");
    if(data2[position].isLiked === true || data2[position].isLiked === "true") {
        like.style.color = "black";
        data2[position].isLiked = "false";
        localStorage.setItem("videoData",JSON.stringify(data2));
    }
    else {
        like.style.color = "yellow";
        data2[position].isLiked = "true";
        localStorage.setItem("videoData",JSON.stringify(data2));
    }
}

bookmark.onclick = function() {
    var position = localStorage.getItem("position");
    if(data2[position].isSaved === true || data2[position].isSaved === "true") {
        bookmark.style.color = "black";
        data2[position].isSaved = "false";
        localStorage.setItem("videoData",JSON.stringify(data2));
    }
    else {
        bookmark.style.color = "yellow";
        data2[position].isSaved = "true";
        localStorage.setItem("videoData",JSON.stringify(data2));
    }
}

var mainPlaylist = document.getElementById('main-playlist');

var xhttp = new XMLHttpRequest();
xhttp.open('Get','http://5d76bf96515d1a0014085cf9.mockapi.io/playlist' , true);
xhttp.onreadystatechange = function() {
    if(this.readyState === 4) {
        var data = JSON.parse(this.responseText);
        for(var i=0;i<data.length;i++) {
            mainPlaylist.appendChild(createVideoCard(data[i]));
        }
    }
}
xhttp.send();

var xhttp3 = new XMLHttpRequest();
xhttp3.open('Get','https://5d76bf96515d1a0014085cf9.mockapi.io/video' , true);
xhttp3.onreadystatechange = function() {
    if(this.readyState === 4) {
        var data3 = JSON.parse(this.responseText);
        localStorage.setItem("videoData",JSON.stringify(data3));
    }
        var v = data2[0].views;
    if(v.toString().length < 7)
    viewsInNumber.innerHTML = data2[0].views/1000 +"K" + " views";
    if(v.toString().length >=7 && v.toString().length < 10)
    viewsInNumber.innerHTML = (data2[0].views/1000000).toFixed(2) +"M" + " views";

    if(data2[0].isLiked === true || data2[0].isLiked === "true")
        like.style.color = "yellow";
    else
        like.style.color = "black";
    
    if(data2[0].isSaved === true || data2[0].isSaved === "true")
        bookmark.style.color = "yellow";
    else
        bookmark.style.color = "black";
}
xhttp3.send();
