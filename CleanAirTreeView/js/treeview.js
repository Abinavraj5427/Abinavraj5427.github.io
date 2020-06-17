var tree = [];

// Building Tree
$(document).ready(
    function(){
        $('#tree').treeview({
            data: getTree(),
            levels: 4,
            onNodeSelected: function(event, data){
                // console.log(data);
                openSideBar(data.type, data, -1);
            },
        })
    }
)

// Generates Initial Tree
function getTree(){
    if(tree.length == 0){
        return [
            {
              text: "Flare 1",
              type: "flare",
              name: "Flare 1",
              nodes: [
                {
                  text: "Header 1",
                  type: "header",
                  name: "Header 1",
                  nodes: [
                    {
                      text: "Process 1",
                      type: "process",
                      name: "Process 1",
                    },
                    {
                      text: "Instrument 2",
                      type: "instrument",
                      name: "Instrument 2",
                    }
                  ]
                },
                {
                  text: "Header 2",
                  type: "header",
                  name: "Header 2",
                }
              ]
            },
            {
              text: "Flare 2",
              type: "flare",
              name: "Flare 2",
            },
            {
              text: "Flare 3",
              type: "flare",
              name: "Flare 3",
            },
          ];
    }
    else {
        return tree;
    }
    
}

// Opens the Sidebar
function openSideBar(type, data){
    addSideBarElements(type, data, -1);

    document.getElementById("sidebar").style.width = "400px";
    document.getElementById("main").style.marginRight = "400px";
}

// Closes the Sidebar
function closeSideBar(){
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
}

// Adds Sidebar Elements
function addSideBarElements(type, data, select){

    // Clear Sidebar
    var bar= document.getElementById("sidebar_options");
    while (bar.firstChild) {
        bar.removeChild(bar.firstChild);
    }
    
    // Searching for Selection
    for(let i = 0; i< CRUDS.length; i++){

        if(CRUDS[i].type === type){

            // Adding Sidebar Links
            for(let j = 0; j< CRUDS[i].funcs.length; j++){
                var a = document.createElement("a");
                a.innerHTML = CRUDS[i].funcs[j].topic;
                a.href = "javascript:void(0)";
                a.onclick = (event) => {addSideBarElements(type, data, j); }
                bar.appendChild(a);

                
                if(j===select || (select === -1 && j == CRUDS[i].funcs.length-1)){
                    var total_inputs = CRUDS[i].funcs[j].inputs? CRUDS[i].funcs[j].inputs.length: 0;

                    // Adding Inputs
                    for(let k = 0; k < total_inputs; k++){
                        var label = document.createElement('label');
                        label.innerHTML = CRUDS[i].funcs[j].inputs[k];

                        var input = document.createElement('input');
                        input.type = 'text';
                        input.placeholder = 'blank';
                        if(CRUDS[i].funcs[j].CRUD === "update"){
                            // console.log(data);
                            input.value = data[CRUDS[i].funcs[j].inputs[k]];
                        }

                        var br = document.createElement("br");
                        bar.appendChild(label);
                        bar.appendChild(br);
                        bar.appendChild(input);
                       
                    }

                    var br2 = document.createElement("br");
                    var submit = document.createElement("button");
                    if(CRUDS[i].funcs[j].CRUD === "update"){
                        submit.innerHTML = "UPDATE";
                    } 
                    else if (CRUDS[i].funcs[j].CRUD === "create"){
                        submit.innerHTML = "CREATE";
                    }
                    else if (CRUDS[i].funcs[j].CRUD === "delete"){
                        submit.innerHTML = "DELETE";
                    }
                    bar.appendChild(br2);
                    bar.appendChild(submit);
                }
            }
            break;
        }
    }
}

// CRUD for Each Type
const CRUDS = [
    {
        type: 'plant',
        funcs:[
            {
                CRUD: 'create',
                topic: 'Create Flare',
                inputs: [
                    'name'
                ]
            }
        ]
    },
    {
        type: 'flare',
        funcs:[
            {
                CRUD: 'create',
                topic: 'Create Header',
                inputs: [
                    'name'
                ]
            },
            {
                CRUD: 'create',
                topic: 'Create Instrument',
                inputs: [
                    'name'
                ]
            },
            {
                CRUD: 'delete',
                topic: 'Delete Flare',
            },
            {
                CRUD: 'update',
                topic: 'Update Flare',
                inputs: [
                    'name'
                ]
            }
        ]
    },
    {
        type: 'header',
        funcs:[
            {
                CRUD: 'create',
                topic: 'Create Instrument',
                inputs: [
                    'name'
                ]
            },
            {
                CRUD: 'create',
                topic: 'Create Process',
                inputs: [
                    'name'
                ]
            },
            {
                CRUD: 'delete',
                topic: 'Delete Header',
            },
            {
                CRUD: 'update',
                topic: 'Update Header',
                inputs: [
                    'name'
                ]
            }
        ]
    },
    {
        type: 'instrument',
        funcs:[
            {
                CRUD: 'create',
                topic: 'Create Instrument Data',
                inputs: [
                    'PI tag'
                ]
            },
            {
                CRUD: 'delete',
                topic: 'Delete Instrument',
            },
            {
                CRUD: 'update',
                topic: 'Update Instrument',
                inputs: [
                    'name'
                ]
            }
        ]
    },
    {
        type: 'instrument data',
        funcs:[
            {
                CRUD: 'delete',
                topic: 'Delete PI Tag',
            },
            {
                CRUD: 'update',
                topic: 'Update PI Tag',
                inputs: [
                    'PI Tag'
                ]
            }
        ]
    },
    {
        type: 'process',
        funcs:[
            {
                CRUD: 'delete',
                topic: 'Delete Process',
            },
            {
                CRUD: 'update',
                topic: 'Update Process',
                inputs: [
                    'name'
                ]
            }
        ]
    },
];
