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
    var d = new Date() 
    document.getElementById("meta-data").innerHTML = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

    setTimeout(timeClock, 1000);
}

timeClock();
