var tree = [];
var tree_flares = flares;
var tree_headers = headers;
var tree_processes = processes;
var tree_instruments = instruments;
var tree_instrument_data = instrument_data;

// Building Tree
$(document).ready(
    function(){
      var create_flare_btn = document.getElementById("create-flare");
      var create_flare_data = {id:1}
      create_flare_btn.onclick = () => {displayData(JSON.stringify(create_flare_data))}
      buildTree();
      showTree();

      $('.treeview-animated').mdbTreeview();
    }
)

// Updates Tree View
function refreshTree(){
  $('.treeview-animated').mdbTreeview();
}

function printtree(){
  var tree_root = document.getElementById("root-ul");
  console.log(tree_root);
}

// Generates Initial Tree
function buildTree(){
  tree = [];
  var plant_id = 1; //testing value

  // Adding Flares
  tree_flares.map(flare => {
    if(flare.plant_id == plant_id){
      flare["nodes"] = [];

      // Adding Headers
      tree_headers.map(header => {
        if(header.flare_id == flare.id){
          header["nodes"] = [];

          // Adding Processes
          tree_processes.map(process => {
            if(process.header_id == header.id){
              header["nodes"].push(process);
            }
          });

          // Adding Instruments to Header
          tree_instruments.map(instrument => {
            if(instrument.parent_type === 'header' && instrument.parent_id == header.id){
              instrument["nodes"] = [];

              //Adding Instrument Data
              tree_instrument_data.map(data => {
                if(data.instrument_id == instrument.id){
                  instrument["nodes"].push(data);
                }
              });
              
              header["nodes"].push(instrument);
            }
          });
          flare["nodes"].push(header);
        }

        
      });

      // Adding Instruments to Flare
      tree_instruments.map(instrument => {
        if(instrument.parent_type === 'flare' && instrument.parent_id == flare.id){
          instrument["nodes"] = [];

          //Adding Instrument Data
          tree_instrument_data.map(data => {
            if(data.instrument_id == instrument.id){
              instrument["nodes"].push(data);
            }
          });
          
          flare["nodes"].push(instrument);
        }
      });
      tree.push(flare);
    }

  })
  console.log(tree);
}


function showTree(){

  var tree_root = document.getElementById("root-ul");
  while (tree_root.firstChild) {
    tree_root.removeChild(tree_root.firstChild);
  }
  
  //Display Flares
  tree.map(flare => {

    var flare_li =  document.createElement("li");
    flare_li.classList.add("treeview-animated-items");
    var flare_a = document.createElement("a");
    flare_a.classList.add("closed");
    flare_a.onclick = () => {displayData(JSON.stringify(flare));}
    var flare_span = document.createElement("span");
    flare_span.innerHTML = flare.name;

    // Adding Arrow Change
    if(flare.nodes.length != 0){
      var icon1 = document.createElement("i");
      icon1.classList.add("fas");
      icon1.classList.add("fa-angle-right");
      flare_a.appendChild(icon1);
    }

    flare_a.appendChild(flare_span);
    flare_li.appendChild(flare_a);

    if(flare.nodes.length != 0){

      var flare_ul = document.createElement("ul");
      flare_ul.classList.add("nested");

      // Looping through headers and inst
      flare.nodes.map(head_inst => {
        var head_inst_li =  document.createElement("li");
        head_inst_li.classList.add("treeview-animated-items");
        var head_inst_a = document.createElement("a");
        head_inst_a.classList.add("closed");
        head_inst_a.onclick = () => {displayData(JSON.stringify(head_inst));}
        var head_inst_span = document.createElement("span");
        head_inst_span.innerHTML = head_inst.name;

        // Adding Arrow Change
        if(head_inst.nodes.length != 0){
          var icon2 = document.createElement("i");
          icon2.classList.add("fas");
          icon2.classList.add("fa-angle-right");
          head_inst_a.appendChild(icon2);
        }

        head_inst_a.appendChild(head_inst_span);
        head_inst_li.appendChild(head_inst_a);

        if(head_inst.nodes.length != 0){
          var head_inst_ul = document.createElement("ul");
          head_inst_ul.classList.add("nested");

          // Looping through processes and inst
          head_inst.nodes.map(proc_inst => {
            var proc_inst_li =  document.createElement("li");
            proc_inst_li.classList.add("treeview-animated-items");
            var proc_inst_a = document.createElement("a");
            proc_inst_a.classList.add("closed");
            proc_inst_a.onclick = () => {displayData(JSON.stringify(proc_inst));}
            var proc_inst_span = document.createElement("span");
            proc_inst_span.innerHTML = proc_inst.name || proc_inst.pi_tag;

            // Adding Arrow Change
            if(proc_inst.nodes && proc_inst.nodes.length != 0){
              var icon3 = document.createElement("i");
              icon3.classList.add("fas");
              icon3.classList.add("fa-angle-right");
              proc_inst_a.appendChild(icon3);
            }

            proc_inst_a.appendChild(proc_inst_span);
            proc_inst_li.appendChild(proc_inst_a);

            if(proc_inst.nodes && proc_inst.nodes.length != 0){
              var proc_inst_ul = document.createElement("ul");
              proc_inst_ul.classList.add("nested");
    
              // Looping through processes and inst
              proc_inst.nodes.map(inst => {
                var inst_li =  document.createElement("li");
                inst_li.classList.add("treeview-animated-items");
                var inst_a = document.createElement("a");
                inst_a.classList.add("closed");
                inst_a.onclick = () => {displayData(JSON.stringify(inst));}
                var inst_span = document.createElement("span");
                inst_span.innerHTML = inst.pi_tag;

                inst_a.appendChild(inst_span);
                inst_li.appendChild(inst_a);

                proc_inst_ul.appendChild(inst_li);
              });

              proc_inst_li.appendChild(proc_inst_ul);
            }

            head_inst_ul.appendChild(proc_inst_li);
          });

          head_inst_li.appendChild(head_inst_ul);
        }

        flare_ul.appendChild(head_inst_li);
      });

      flare_li.appendChild(flare_ul);
    }

    // Adding Flare
    tree_root.appendChild(flare_li);
  });
  refreshTree();
  
  console.log(tree_root);
}


