// Lookup for td with events
$(".rsAptContent").closest("td").each(function () {

    // Find events on td
    var eventsByTd = $(this).find(".rsAptContent");
    var header = $(this).find(".rsDateBox");
    
    for (var i = 0; i < eventsByTd.length; i++)
    {
        // Gets the color of the btn
        var color = $(eventsByTd[i]).closest(".rsAptSimple").css("background-color");
        
        $("<span/>", {
            width: 5,
            height: 5,
            css: {
                backgroundColor: color
            },
            text: "*"
        }).appendTo(header);
        
        
    }

});
