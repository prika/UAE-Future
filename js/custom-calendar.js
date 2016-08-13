var data = {
    "schedulerInfo":
    {
        "ViewStart": "\/Date(1470009600000)\/",
        "ViewEnd": "\/Date(1473033600000)\/",
        "EnableDescriptionField": true,
        "MinutesPerRow": 30,
        "TimeZoneOffset": 0,
        "VisibleAppointmentsPerDay": 2,
        "UpdateMode": 0,
        "CalendarIds": ["b4fb725d-a02b-4b27-8692-26a725ad3f48", "f0d2d389-4cf4-696f-a65b-ff0000c51620"],
        "UiCulture": "en",
        "ProviderName": "OpenAccessDataProvider",
        "FilterExpression": "(Visible = true AND Status = Live) AND (PublishedTranslations.Count = 0 OR PublishedTranslations.Contains(\"en\"))",
        "TimeZoneId": "UTC"
    }
}

$.ajax({
    method: "POST",
    contentType: "application/json",
    url: "http://54.93.89.184/Sitefinity/Public/Services/RadSchedulerService.svc/GetAppointments",
    data: JSON.stringify(data)
}).done(parseResponse);

function parseResponse(response)
{
    var eventsArray = [];

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

function checkIfEventDayMatches(dateToCheck, actualDate)
{
    return (dateToCheck.getDate() == actualDate.getDate()
        && dateToCheck.getMonth() == actualDate.getMonth()
        && dateToCheck.getFullYear() == actualDate.getFullYear())
}

function redrawTable(eventsArray)
{
    $($("#calendar .rsContentTable")[0]).find("td").each(function ()
    {
        var td = $(this);
        var day = $(td.find(".rsDateWrap .rsDateBox"));
       
        var fullDate = new Date($(day.find("a")[0]).attr("title"));
        
        td.empty();

        var eventContentWrapper = $("<div/>", { "class": "containerEvent" });
        var contentEvent = $("<div/>", { "class": "contentEvent" });
        var day = $("<p/>", { "class": "day", "text": day.text()});
        var groupCategories = $("<div />", {"class" :"groupCategories" });
        var groupEvents = $("<div />", {"class" :"groupEvents" });
        var eventsCount = 0;

        for (var i = 0; i < eventsArray.length; i++)
        {
            var event = eventsArray[i];
            var date = eventsArray[i].date;

            if (!checkIfEventDayMatches(fullDate, date)) continue;
            
            // Future me... sorry about that :-)
            var eventSubject = $("<p style='color:"+ event.color +"'> <span>" + date.getHours() + ":" + date.getMinutes() + " </span>" + event.subject  + "</p>");
            groupEvents.append(eventSubject);

            var category = $("<div/>", {"class": "category", css: {"background-color": event.color}})
            groupCategories.append(category); 
            eventsCount++;
        }

        if (eventsCount > 0)
        {
            contentEvent.addClass("hasEvents");
        }

        var eventLabel =  (eventsCount == 0) ? "" : (eventsCount == 1 ? "1 event" : eventsCount + " events");
        var numberOfEvents = $("<p/>", { "class": "eventsNumber", text: eventLabel });
        
        contentEvent.append(day, groupCategories,numberOfEvents, groupEvents);
        eventContentWrapper.append(contentEvent);
        td.append(eventContentWrapper);
    });
}