function displayData(data){
    // Displays Data stored in Node
    // READ the NODE
    var databox = document.getElementById("data");
    while (databox.firstChild) {
        databox.removeChild(databox.firstChild);
    }
    data = JSON.parse(data);
    var h3 = document.createElement("h3");
    h3.innerHTML = "Properties:"
    databox.appendChild(h3);
    var parent_type = "";
    for(var key in data){
      if(key.includes("id") && key!== "id")
        parent_type = key;
      if(key !== 'nodes' && !key.includes("id")){
        var p = document.createElement("p");
        p.innerHTML = key+": "+ data[key];
        databox.appendChild(p);
      }
    }

    // Displaying CRUD Options:
    var map_parent_child = {
      plant_id: "flare",
      flare_id: "header",
      header_id: "process",
      parent_id: "instrument",
      instrument_id: "instrument_data",
    }
    
    
    var selected_type = map_parent_child[parent_type] || "plant";
    for(let i = 0; i< CRUDS.length; i++){
      if(CRUDS[i].type === selected_type){
        var funcs = CRUDS[i].funcs;
        for(let j = 0; j < funcs.length; j++){
          databox.appendChild(document.createElement("hr"));
          var h4 = document.createElement("h5");
          h4.innerHTML = funcs[j].topic;
          databox.appendChild(h4);
        
          // CREATE NODE
          let CRUD_TYPE = funcs[j].CRUD;
          if(CRUD_TYPE === "create"){
            var inputs = funcs[j].inputs;
            for(let k = 0; k< inputs.length; k++){
              var input = document.createElement("input");
              input.placeholder = inputs[k];
              input.id = selected_type+"_"+data.id+"_"+inputs[k]+"_"+CRUD_TYPE+"_"+funcs[j].createType;
              databox.appendChild(input);
            }
            
            var submit = document.createElement("button");
            submit.innerHTML = "CREATE";
            submit.onclick = () => {
              let new_data = {}
              for(let k = 0; k< inputs.length; k++){
                var input_id = selected_type+"_"+data.id+"_"+inputs[k]+"_"+CRUD_TYPE+"_"+funcs[j].createType;
                new_data[inputs[k]] = document.getElementById(input_id).value;
              }

              createNode(selected_type, data.id, new_data, funcs[j].createType)
            }
            databox.appendChild(submit);
          }

          // DELETE NODE
          else if(CRUD_TYPE === "delete"){
            var submit = document.createElement("button");
            submit.innerHTML = "DELETE";
            submit.onclick = () => {
              deleteNode(selected_type, data.id, data.parent_type);
            }
            databox.appendChild(submit);
          }

          else if(CRUD_TYPE === "update"){
            var inputs = funcs[j].inputs;
            for(let k = 0; k< inputs.length; k++){
              var input = document.createElement("input");
              input.placeholder = inputs[k];
              input.value = data[inputs[k]];
              input.id = selected_type+"_"+data.id+"_"+inputs[k]+"_"+CRUD_TYPE+"_"+funcs[j].createType;
              databox.appendChild(input);
            }
            
            var submit = document.createElement("button");
            submit.innerHTML = "UPDATE";
            submit.onclick = () => {
              let new_data = {}
              for(let k = 0; k< inputs.length; k++){
                var input_id = selected_type+"_"+data.id+"_"+inputs[k]+"_"+CRUD_TYPE+"_"+funcs[j].createType;
                new_data[inputs[k]] = document.getElementById(input_id).value;
              }
              updateNode(selected_type, data.id, new_data, data.parent_type);
            }
            databox.appendChild(submit);
          }

        }
      }
    }   
}

