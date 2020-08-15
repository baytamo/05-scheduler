$(document).ready(function () {
  let $container = $(".container");
  let $currentDay = $("#currentDay");

  // schedule object with initially empty values
  let schedule = [
    { time: "1", appt: "" },
    { time: "2", appt: "" },
    { time: "3", appt: "" },
    { time: "4", appt: "" },
    { time: "5", appt: "" },
    { time: "6", appt: "" },
    { time: "7", appt: "" },
  ];

  // moments automatically current day
  $currentDay.text(moment().format("dddd, DD MMMM, yyyy"));

  // check local storage
  function getAppointments() {
    let storedSchedule = JSON.parse(localStorage.getItem("Schedule"));
    if (storedSchedule !== null) {
      schedule = storedSchedule;
    }
    showTimeSlots();
  }

  getAppointments();

  function showTimeSlots() {
    // for loop to display all times
    for (let i = 0; i < schedule.length; i++) {
      // bootstrap row
      let $hourDiv = $("<div>").addClass("row timeSlot");

      // column 1 - shows the hour of the appointment slot
      let $timeDisplay = $("<div>").addClass("timeDisplay col-1");
      $timeDisplay.text(schedule[i].time + "pm");
      $hourDiv.append($timeDisplay);

      // column 2 - this is for text area; add event listener
      let $apptBlock = $("<div>").addClass("apptBlock col-9 p-3");
      let $textArea = $("<textarea>").attr("type", "text");
      // attr: read only after time passes, change to textarea
      $textArea.attr("placeholder", `${schedule[i].appt}`);
      $apptBlock.append($textArea);
      $hourDiv.append($apptBlock);

      // column 3 - this is for save button; add event listener
      let $floppyDiv = $("<div>").addClass("floppyDiv col-2");
      let $floppyDisc = $("<img>").addClass("floppyDisc");
      $floppyDisc.attr("src", "Assets/floppydisc.png").css("width", "25px");
      // add event listener that pushes input field value to array and saves it to screen;
     

      $floppyDisc.on("click", function () {
        let $textAreaInput = $.trim($textArea.val());
        event.preventDefault();
        
        schedule[i].appt = $textAreaInput;
        localStorage.setItem("Schedule", JSON.stringify(schedule));
        console.log(schedule);
        showTimeSlots();
      });
      $floppyDiv.append($floppyDisc);
      $hourDiv.append($floppyDiv);

      // append entire row to html
      $container.append($hourDiv);
    }
  }
});
