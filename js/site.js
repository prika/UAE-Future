$(document).ready(function(){
    
    // Link back to top
    $('#backTop').click(function(){
        $('body, html').animate({scrollTop:0}, 2000);
    });
    
});

function fixedHeader() {
    var winscroll = $(this).scrollTop();

    if(winscroll >= 20) {
        $("#header").addClass("fixedHeader");
    } else {
        $("#header").removeClass("fixedHeader");
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

function accordionFunction(){

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
}