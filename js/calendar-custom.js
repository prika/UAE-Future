function formatTable() {

    // Lookup for td with events
    $(".rsAptContent").closest("td").each(function () {

        // Find events on td
        var eventsById = $(this).find(".rsAptContent");
        var header = $(this).find(".rsDateBox");
               
        
        for (var i = 0; i < eventsById.length; i++) {

            var me = $(eventsById[i]);
            var text = me.text();

            // Gets the description of event: color, text, id
            var eventDescription = me.closest(".rsAptSimple");
            var id = eventDescription[0].id;

            console.log(id);

            // Creates the circles
            $("<div/>", {
                "width": 6,
                "height": 6,
                css: {
                    "background-color": eventDescription.css("background-color"),
                    "border-radius": 3,
                    "float": "right"
                }
            }).appendTo(header); // Adds to the div (with the date)
       
            // Removes the previous div with the color
            eventDescription.remove();

            // Formats the count
            var count = eventsById.length > 1 ? eventsById.length + " events" : " 1 event";
            var p = $("<p/>", { text: count })

            // Put it back into the div
            $($(this).find(".rsWrap")[1]).html(p);
        }
    });
}

setTimeout(2000, formatTable);