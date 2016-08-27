function doTheMagic() {

    var isMonthly = true;

    // by default month is active
    $($(".month.button").get(0)).addClass("active")

    var eventsArray = [];
    var calendarIds = $(".containerLegendCategory.container p[id]").map(function () { return this.id; }).get()
    var allDays;

    function buildData() {

        allDays = $(".rsDateBox a");

        var data = {

            "schedulerInfo":
            {
                "ViewStart": getDate(0),
                "ViewEnd": getDate(allDays.length - 1),
                "EnableDescriptionField": true,
                "MinutesPerRow": 30,
                "TimeZoneOffset": 0,
                "VisibleAppointmentsPerDay": 2,
                "UpdateMode": 0,
                "CalendarIds": calendarIds,
                "UiCulture": "en",
                "ProviderName": "OpenAccessDataProvider",
                "FilterExpression": "(Visible = true AND Status = Live) AND (PublishedTranslations.Count = 0 OR PublishedTranslations.Contains(\"en\"))",
                "TimeZoneId": "UTC"
            }
        }

        return data;
    }

    function getDate(index) {
        var strDate = allDays.get(index).title;
        var dateParts = strDate.split("/");
        var date = new Date(dateParts[2], (dateParts[0] - 1), dateParts[1]).getTime();
        return "\/Date(" + date + ")\/";
    }

    function callService() {

        $.ajax({
            method: "POST",
            contentType: "application/json",
            url: "/Sitefinity/Public/Services/RadSchedulerService.svc/GetAppointments",
            data: JSON.stringify(buildData())
        }).done(parseResponse);

        var dt = new Date($($($("#calendar .rsContentTable")[0]).find("td").find(".rsDateWrap").find(".rsDateHeader")[10]).attr("title"));
        $("#lbMonth")[0].innerHTML = dt.format("MMM");
    }

    function parseResponse(response) {

        eventsArray = [];

        for (var i = 0; i < response.Appointments.length; i++) {
            var event = response.Appointments[i];
            var obj = {
                date: new Date(parseInt(event.Start.substr(6))),
                id: event.ID,
                subject: event.Subject,
                color: event.Attributes[1].Value
            }

            eventsArray.push(obj);
        }

        redrawTable(eventsArray);
    }

    function checkIfEventDayMatches(dateToCheck, actualDate) {

        return (dateToCheck.getDate() == actualDate.getDate()
            && dateToCheck.getMonth() == actualDate.getMonth()
            && dateToCheck.getFullYear() == actualDate.getFullYear())
    }

    var currentCallsCount = 0;
    var renderedEvents = [];

    function bindFancybox() {

        $(".contentEvent.hasEvents").click(function (e) {
            currentCallsCount = 0;
            renderedEvents = [];
            e.preventDefault();
            var dateEvents = $($(this).find("p[data-id]")).map(function () { return $(this).attr("data-id") }).get();
            getAllEvents(dateEvents);
        });
    }

    function getAllEvents(array) {

        currentCallsCount = array.length;

        for (var i = 0; i < array.length; i++)
            $.get("/Calendario/GetEvtData?Id=" + array[i], function (data) { buildFancybox(data, array[i]); });
    }

    function allEventsCompletion() {

        // if it is the last rendered event init fancybox
        if (renderedEvents.length == currentCallsCount)
            $.fancybox(renderedEvents);
    }

    function buildFancybox(data, id) {

        var template = document.getElementById('sample_template').innerHTML;
        var json = JSON.parse(data);

        var view =
         {
             title: json.Title,
             subject: json.Subject,
             sumary: json.Sumary,
             date: json.Datestart,
             color: json.Color,
             location: json.City,
             address: json.Street + " " + json.City + " " + json.State + " " + json.Country,
             image: json.Img,
             category: json.Cat,
             tags: json.Tag
         };

        renderedEvents.push(Mustache.render(template, view));
        allEventsCompletion();
    }

    $("#nextCalendarBtn").click(function () {

        $(".rsNextDay")[0].click();
        setTimeout(callService, 1000);
    });

    $("#prevCalendarBtn").click(function () {

        $(".rsPrevDay")[0].click();
        setTimeout(callService, 1000);
    });

    $(".month.button").click(function () {

        $($(".month.button").get(0)).addClass("active")
        $($(".week.button").get(0)).removeClass("active")
        $(".rsHeaderMonth")[0].click();
    });

    $(".week.button").click(function () {

        $($(".month.button").get(0)).removeClass("active")
        $($(".week.button").get(0)).addClass("active")
        $(".rsHeaderWeek")[0].click();
    });

    function formatMinutes(minutes) {
        var min = minutes.toString()
        if (min.length == 1) return "0" + min.toString();
        return minutes;
    }

    function redrawTable(eventsArray) {

        $($("#calendar .rsContentTable")[0]).find("td").each(function () {

            var td = $(this);
            var day = $(td.find(".rsDateWrap"));

            var fullDate = new Date($(day.find(".rsDateHeader")[0]).attr("title"));

            td.empty();

            var eventContentWrapper = $("<div/>", { "class": "containerEvent" });
            var contentEvent = $("<div/>", { "class": "contentEvent" });
            var groupCategories = $("<div />", { "class": "groupCategories" });
            var groupEvents = $("<div />", { "class": "groupEvents" });
            var eventsCount = 0;

            for (var i = 0; i < eventsArray.length; i++) {

                var event = eventsArray[i];
                var date = eventsArray[i].date;

                if (!checkIfEventDayMatches(fullDate, date)) continue;

                // Future me... sorry about that :-)
                var eventSubject = $("<p style='color:" + event.color + "'> <span>" + date.getHours() + ":" + formatMinutes(date.getMinutes()) + " </span>" + event.subject + "</p>");
                eventSubject.attr("data-id", event.id);
                groupEvents.append(eventSubject);

                var category = $("<div/>", { "class": "category", css: { "background-color": event.color } })
                groupCategories.append(category);
                eventsCount++;
            }

            if (eventsCount > 0) {
                contentEvent.addClass("hasEvents");
            }

            var eventLabel = (eventsCount == 0) ? "" : (eventsCount == 1 ? "1 event" : eventsCount + " events");
            var numberOfEvents = $("<p/>", { "class": "eventsNumber", text: eventLabel });

            contentEvent.append(day, groupCategories, numberOfEvents, groupEvents);
            eventContentWrapper.append(contentEvent);
            td.append(eventContentWrapper);
        });

        bindFancybox();
    }

    callService();
}

setTimeout(doTheMagic, 1000);