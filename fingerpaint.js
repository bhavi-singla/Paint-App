var drawing = false;
var context;
var snapshot;
var dragStartLocation;
var arr= new Array();
var lastpos;
var mainrect=0;
var selected=false;
function getCanvasCoordinates(event) {
    var x = event.clientX - context.canvas.getBoundingClientRect().left,
        y = event.clientY - context.canvas.getBoundingClientRect().top;

    return {x: x, y: y};
}
function takeSnapshot() {
    snapshot = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
}

function restoreSnapshot() {
    context.putImageData(snapshot, 0, 0);
}
window.onload=function()
{
    //Clear Button
    document.getElementById('btnClear').addEventListener('click', function(){
            context.clearRect(0,0, context.canvas.width, context.canvas.height); 
            arr=null;      
        }, false);
    
    //Back Button
    document.getElementById('btnBack').addEventListener('click', function(){
            document.getElementById('myCanvas').style.display = "block";
            document.getElementById('saveArea').style.display = "none";
            document.getElementById('tools').style.display = "block";
            document.getElementById('drag').style.display = "block";
            document.getElementById('imp').style.display = "block";


            
        }, false);
    
    //Width Scale
    document.getElementById('lineWidth').addEventListener('change', function(){
            context.lineWidth = document.getElementById('lineWidth').value;
        }, false);
    
    //Color
    document.getElementById('colorChange').addEventListener('change', function(){
            context.strokeStyle = document.getElementById('colorChange').value;
        }, false);
    
    //Save
    document.getElementById('btnSave').addEventListener('click', function(){
        document.getElementById('drag').style.display = "none";
            document.getElementById('myCanvas').style.display = "none";
            document.getElementById('saveArea').style.display = "block";
            document.getElementById('tools').style.display = "none";
            document.getElementById('imp').style.display = "none";

            
            var dataURL = document.getElementById('myCanvas').toDataURL();
            document.getElementById('canvasImg').src = dataURL;
        }, false);
    //Drag    
    

    document.getElementById('drag').addEventListener('click',function(){
          
            document.getElementById('drag').style.display = "none";
            document.getElementById('tools').style.display = "none";
            document.getElementById('done').style.display="block";
            drawing=false;
           /* document.addEventListener('mousedown',function(e){
                var point= getCanvasCoordinates(e);
                var iscond=false;
                var num = arr.length;
                var i=0;
                //console.log(num);
                for(i=0;i<num;i++)
                {
                    if(point.x > arr[i].x && point.x < arr[i].x+arr[i].wi)
                    {
                        if(point.y > arr[i].y && point.y < arr[i].y+arr[i].he)
                        {
                            iscond=true;
                            break;
                        }
                    }
                }
                //console.log(point);
                if(iscond)
                {
                    selected=true;
                    console.log('hey down');
                    document.addEventListener('mouseup',function(e){
                        e.preventDefault();
                        console.log(i);
                        console.log(getCanvasCoordinates(e));
                        selected=false;
                    },false);
                    
                }
            },false);*/
            
        
    },false);


    document.getElementById('done').addEventListener('click',function(){
        document.getElementById('tools').style.display = "block";
        document.getElementById('done').style.display="none";
        document.getElementById('drag').style.display = "block";
        drawing=true;
    },false);


    fillColor.addEventListener("input", changeFillStyle, false);

    
    context = document.getElementById('myCanvas').getContext("2d");
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight-190;
    
    //Mouse movement
    document.onmousemove = handleMouseMove;
    document.onmousedown = handleDown;
    document.onmouseup = handleUp;
    document.ondblclick = handledoubleclick;
    
    //Style line
    context.strokeStyle = "#000";
    context.fillStyle = fillColor.value;
    context.lineJoin = "round";
    context.lineWidth = 5;
    
    //Hide Save Area
    document.getElementById('saveArea').style.display = "none";
}
function changeFillStyle() {
    context.fillStyle = this.value;
    
}
function drawLine(position)
{
    context.beginPath();
    context.moveTo(dragStartLocation.x, dragStartLocation.y);
    context.lineTo(position.x, position.y);
    context.stroke();
}

function drawRectangle(position,fillbox)
{
    var halfw = Math.abs(position.x-dragStartLocation.x);
    var halfh = Math.abs(position.y-dragStartLocation.y);
    var x1 = dragStartLocation.x-halfw;
    var y1 = dragStartLocation.y - halfh;
    context.beginPath();
    if(fillbox.checked)
    context.fillRect(x1,y1,2*halfw,2*halfh);
    else
    context.strokeRect(x1,y1,2*halfw,2*halfh);
    context.closePath();
}