// Deletes Nodes From Tree
function deleteNode(type, remove, parent_type){
  var map_type_to_list = {
    flare: tree_flares,
    header: tree_headers,
    process: tree_processes,
    instrument: tree_instruments,
    instrument_data: tree_instrument_data
  }

  // Removing Node
  var list = map_type_to_list[type];
  for(let i = 0; i< list.length; i++){
    var list_item = list[i];
    if(remove === list_item.id && instrumentCheck(list_item.parent_type, parent_type)){
      list.splice(i, 1);
      i--;
    }
  }
  var get_parent_id_key = {
    flare: "flare_id",
    header: "header_id",
    instrument: "instrument_id",
  }

  if(type === "process" || type === "instrument_data"){
    buildTree();
    showTree();
    return;
  }

  var next_type = {
    flare: "header",
    header: "process",
    instrument: "instrument_data"
  }

  // Finding Children to Remove
  var next_type_id = get_parent_id_key[type];
  list = map_type_to_list[next_type[type]];
  parent_type = type;
  for(let i = 0; i< list.length; i++){
    var list_item = list[i];
    if(remove === list_item[next_type_id] && instrumentCheck(list_item.parent_type, parent_type)){
      deleteNode(next_type[type], list_item.id, parent_type);
      i--;
    }
  }
  if(type === "header" || type === "flare"){
    next_type_id = "parent_id"
    list = tree_instruments;
    parent_type = type;
    for(let i = 0; i< list.length; i++){
      var list_item = list[i];
      if(remove === list_item[next_type_id] && instrumentCheck(list_item.parent_type, parent_type)){
        deleteNode("instrument", list_item.id, parent_type);
        i--;
      }
    }
  }
  buildTree();
  showTree();
}

function instrumentCheck(parent1, parent2){
  if(parent2 === undefined) return true;
  if(parent1 === undefined) return true;
  if(parent1 === parent2) return true;
  return false;
}

// Adds Node To Tree
function createNode(parent_type, parent_id, data, create_type){
    console.log(parent_type);
    var get_parent_id_key = {
      plant: "plant_id",
      flare: "flare_id",
      header: "header_id",
      instrument_data: "instrument_id",
    }

    if(create_type === "instrument"){
      data["parent_id"] = parent_id;
      data["parent_type"] = parent_type;
      data["id"] = tree_instruments[tree_instruments.length-1].id+1;
      data["nodes"] = [];
      tree_instruments.push(data);
    } else {
      data[get_parent_id_key[parent_type]] = parent_id;
      if(create_type === "flare"){
        data["id"] = tree_flares[tree_flares.length-1].id+1;
        data["nodes"] = [];
        tree_flares.push(data);
      } else if (create_type === "header"){
        data["id"] = tree_headers[tree_headers.length-1].id+1;
        data["nodes"] = [];
        tree_headers.push(data);
      } else if (create_type === "process"){
        data["id"] = tree_processes[tree_processes.length-1].id+1;
        tree_processes.push(data);
      } else if (create_type === "instrument_data"){
        data["id"] = tree_instrument_data[tree_instrument_data.length-1].id+1;
        tree_instrument_data.push(data);
      }
    }
    buildTree();
    showTree();
}

// Update Node
function updateNode(type, id, data, parent_type){
  var map_type_to_list = {
    flare: tree_flares,
    header: tree_headers,
    process: tree_processes,
    instrument: tree_instruments,
    instrument_data: tree_instrument_data
  }
  var list = map_type_to_list[type];
  var map_type_to_parent = {
    flare: "plant_id",
    header: "flare_id",
    process: "header_id",
    instrument_data: "instrument_id",
    instrument: "parent_id"
  }
  var parent_id_key = map_type_to_parent[type];
  for(let i = 0; i< list.length; i++){
    if(list[i].id === id){
      data[parent_id_key] = list[i][parent_id_key];
      data["id"] = id;
      if(type === "instrument"){
        data["parent_type"] = parent_type;
      }
      list[i] = data;
      break;
    }
  }
  buildTree();
  showTree();
}

// CRUD for Each Type
const CRUDS = [
    {
        type: 'plant',
        funcs:[
            {
                CRUD: 'create',
                topic: 'Create Flare',
                createType: 'flare',
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
                createType: 'header',
                inputs: [
                    'name'
                ]
            },
            {
                CRUD: 'create',
                topic: 'Create Instrument',
                createType: 'instrument',
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
                createType: 'instrument',
                inputs: [
                    'name'
                ]
            },
            {
                CRUD: 'create',
                topic: 'Create Process',
                createType: 'process',
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
                createType: 'instrument data',
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
        type: 'instrument_data',
        funcs:[
            {
                CRUD: 'delete',
                topic: 'Delete PI Tag',
            },
            {
                CRUD: 'update',
                topic: 'Update PI Tag',
                inputs: [
                    'pi_tag'
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
