var typingBox=document.getElementById("typingBox");
var keysPressedText=document.getElementById("keysPressed");
var backspacesText=document.getElementById("backspaces");
var charactersText=document.getElementById("characters");
var wordsText=document.getElementById("words");
var wpmText=document.getElementById("wpm");
var averageTimeText=document.getElementById("averageTime");
var activityText=document.getElementById("activity");
var resetButton=document.getElementById("resetButton");
var keysPressed=0;
var backspaces=0;
var firstKeyTime=0;
var lastKeyTime=0;
var totalTimeBetweenKeys=0;
var numberOfTimeMeasurements=0;
typingBox.addEventListener("keydown", function(event){
    keysPressed=keysPressed+1;
    keysPressedText.innerText=keysPressed;
    if(event.key=="Backspace") {
        backspaces=backspaces+1;
        backspacesText.innerText=backspaces;
        activityText.innerText="Backspace pressed";
    }
    if(firstKeyTime==0) {
        firstKeyTime=Date.now();
        lastKeyTime=Date.now();
        activityText.innerText="Typing started";
    }
    else{
        var currentTime=Date.now();
        var timeBetweenKeys=currentTime-lastKeyTime;
        totalTimeBetweenKeys=totalTimeBetweenKeys+timeBetweenKeys;
        numberOfTimeMeasurements=numberOfTimeMeasurements+1;
        lastKeyTime=currentTime;
        var averageTime=totalTimeBetweenKeys/numberOfTimeMeasurements;
        averageTimeText.innerText=Math.round(averageTime);
        activityText.innerText="key pressed: "+event.key; 
    }
});
typingBox.addEventListener("input",function(){
    var text=typingBox.value;
    var characterCount=text.length;
    charactersText.innerText=characterCount;
    var words=text.trim().split(/\s+/);
    if(text.trim()==""){
        wordsText.innerText=0;
    }
    else {
        wordsText.innerText=words.length;
    }
    if(firstKeyTime!=0) {
        var currentTime=Date.now();
        var totalTime=currentTime-firstKeyTime;
        var minutes=totalTime/1000/60;
        if(minutes>0){
            var wordsCount=words.length;
            var wpm=wordsCount/minutes;
            wpmText.innerText=Math.round(wpm);
        }
    }
});
resetButton.addEventListener("click", function(){
    typingBox.value="";
    keysPressed=0;
    backspaces=0;
    firstKeyTime=0;
    lastKeyTime=0;
    totalTimeBetweenKeys=0;
    numberOfTimeMeasurements=0;
    keysPressedText.innerText=0;
    backspacesText.innerText=0;
    charactersText.innerText=0;
    wordsText.innerText=0;
    wpmText.innerText=0
    averageTimeText.innerText=0;
    activityText.innerText="No activity yet.";
});