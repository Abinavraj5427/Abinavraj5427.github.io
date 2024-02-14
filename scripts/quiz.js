document.getElementById("rb").addEventListener("mouseenter", run);
function run() {
    var btn = document.getElementById("rb");
    if (!btn.style.left) {
        // Default to 500 to start
        btn.style.left = "500px";
    } else {
        console.log(btn.style.left);
        var posLeft = parseInt(btn.style.left); // parseInt ignores the px on the end
        if (posLeft >= 500) {
            btn.style.left = "450px";
        } else if (posLeft < 500) {
            btn.style.left =  "750px";
        }
    }
}


function next(){
    document.getElementById("main1").style.display= 'none';
    document.getElementById("main2").style.display= 'flex';
}

function next2(){
    document.getElementById("main3").style.display= 'none';
    document.getElementById("main5").style.display= 'flex';
}

function next4(){
    document.getElementById("main5").style.display= 'none';
    document.getElementById("main1").style.display= 'flex';
}

function next3(){
    document.getElementById("main4").style.display= 'none';
    document.getElementById("main3").style.display= 'flex';
}

function wrong(){
    alert("Wrong Answer noob! >:( Pick again. We'll move on once u change ur answer smh.")
}