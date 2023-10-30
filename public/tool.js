let optionsCont = document.querySelector(".options_cont");
let optionsFlag;
let tools_cont = document.querySelector(".tools_cont");
let pencil_tool_cont = document.querySelector(".pencil-tool-cont");
let eraser_tool_cont = document.querySelector(".eraser-tool-cont");
let sticky_note_cont = document.querySelector(".sticky_cont");

let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");
let sticky_note = document.querySelector(".sticky_note");
let upload = document.querySelector(".upload");
let download = document.querySelector(".download");

let pencilFlag = false;
let eraserFlag = false;
let sticky_noteFlag = false;

optionsCont.addEventListener("click", (e) => {
    let icon_elem = optionsCont.children[0];
    if(icon_elem.classList.contains("fa-bars"))
    {
        icon_elem.classList.remove("fa-bars");
        icon_elem.classList.add("fa-times");
        optionsFlag = false;
        tools_cont.style.display = "none";
        pencil_tool_cont.style.display = "none";
        eraser_tool_cont.style.display = "none";
    }
    else
    {
        icon_elem.classList.add("fa-bars");
        icon_elem.classList.remove("fa-times");
        optionsFlag = true;
        tools_cont.style.display = "flex";
    }
})

pencil.addEventListener("click", (e) => {
    pencilFlag = !pencilFlag;

    if(pencilFlag)
    {
        pencil_tool_cont.style.display = "block";
    }
    else
    {
        pencil_tool_cont.style.display = "none";
    }
})

eraser.addEventListener("click", (e) => {
    eraserFlag = !eraserFlag;
    console.log("Eraser");
    if(eraserFlag)
    {
        eraser_tool_cont.style.display = "flex";
    }
    else
    {
        eraser_tool_cont.style.display = "none";
    }
})

sticky_note.addEventListener("click", (e) => {
    let stickynotecont = document.createElement("div");
    stickynotecont.setAttribute("class", "sticky_cont");
    stickynotecont.innerHTML = `
        <div class="header_cont">
            <div class="minimize_box"></div>
                <div class="remove_box"></div>
            </div>
            <div class="content_cont">
                <textarea class="content_area"></textarea>
            </div>
        </div>
    `
    document.body.appendChild(stickynotecont);

    let minimize_button = document.querySelector(".minimize_box");
    let remove_button = document.querySelector(".remove_box");
    stickyActions(minimize_button, remove_button, stickynotecont);

    stickynotecont.ondblclick = function(event) {
        drag_and_drop(stickynotecont,event);
        console.log("hello");
    };

    stickynotecont.ondragstart = function() {
        return false;
    };
})

upload.addEventListener("click", (e) => {

    let input = document.createElement("input");
    input.setAttribute("type","file");
    input.click();

    input.addEventListener("change", (e) => {
        let file = input.files[0];
        let url = URL.createObjectURL(file);

        let stickynotecont = document.createElement("div");
        stickynotecont.setAttribute("class", "sticky_cont");
        stickynotecont.innerHTML = `
            <div class="header_cont">
                <div class="minimize_box"></div>
                    <div class="remove_box"></div>
                </div>
                <div class="content_cont">
                    <img src="${url}"></img>
                </div>
            </div>
        `
        document.body.appendChild(stickynotecont);

        let minimize_button = document.querySelector(".minimize_box");
        let remove_button = document.querySelector(".remove_box");
        stickyActions(minimize_button, remove_button, stickynotecont);

        stickynotecont.ondblclick = function(event) {
            drag_and_drop(stickynotecont,event);
            console.log("hello");
        };

        stickynotecont.ondragstart = function() {
            return false;
        };
        })
    
})

function stickyActions(minimize_button, remove_button, stickyCont)
{
    remove_button.addEventListener("click", (e) => {
        console.log("remove");
        stickyCont.remove();
    })

    minimize_button.addEventListener("click", (e) => {
        let note_cont = document.querySelector(".content_area");
        let display = getComputedStyle(note_cont).getPropertyValue("display");
        console.log(display);
        if(display === "none")
        {
            note_cont.style.display = "block";
            //note_cont.style.backgroundColor = "yellow";
        }
        else
        {
            note_cont.style.display = "none";
            //note_cont.style.backgroundColor = "red";
        }
    })
}

function drag_and_drop(ele, event)
{
    ele.style.position = 'absolute';
    ele.style.zIndex = "1000";

    // move it out of any current parents directly into body
    // to make it positioned relative to the body
    document.body.append(ele);

    // centers the ball at (pageX, pageY) coordinates
    function moveAt(pageX, pageY) {
    ele.style.left = pageX - ele.offsetWidth / 2 + 'px';
    ele.style.top = pageY - ele.offsetHeight / 2 + 'px';
    }

    // move our absolutely positioned ball under the pointer
    moveAt(event.pageX, event.pageY);

    function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
    }

    // (2) move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // (3) drop the ball, remove unneeded handlers
    ele.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ele.onmouseup = null;
    };
}

download.addEventListener("click", (e) => {
    var a = document.createElement("a");
    a.href = canvas.toDataURL("image/jpg");
    a.download = "canvas.jpg";
    a.click();
})