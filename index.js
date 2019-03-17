// jQueryMobile-SwipeUpDown
// ----------------------------------
//
// Copyright (c)2012 Donnovan Lewis
// Distributed under MIT license
//
// https://github.com/blackdynamo/jquerymobile-swipeupdown
 

let i = 0;
(async function () {
    // initializes touch and scroll events
    const response = await axios.get('http://083fda51.ngrok.io/flick_images');
    console.log(response);
    console.log(response.data.result);
    var results = response.data.result;
    var reviews = []
    var like_review = "";
    // var unlike_review = "";
    var superlike_review = "";
    for(var j = 0 ;  j < results.length ; j++){
        // console.log(results[i].image_url);
        if(j == 0){
            reviews.push(results[j].review);
            $('#container').append('<div class="buddy" id=a'+j+' style="display: block;"><img src="'+results[j].image_url+'" width="350px" height="350px" /></div>');
        }else{
            reviews.push(results[j].review);
            $('#container').append('<div class="buddy" id=a'+j+'><img src="'+results[j].image_url+'" width="350px" height="350px" /></div>');
        }
        // console.log(reviews);   
    }

    document.getElementById("left").onclick = function() {
        $(".buddy").addClass('rotate-right').delay(700).fadeOut(1);
        $('.buddy').find('.status').remove();
        $('.buddy').append('<img src="./images/unlike_budge.svg" class="unlike" />');
        if(i == 0){
            $(".buddy").removeClass('rotate-left rotate-right').fadeIn(400);
        }else{
            $(".buddy").removeClass('rotate-left rotate-right').fadeIn(400);
        }
        console.log("left,unlike");
    };
  
    document.getElementById("right").onclick = function() {
    $(".buddy").addClass('rotate-left').delay(700).fadeOut(1);
    $('.buddy').find('.status').remove();
    $(".buddy").append('<img src="./images/like_budge.svg" class="like" />');       
    $(".buddy").next().removeClass('rotate-left rotate-right').fadeIn(400);
    console.log("right,like");
    };
  
    document.getElementById("up").onclick = function() {
    $(".buddy").addClass('rotate-top').delay(700).fadeOut(1);
    $('.buddy').find('.status').remove();
    $(".buddy").append('<img src="./images/superlike_budge.svg" class="superlike" />');   
    $(".buddy").next().removeClass('rotate-left rotate-right').fadeIn(400);
    console.log("top,superlike");
    };

    var supportTouch = $.support.touch,
    scrollEvent = "touchmove scroll",
    touchStartEvent = supportTouch ? "touchstart" : "mousedown",
    touchStopEvent = supportTouch ? "touchend" : "mouseup",
    touchMoveEvent = supportTouch ? "touchmove" : "mousemove";

    // handles swipe up and swipe down
    $.event.special.swipeupdown = {
        setup: function () {
            var thisObject = this;
            var $this = $(thisObject);

            $this.bind(touchStartEvent, function (event) {
                var data = event.originalEvent.touches ?
                        event.originalEvent.touches[ 0 ] :
                        event,
                    start = {
                        time: (new Date).getTime(),
                        coords: [ data.pageX, data.pageY ],
                        origin: $(event.target)
                    },
                    stop;

                function moveHandler(event) {
                    if (!start) {
                        return;
                    }

                    var data = event.originalEvent.touches ?
                        event.originalEvent.touches[ 0 ] :
                        event;
                    stop = {
                        time: (new Date).getTime(),
                        coords: [ data.pageX, data.pageY ]
                    };

                    // prevent scrolling
                    if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
                        event.preventDefault();
                    }
                }

                $this
                    .bind(touchMoveEvent, moveHandler)
                    .one(touchStopEvent, function (event) {
                        $this.unbind(touchMoveEvent, moveHandler);
                        if (start && stop) {
                            if (stop.time - start.time < 1000 &&
                                Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
                                Math.abs(start.coords[0] - stop.coords[0]) < 75) {
                                start.origin
                                    .trigger("swipeupdown")
                                    .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                            }
                        }
                        start = stop = undefined;
                    });
            });
        }
    };

    //Adds the events to the jQuery events special collection
    $.each({
        swipedown: "swipeupdown",
        swipeup: "swipeupdown"
    }, function (event, sourceEvent) {
        $.event.special[event] = {
            setup: function () {
                $(this).bind(sourceEvent, $.noop);
            }
        };
    });

    $(document).ready(function(){
        //右に行った時の処理
        $(".buddy").on("swiperight",function () {
            if (i < i + 1) {
                i = i + 1;
            }
            
            console.log(i);
            console.log(reviews[i].replace(/"/g, ''))
            like_review += reviews[i].replace(/"/g, '');
            console.log(like_review)
            $(this).addClass('rotate-left').delay(700).fadeOut(1);
            $('.buddy').find('.status').remove();
            $(this).append('<img src="./images/like_budge.svg" class="like">');      
            $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
            console.log("right,like");
        });  
    
        //左に行った時の処理
        $(".buddy").on("swipeleft",function left(){
            if(i < i + 1){
                i = i + 1;
            }
            // console.log(i);
            // console.log(reviews[i].replace(/"/g, ''))
            // unlike_review += reviews[i].replace(/"/g, '');
            // console.log(unlike_review)
            $(this).addClass('rotate-right').delay(700).fadeOut(1);
            $('.buddy').find('.status').remove();
            $(this).append('<img src="./images/unlike_budge.svg" class="unlike">');
            $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
            // console.log("left,unlike");
            // console.log(unlike_review);
        });
    
        //上に行った時の処理
        $(".buddy").on("swipeup",function up(){
            if(i < i + 1){
                i = i + 1;
            }
            console.log(i);
            console.log(reviews[i].replace(/"/g, ''))
            superlike_review += reviews[i].replace(/"/g, '');
            console.log(superlike_review)
            $(this).addClass('rotate-top').delay(700).fadeOut(1);
            $('.buddy').find('.status').remove();
            $(this).append('<img src="./images/superlike_budge.svg" class="superlike">');
            $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
            console.log("top,superlike");
            console.log(superlike_review);
        });
    });

})();

