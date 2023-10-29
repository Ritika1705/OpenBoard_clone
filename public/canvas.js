let canvas = document.querySelector("canvas");
let pencil_colors = document.querySelectorAll(".pencil-color");
let pencil_width = document.querySelector(".pencil_width");
let eraser_width = document.querySelector(".eraser_width");
let undo = document.querySelector(".undo");
let redo = document.querySelector(".redo");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drawing = false;
let pencilColor = "red";
let pencilWidth = "3";
let eraserColor = "white";
let eraserWidth = "3";
let undoredotracker = [];
let track;

pencil_colors.forEach((colorele) => {
    colorele.addEventListener("click", (e) => {
        let pencolor = colorele.classList[1];
        console.log(pencolor);
        pencilColor = pencolor;
        tool.strokeStyle = pencilColor;
    })
})

pencil_width.addEventListener("change", (e) => {
    let val = pencil_width.value;
    //console.log(val);
    pencilWidth = val;
    tool.lineWidth = pencilWidth;
})

undo.addEventListener("click", (e) => {
    alert("undo track" + track);
    if(track > 0)
    {
        track--;
    }
    let data = {
        trackValue: track,
        undoredotracker
    }
    socket.emit("redoundo",data);
    //drawoncanvas(track);
})

redo.addEventListener("click", (e) => {
    if(track < undoredotracker.length - 1)
    {
        track++;
    }
    let data = {
        trackValue: track,
        undoredotracker
    }
    socket.emit("redoundo",data);
    //drawoncanvas(track);
})

function drawoncanvas(idx)
{
    let strurl = undoredotracker[idx];
    //console.log(strurl);
    var img = new Image();
    img.src = strurl;

    img.onload = (e) =>  {
        tool.drawImage(img,0,0,canvas.width,canvas.height);
    }
}

eraser_width.addEventListener("change", (e) => {
    let val = eraser_width.value;
    //console.log(val);
    eraserWidth = val;
    tool.lineWidth = eraserWidth
})

eraser.addEventListener("click", (e) => {
    if(eraserFlag)
    {
        tool.strokeStyle = eraserColor;
        tool.lineWidth = eraserWidth
    }
    else
    {
        tool.strokeStyle = pencilColor;
        tool.lineWidth = pencilWidth;
    }
})


//API
let tool = canvas.getContext("2d");

//Default style
tool.strokeStyle = pencilColor;
tool.lineWidth = pencilWidth;

canvas.addEventListener("mousedown", (e) => {
    //tool.beginPath();
    drawing = true;
    //tool.moveTo(e.clientX, e.clientY);
    let data = {
        x: e.clientX,
        y: e.clientY
    }
    socket.emit("beginPath", data);
})

canvas.addEventListener("mousemove", (e) => {
    if(drawing)
    {
        let data = {
            x: e.clientX,
            y: e.clientY,
            color: eraserFlag? eraserColor:pencilColor,
            width: eraserFlag? eraserWidth:pencilWidth
        }

        socket.emit("drawStroke",data);
        //tool.lineTo(e.clientX, e.clientY);
        //tool.stroke();
    }
    
})

canvas.addEventListener("mouseup" , (e) => {

    drawing = false;
    let url = canvas.toDataURL();
    undoredotracker.push(url);
    track = undoredotracker.length - 1;
    console.log(track);
})

socket.on("beginPath",(data) => {
    tool.beginPath();
    tool.moveTo(data.x,data.y);
})

socket.on("drawStroke",(data) => {
    tool.lineTo(data.x,data.y);
    tool.strokeStyle = data.color;
    tool.lineWidth = data.width;
    tool.stroke();
})

socket.on("redoundo", (data) => {
    drawoncanvas(data.trackValue); 
})
