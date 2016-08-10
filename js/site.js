$(document).ready(function(){
    
    fixedHeader();
    
    // Link back to top
    $('#backTop').click(function(){
        $('body, html').animate({scrollTop:0}, 2000);
    }); 
    
    $('#navIcon').click(function(){
		$(this).toggleClass('open');
        $('#nav').toggleClass('openNav');
	});
});

$(window).resize(function(){
    var winSize = $(this).width();

    if(winSize >= 1100 ) {
        $('#navIcon').removeClass('open');
        $('#nav').removeClass('openNav');
    }
});

$(window).scroll(function(){
    fixedHeader();
});

function fixedHeader() {
    var winscroll = $(this).scrollTop();

    if( winscroll >= 20 ) {
        $("#header").addClass("stickyHeader");
    } else {
        $("#header").removeClass("stickyHeader");
    }
}

function isMobileDevice(){
    try{
        if(/.*\(BB[0-9]+;.*Mobile.*/.test(navigator.userAgent)){return true;}
        if(/.*BlackBerry.*/.test(navigator.userAgent)){return true;}
        if(/.*Android.*Mobile.*/.test(navigator.userAgent)){return true;}
        if(/.*MSIEMobile.*/.test(navigator.userAgent)){return true;}
        if(/.*SymbianOS.*/.test(navigator.userAgent)){return true;}
        if(/.*Windows Phone.*/.test(navigator.userAgent)){return true;}
        if(/.*iPhone.*/.test(navigator.userAgent)){return true;}
        return false;}
    catch(err){return false;}
}

/*function accordionFunction(){

    $('.accordion > li ').click(function() {
        
        if ($(this).hasClass('active')) {
            $('.accordion > li').removeClass('active');
            $('.accordion_content').stop(true, true).slideUp('normal');
        } else {
            $('.accordion > li').removeClass('active');
            $('.accordion_content').slideUp('normal');
            $(this).addClass('active');
            $('.accordion_content', this).stop(true, true).slideDown('normal');
            
        }
    });

    $('.accordion_content').click(function( event ) {
        event.stopPropagation();
        $(this).stop;
    });
}*/

 function accordionMenu() {
    $('.accordionMenu > li > a').click(function () {
        // Set elem as active
        var parent = $(this).parent();
        
        
        // Elem is already active
        if ($(this).parent().hasClass('active')) {
            // Remove the active class
            parent.removeClass('active');

            // Hide the content
            parent.find('.accordionContent').stop(true, true).slideUp('normal');
            
        } else {
            
            // Removes all actives
            $('.accordionMenu > li').removeClass('active');

            // Hides all contents
            $('.accordionContent').slideUp('normal');
        
            // Set parent as active
            parent.addClass('active');

            // Displays the content
            parent.find('.accordionContent').stop(true, true).slideDown('normal');
            
        }
    });
}


function parallax(e, parent, child, layer) {
    var speed = 50 / layer;
    var $window = $(window);
    var $target = $(child);

    var z = $window.width() - e.pageX - (parent.offsetWidth / 2);
    var k = $window.height() - e.pageY - (parent.offsetHeight / 2);

    var x = (z / speed);
    var y = (k / speed);

    console.log(x, y)

    $target.css('left', x);
    $target.css('top', y);
};