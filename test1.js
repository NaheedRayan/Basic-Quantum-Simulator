const draggableElements = document.querySelectorAll(".draggable");
const droppableElements = document.querySelectorAll(".matrix_box");

const prev_data = "";
var ROW = 8;
var COL = 19;


var mp_V = new Map()

mp_V["0"] = "v";
mp_V["1"] = "V";
mp_V["v"] = "1";
mp_V["V"] = "0";
mp_V["w"] = "0";
mp_V["W"] = "1";


var mp_V_plus = new Map()

mp_V_plus["0"] = "w";
mp_V_plus["1"] = "W";
mp_V_plus["v"] = "0";
mp_V_plus["V"] = "1";
mp_V_plus["w"] = "1";
mp_V_plus["W"] = "0";


draggableElements.forEach(elem => {
    elem.addEventListener("dragstart", dragStart); // Fires as soon as the user starts dragging an item - This is where we can define the drag data
    // elem.addEventListener("drag", drag); // Fires when a dragged item (element or text selection) is dragged
    // elem.addEventListener("dragend", dragEnd); // Fires when a drag operation ends (such as releasing a mouse button or hitting the Esc key) - After the dragend event, the drag and drop operation is complete
});

droppableElements.forEach(elem => {
    elem.addEventListener("dragstart", dragStart_box)
    elem.addEventListener("click", toggle_one_zero)

    elem.addEventListener("dragenter", dragEnter); // Fires when a dragged item enters a valid drop target
    elem.addEventListener("dragover", dragOver); // Fires when a dragged item is being dragged over a valid drop target, repeatedly while the draggable item is within the drop zone
    elem.addEventListener("dragleave", dragLeave); // Fires when a dragged item leaves a valid drop target
    elem.addEventListener("drop", drop); // Fires when an item is dropped on a valid drop target
});


function toggle_one_zero(event) {

    if (event.target.getAttribute("data-variable") == "0") {

        event.target.setAttribute("data-variable", "1")
        event.target.setAttribute("src", "one.png")

    } else if (event.target.getAttribute("data-variable") == "1") {

        event.target.setAttribute("data-variable", "0")
        event.target.setAttribute("src", "zero.png")

    }

    run_script()
}

// Drag and Drop Functions
//Events fired on the drag target

function dragStart(event) {
    // console.log("ok")
    if (event.target.id == "V" || event.target.id == "V+" || event.target.id == "CNOT" || event.target.id == "NOT" || event.target.id == "up" || event.target.id == "down")
        event.dataTransfer.setData("text1", event.target.id); // or "text/plain" but just "text" would also be fine since we are not setting any other type/format for data value


}

function dragStart_box(event) {
    var data_value = event.target.getAttribute("data-variable")
    event.dataTransfer.setData("text2", data_value); // or "text/plain" but just "text" would also be fine since we are not setting any other type/format for data value
    event.dataTransfer.setData("text3", event.target.getAttribute("id")); // or "text/plain" but just "text" would also be fine since we are not setting any other type/format for data value

    // console.log(event.target.getAttribute("data-variable"))

}

//Events fired on the drop target

function dragEnter(event) {
    // if (!event.target.classList.contains("dropped")) {
    //     event.target.classList.add("droppable-hover");
    // }
}

function dragOver(event) {
    event.preventDefault(); // Prevent default to allow drop

}

function dragLeave(event) {

}


