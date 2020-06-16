var tree = [];

// Building Tree
$(document).ready(
    function(){
        $('#tree').treeview({
            data: getTree(),
            levels: 4,
            onNodeSelected: function(event, data){
                // console.log(data);
                openSideBar(data.type, data);
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
    var bar= document.getElementById("sidebar_options");
    while (bar.firstChild) {
        bar.removeChild(bar.firstChild);
    }

    addSideBarElements(bar, type, data, -1);

    document.getElementById("sidebar").style.width = "400px";
    document.getElementById("main").style.marginRight = "400px";
}

// Closes the Sidebar
function closeSideBar(){
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
}

// Adds Sidebar Elements
function addSideBarElements(node, type, data){
    console.log("A");
    for(var i = 0; i< CRUDS.length; i++){
        console.log("B");
        if(CRUDS[i].type === type){
            console.log("C");
            for(var j = 0; j< CRUDS[i].funcs.length; j++){
                console.log("D");
                var a = document.createElement("a");
                a.innerHTML = CRUDS[i].funcs[j].topic;
                a.href = "#";
                node.appendChild(a);
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
                    'flare name'
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
                    'header name'
                ]
            },
            {
                CRUD: 'create',
                topic: 'Create Instrument',
                inputs: [
                    'instrument name'
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
                    'header name'
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
                    'Instrument name'
                ]
            },
            {
                CRUD: 'create',
                topic: 'Create Process',
                inputs: [
                    'Process name'
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
                    'header name'
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
                    'Instrument name'
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
                    'process name'
                ]
            }
        ]
    },
];
