img=""
Objects=[]
status1=""

function preload(){
song= loadSound("Alarm.mp3")
}
function setup(){
    canvas= createCanvas(640,420)
    canvas.center()
    camera=createCapture(VIDEO)
    camera.size(640,420)
    camera.hide()
    objectDetector=ml5.objectDetector('cocossd',modelLoaded)
    document.getElementById("status").innerHTML="status:detecting objects"
    }
    
    function modelLoaded(){
        console.log("modelLoaded")
        status1=true
        
    }

function draw(){
image(camera,0,0,640,420)
r=random(255)
g=random(255)
b=random(255)
if(status1 != ""){
    objectDetector.detect(camera,gotResult)
    for(i=0;i<Objects.length;i++){
        document.getElementById("status").innerHTML="status:objectDetected"
        document.getElementById("no_of_obj").innerHTML="number of objects detected are: "+Objects.length
        percent=floor(Objects[i].confidence*100)
        fill(r,g,b)
        text(Objects[i].label+" "+percent+"%",Objects[i].x+40,Objects[i].y+20)
        noFill()
        stroke(r,g,b)
        rect(Objects[i].x,Objects[i].y,Objects[i].width,Objects[i].height)
        if(Objects[i].label=="person"){
            document.getElementById("no_of_obj").innerHTML="Baby Found"
            song.stop()
        }
        else{
            document.getElementById("no_of_obj").innerHTML="Baby Not Found"
            song.play()
        }
        if(Objects.length==0){
            document.getElementById("no_of_obj").innerHTML="Baby Not Found"
            song.play()
        }

        


    }
   
}
}



function gotResult(error,results){
    if(error){
        console.log(error)
    }
    console.log(results)
    Objects=results
}
 