(function () {

    // Lookup for td with events
    $(".rsAptContent").closest("td").each(function () {

        // Find events on td
        var eventsById = $(this).find(".rsAptContent");
        var header = $(this).find(".rsDateBox");
                
        for (var i = 0; i < eventsById.length; i++) {

            var me = $(eventsById[i]);

            // Gets the color of the btn from the current div
            var color = me.closest(".rsAptSimple");

            // Creates the circles
            $("<div/>", {
                width: 6,
                height: 6,
                css: {
                    backgroundColor: color.css("background-color"),
                    "border-radius": 3,
                    float: "right"

                }
            }).appendTo(header); // Adds to the div (with the date)

            // Removes the previous div with the color
            color.remove();

            // Formats the count
            var count = eventsById.length > 1 ? eventsById.length + " events" : " 1 event";
            var p = $("<p/>", { text: count })

            // Put it back into the div
            $($(this).find(".rsWrap")[1]).html(p);
        }
    });
})();