/////////////////////////////////////////////////////
//////////// When element is droped /////////////////
/////////////////////////////////////////////////////
function drop(event) {
    event.preventDefault(); // This is in order to prevent the browser default handling of the data

    const draggableElementData1 = event.dataTransfer.getData("text1"); // if the element is dragged from the toolbox
    const draggableElementData2 = event.dataTransfer.getData("text2"); // if the elememt is dragged inside the matrix



    /////////////////////////////////////////////////////
    // If the element was dragged from the toolbox  /////
    /////////////////////////////////////////////////////

    if (draggableElementData1 == "V" || draggableElementData1 == "V+" || draggableElementData1 == "CNOT" || draggableElementData1 == "NOT") {
        const droppableElementData = event.target.getAttribute("id");
        if (event.target.getAttribute("data-variable") == "") {

            document.getElementById(droppableElementData).src = `${draggableElementData1}.png`
            document.getElementById(droppableElementData).setAttribute("data-variable", draggableElementData1)

        }
    }

    if (draggableElementData1 == "up") {

        const droppableElementData = event.target.getAttribute("id");
        if (event.target.getAttribute("data-variable") == "") {

            document.getElementById(droppableElementData).src = `up.png`
            document.getElementById(droppableElementData).setAttribute("data-variable", draggableElementData1)
        }

        var arr = droppableElementData.split("-")
        // no of row is 8
        for (var i = Number(arr[1]) - 1; i >= 0; i--) {

            var a = document.getElementById(`r-${i}-c-${Number(arr[3])}`).getAttribute("data-variable")

            if (a == "") {
                document.getElementById(`r-${i}-c-${Number(arr[3])}`).setAttribute("data-variable", "|u")
                document.getElementById(`r-${i}-c-${Number(arr[3])}`).setAttribute("src", "|u.png")
            } else
                break;
        }
    }

    if (draggableElementData1 == "down") {

        const droppableElementData = event.target.getAttribute("id");
        if (event.target.getAttribute("data-variable") == "") {

            document.getElementById(droppableElementData).src = `down.png`
            document.getElementById(droppableElementData).setAttribute("data-variable", draggableElementData1)
        }

        var arr = droppableElementData.split("-")
        // no of row is 8
        for (var i = Number(arr[1]) + 1; i < 8; i++) {

            var a = document.getElementById(`r-${i}-c-${Number(arr[3])}`).getAttribute("data-variable")

            if (a == "") {
                document.getElementById(`r-${i}-c-${Number(arr[3])}`).setAttribute("data-variable", "|d")
                document.getElementById(`r-${i}-c-${Number(arr[3])}`).setAttribute("src", "|d.png")
            } else
                break;
        }
    }

    /////////////////////////////////////////////////////
    // If elements are being dragged inside the matrix //
    /////////////////////////////////////////////////////

    if (draggableElementData2 == "V" || draggableElementData2 == "V+" || draggableElementData2 == "CNOT" || draggableElementData2 == "NOT") {
        var starting_pos = event.dataTransfer.getData("text3")
        var ending_pos = event.target.getAttribute("id");

        if (event.target.getAttribute("data-variable") == "") {
            document.getElementById(starting_pos).setAttribute("data-variable", "")
            document.getElementById(starting_pos).setAttribute("src", "single_path_line.png")


            document.getElementById(ending_pos).setAttribute("data-variable", draggableElementData2)
            document.getElementById(ending_pos).setAttribute("src", `${draggableElementData2}.png`)
        }
    }

    if (draggableElementData2 == "up") {
        var starting_pos = event.dataTransfer.getData("text3")
        var ending_pos = event.target.getAttribute("id");

        if (event.target.getAttribute("data-variable") == "") {

            document.getElementById(ending_pos).src = `up.png`
            document.getElementById(ending_pos).setAttribute("data-variable", "up")


            document.getElementById(starting_pos).src = `single_path_line.png`
            document.getElementById(starting_pos).setAttribute("data-variable", "")

        }

        var arr1 = ending_pos.split("-")
        // no of row is 8
        for (var i = Number(arr1[1]) - 1; i >= 0; i--) {

            var a = document.getElementById(`r-${i}-c-${Number(arr1[3])}`).getAttribute("data-variable")

            if (a == "") {
                document.getElementById(`r-${i}-c-${Number(arr1[3])}`).setAttribute("data-variable", "|u")
                document.getElementById(`r-${i}-c-${Number(arr1[3])}`).setAttribute("src", "|u.png")
            } else
                break;
        }

        var arr2 = starting_pos.split("-")
        // no of row is 8
        for (var i = Number(arr2[1]) - 1; i >= 0; i--) {

            var a = document.getElementById(`r-${i}-c-${Number(arr2[3])}`).getAttribute("data-variable")
            // console.log(a)

            if (a == "|u") {
                document.getElementById(`r-${i}-c-${Number(arr2[3])}`).setAttribute("data-variable", "")
                document.getElementById(`r-${i}-c-${Number(arr2[3])}`).setAttribute("src", "single_path_line.png")
            } else
                break;
        }
    }

    if (draggableElementData2 == "down") {
        var starting_pos = event.dataTransfer.getData("text3")
        var ending_pos = event.target.getAttribute("id");

        if (event.target.getAttribute("data-variable") == "") {

            document.getElementById(ending_pos).src = `down.png`
            document.getElementById(ending_pos).setAttribute("data-variable", "down")

            document.getElementById(starting_pos).src = `single_path_line.png`
            document.getElementById(starting_pos).setAttribute("data-variable", "")
        }

        var arr1 = ending_pos.split("-")
        // no of row is 8
        for (var i = Number(arr1[1]) + 1; i < 8; i++) {

            var a = document.getElementById(`r-${i}-c-${Number(arr1[3])}`).getAttribute("data-variable")

            if (a == "") {
                document.getElementById(`r-${i}-c-${Number(arr1[3])}`).setAttribute("data-variable", "|d")
                document.getElementById(`r-${i}-c-${Number(arr1[3])}`).setAttribute("src", "|d.png")
            } else
                break;
        }

        var arr2 = starting_pos.split("-")
        // no of row is 8
        for (var i = Number(arr2[1]) + 1; i < 8; i++) {

            var a = document.getElementById(`r-${i}-c-${Number(arr2[3])}`).getAttribute("data-variable")
            // console.log(a)

            if (a == "|d") {
                document.getElementById(`r-${i}-c-${Number(arr2[3])}`).setAttribute("data-variable", "")
                document.getElementById(`r-${i}-c-${Number(arr2[3])}`).setAttribute("src", "single_path_line.png")
            } else
                break;
        }
    }

    run_script()


}