function draw(position) {

    var fillbox = document.getElementById("fillBox"),
        shape = document.querySelector('input[type="radio"][name="shape"]:checked').value;
    
   
    if (shape === "line") {
        drawLine(position);
    }
    if (shape === "rectangle") {
        drawRectangle(position,fillbox);
    }/*
    if (fillbox.checked) {
        context.fill();
    } else {
        context.stroke();
    }*/
    //console.log(arr);
}
function handledoubleclick(e){
    var curpos = getCanvasCoordinates(e);
    var n = arr.length;
    var i=0;
    var iscond1=false;
    for(i=0;i<n;i++)
    {
        if(curpos.x > arr[i].x && curpos.x < arr[i].x+arr[i].wi)
        {
            if(curpos.y > arr[i].y && curpos.y < arr[i].y+arr[i].he)
            {
                iscond1=true;
                break;
            }
        }
    }
        if(iscond1)
        {
            context.clearRect(arr[i].x,arr[i].y,arr[i].wi,arr[i].he);
            arr.slice(i,1);
        }
        else{
            console.log(curpos);
            console.log("you clicked anywhere else");
        }
    
}
function handleMouseMove(e)
{
    //console.log(e.clientX);
    //console.log(e.clientY);
    //if( document.getElementById('drag').style.display === "block" && document.getElementById('tools').style.display === "none")
    //{
        var position;
        if (drawing === true ) {
            restoreSnapshot();
            position = getCanvasCoordinates(e);
            draw(position);
            }
        
    
    //}
    /*if(drawing)
    {
        //restoreSnapshot();
        context.lineTo(e.clientX, e.clientY);
        context.closePath();
        context.stroke();
        context.moveTo(e.clientX, e.clientY);
    } else
    {
        context.moveTo(e.clientX, e.clientY);
    }*/
    
}

function handleDown(e)
{
        drawing = !drawing; 
        //console.log(drawing);
        dragStartLocation = getCanvasCoordinates(e);
        takeSnapshot();
       
    
        var point= getCanvasCoordinates(e);
        var iscond=false;
                
        var num = arr.length;
        var i=0;
        //console.log(num);
        for(i=0;i<num;i++)
        {
            if(point.x > arr[i].x && point.x < arr[i].x+arr[i].wi)
            {
                if(point.y > arr[i].y && point.y < arr[i].y+arr[i].he)
                {
                    iscond=true;
                    selected=true;
                    context.clearRect(arr[i].x,arr[i].y,arr[i].wi,arr[i].he);
                    mainrect=i;
                    drawing=false;
                    break;
                }
            }
        }
}

function handleUp(e)
{
    var position = getCanvasCoordinates(e);
    if(selected && document.getElementById('drag').style.display === "none")
    {
        //restoreSnapshot();
        context.beginPath();
        //if(fillbox.checked)
        context.fillRect(position.x - arr[mainrect].wi/2,position.y - arr[mainrect].he/2,arr[mainrect].wi,arr[mainrect].he);
        //else
        //  context.strokeRect(position.x - arr[mainrect].wi/2,position.y - arr[mainrect].he/2,arr[mainrect].wi,arr[mainrect].he);
        context.closePath();
        var entity = {x:position.x - arr[mainrect].wi/2 , y:position.y-arr[mainrect].he/2 , wi : arr[mainrect].wi, he: arr[mainrect].he };
        if(entity.wi!=0 && entity.he!=0)
        {   
            arr.push(entity);
            console.log(entity);
        }
        arr.slice(mainrect,1);
        selected=false;
        
    }
    else{
        drawing = false;
        restoreSnapshot();
    
        draw(position);
    
        var width1 = Math.abs(dragStartLocation.x-position.x );
        var height1 = Math.abs(dragStartLocation.y-position.y);
        var x1;
        var y1;
        if(dragStartLocation.x < position.x)
            x1=dragStartLocation.x - width1;
        else
            x1=position.x;
        if(dragStartLocation.y < position.y)
            y1=dragStartLocation.y-height1;
        else
            y1=position.y;
        var entity = {x:x1, y:y1 , wi : 2*Math.abs(dragStartLocation.x-position.x ), he: 2*Math.abs(dragStartLocation.y-position.y)};
        if(entity.wi!=0 && entity.he!=0)
        {   
            arr.push(entity);
            console.log(entity);
        }
    }
}