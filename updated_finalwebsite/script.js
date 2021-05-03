let submit = document.getElementById("submit");
let input = document.getElementById("input-emotion");

input.onclick = function(){
    let cursor = document.querySelector('.blink');
    cursor.style.display = "none";
}

input.addEventListener("keyup", function(e){
    if (e.keyCode === 13){
        e.preventDefault();
        submit.click();
    }
})

submit.onclick = function(){
    window.location = "bindery.html?input=" + input.value;
};

function timeClock(){
    var d = new Date();

    // adding a 0 before seconds that are less than 10
    let currentSeconds = d.getSeconds();
    let seconds;
    if (currentSeconds < 10){
         seconds = "0" + currentSeconds;
    } else {
        seconds = currentSeconds;
    }

    // adding a 0 before minutes that are less than 10
    let currentMinutes = d.getMinutes();
    let minutes;
    if (currentMinutes < 10){
        minutes = "0" + currentMinutes;
   } else {
       minutes = currentMinutes;
   }
    document.getElementById("timeHere").innerHTML = d.getHours() + ":" + minutes + ":" + seconds;

    setTimeout(timeClock, 1000);
}

function todaysDate(){
    var today = new Date();

    document.getElementById("dateHere").innerHTML = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

}

todaysDate();
timeClock();