function run_script() {
    console.log("ik")


    const droppableElements = document.querySelectorAll(".matrix_box");

    // creating an matrix array
    var matrix = new Array(ROW);
    for (var i = 0; i < ROW; i++)
        matrix[i] = new Array(COL);

    // creating an value array
    var value = new Array(ROW);
    for (var i = 0; i < ROW; i++)
        value[i] = new Array(COL);

    // assigning 0 to value 
    for (var i = 0; i < ROW; i++)
        for (var j = 0; j < COL; j++)
            value[i][j] = "0"


    var input_data = new Array(ROW)
    var output_data = new Array(ROW)


    droppableElements.forEach(elem => {
        //    console.log(elem.getAttribute("id") + "-----------------" + elem.getAttribute("data-variable"))
        var pos = elem.getAttribute("id")
        var elememt_data = elem.getAttribute("data-variable")

        pos = pos.split("-")


        // first col
        if (pos[3] == "0") {
            input_data[pos[1]] = elememt_data
            matrix[pos[1]][pos[3]] = "-"
        }
        // last col
        else if (pos[3] == COL - 1) {
            output_data[pos[1]] = elememt_data
            matrix[pos[1]][pos[3]] = "-"
        } else if (elememt_data == "")
            matrix[pos[1]][pos[3]] = "-"
        else
            matrix[pos[1]][pos[3]] = elememt_data


    });


    // console.log(input_data)
    // console.log(matrix)
    // console.log(value)

    // console.log(mp_V_plus["0"])

    function crawl(i, j, state, main_branch) {

        if (i >= ROW || j >= COL || i < 0 || i >= ROW || j < 0 || j >= COL)
            return;



        if (matrix[i][j] == "-") {
            value[i][j] = state;

            // going to the right
            if (j + 1 < COL) {
                if (matrix[i][j + 1] == "|u" || matrix[i][j + 1] == "|d")
                    crawl(i, j + 1, state, 0);
                else
                    crawl(i, j + 1, state, 1);
            }


        } else if (matrix[i][j] == "CNOT") {
            if (value[i][j] == "1") {

                if (state == "0")
                    state = "1";
                else state = "0";

            }

            if (j + 1 < COL && main_branch == 1) {
                // cout << "hello" <<endl ;
                if (matrix[i][j + 1] == "|u" || matrix[i][j + 1] == "|d")
                    crawl(i, j + 1, state, 0);
                else
                    crawl(i, j + 1, state, 1);
            }

        } else if (matrix[i][j] == "down") {


            value[i][j] = state;
            if ((i + 1 < ROW && i + 1 >= 0)) {
                if (matrix[i + 1][j] == "|d") {
                    crawl(i + 1, j, state, 1);
                } else if (matrix[i + 1][j] == "CNOT") {
                    value[i + 1][j] = state;
                    // crawl(i+1 , j , state , 0) ;
                } else if (matrix[i + 1][j] == "V") {
                    value[i + 1][j] = state;
                    // crawl(i+1 , j , state , 0) ;
                } else if (matrix[i + 1][j] == "V+") {
                    value[i + 1][j] = state;
                    // crawl(i+1 , j , state , 0) ;
                }
            }


            if (j + 1 < COL) {

                if (matrix[i][j + 1] == "|u" || matrix[i][j + 1] == "|d") {
                    crawl(i, j + 1, state, 0);
                } else {
                    crawl(i, j + 1, state, 1);
                }
            }

        } else if (matrix[i][j] == "up") {

            value[i][j] = state;
            // cout << state <<endl ;
            if ((i - 1 < ROW && i - 1 >= 0)) {
                // cout << "hello3" <<endl ;

                if (matrix[i - 1][j] == "|u")
                    crawl(i - 1, j, state, 1);
                else if (matrix[i - 1][j] == "CNOT") {
                    value[i - 1][j] = state;
                    // crawl(i-1 , j , state , 0) ;
                } else if (matrix[i - 1][j] == "V") {
                    value[i - 1][j] = state;
                    // crawl(i-1 , j , state , 0) ;
                } else if (matrix[i - 1][j] == "V+") {
                    value[i - 1][j] = state;
                    // crawl(i-1 , j , state , 0) ;
                }
            }
            if (j + 1 < COL) {
                if (matrix[i][j + 1] == "|u" || matrix[i][j + 1] == "|d")
                    crawl(i, j + 1, state, 0);
                else
                    crawl(i, j + 1, state, 1);
            }
        } else if (matrix[i][j] == "|d") {
            if (main_branch == 1 && matrix[i + 1][j] == "|d") {
                crawl(i + 1, j, state, 1);
            } else if (main_branch == 1 && (matrix[i + 1][j] == "V" || matrix[i + 1][j] == "V+" || matrix[i + 1][j] == "CNOT")) {
                value[i + 1][j] = state;
                // crawl(i+1 , j , state , 0) ;
            } else if (main_branch == 0 && (matrix[i][j + 1] == "|d" || matrix[i][j + 1] == "|u")) {
                crawl(i, j + 1, state, 0);
            } else if (main_branch == 0)
                crawl(i, j + 1, state, 1);
        } else if (matrix[i][j] == "|u") {
            if (main_branch == 1 && matrix[i - 1][j] == "|u") {
                crawl(i - 1, j, state, 1);
            } else if (main_branch == 1 && (matrix[i - 1][j] == "V" || matrix[i - 1][j] == "V+" || matrix[i - 1][j] == "CNOT")) {
                value[i - 1][j] = state;
                // crawl(i-1 , j , state , 0) ;
            } else if (main_branch == 0 && (matrix[i][j + 1] == "|d" || matrix[i][j + 1] == "|u")) {
                crawl(i, j + 1, state, 0);
            } else if (main_branch == 0) {
                crawl(i, j + 1, state, 1);
            }
        } else if (matrix[i][j] == "V") {
            if (main_branch == 1 && value[i][j] == "1") {
                // cout << "Inside  v "<<state <<endl ;   
                state = mp_V[state];
                // value[i][j] = state;

                if (matrix[i][j + 1] == "|u" || matrix[i][j + 1] == "|d")
                    crawl(i, j + 1, state, 0);
                else
                    crawl(i, j + 1, state, 1);
            } else {
                // cout << "Inside else in v "<<state <<endl ;

                // value[i][j] = state;
                if (matrix[i][j + 1] == "|u" || matrix[i][j + 1] == "|d")
                    crawl(i, j + 1, state, 0);
                else
                    crawl(i, j + 1, state, 1);

            }
        } else if (matrix[i][j] == "V+") {
            if (main_branch == 1 && value[i][j] == "1") {
                // cout << "Inside  v+ "<<state <<endl ;
                state = mp_V_plus[state];
                // value[i][j] = state;
                // value[i][j+1] = state;
                if (matrix[i][j + 1] == "|u" || matrix[i][j + 1] == "|d")
                    crawl(i, j + 1, state, 0);
                else
                    crawl(i, j + 1, state, 1);

            } else {
                // cout << "Inside else in v+ "<<state <<endl ;

                // value[i][j] = state;
                // value[i][j+1] = state;
                if (matrix[i][j + 1] == "|u" || matrix[i][j + 1] == "|d")
                    crawl(i, j + 1, state, 0);
                else
                    crawl(i, j + 1, state, 1);

            }
        }
        else if (matrix[i][j] == "NOT") {
            if (state == "1")
                crawl(i, j + 1, "0", 1);
            else
                crawl(i, j + 1, "1", 1);
        }


    }

    for (var i = 0; i < 5; i++) {

        for (var j = 0; j < ROW; j++) {
            crawl(j, 0, input_data[j], 1)
        }
        // crawl(0 , 0 , "1" , 1);
        // crawl(1 , 0 , "1" , 1);
        // crawl(2 , 0 , "0" , 1);

    }

    for (var j = 0; j < ROW; j++) {

        document.getElementById(`r-${j}-c-${COL-1}`).setAttribute("data-variable", value[j][COL - 1])

        if (value[j][COL - 1] == "1")
            document.getElementById(`r-${j}-c-${COL-1}`).setAttribute("src", `one.png`)

        else if (value[j][COL - 1] == "0")
            document.getElementById(`r-${j}-c-${COL-1}`).setAttribute("src", `zero.png`)

        else if (value[j][COL - 1] == "v")
            document.getElementById(`r-${j}-c-${COL-1}`).setAttribute("src", `small_v.png`)

        else if (value[j][COL - 1] == "V")
            document.getElementById(`r-${j}-c-${COL-1}`).setAttribute("src", `big_v.png`)

        else if (value[j][COL - 1] == "w")
            document.getElementById(`r-${j}-c-${COL-1}`).setAttribute("src", `small_w.png`)

        else if (value[j][COL - 1] == "W")
            document.getElementById(`r-${j}-c-${COL-1}`).setAttribute("src", `big_w.png`)


    }



    // console.log(value)


}
