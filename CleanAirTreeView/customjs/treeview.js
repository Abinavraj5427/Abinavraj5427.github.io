var tree = [];

// Building Tree
$(document).ready(
    function(){

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
  var plant_id = 1; //testing value

  // Adding Flares
  flares.map(flare => {
    if(flare.plant_id == plant_id){
      flare["nodes"] = [];

      // Adding Headers
      headers.map(header => {
        if(header.flare_id == flare.id){
          header["nodes"] = [];

          // Adding Processes
          processes.map(process => {
            if(process.header_id == header.id){
              header["nodes"].push(process);
            }
          });

          // Adding Instruments to Header
          instruments.map(instrument => {
            if(instrument.parent_type === 'header' && instrument.parent_id == header.id){
              instrument["nodes"] = [];

              //Adding Instrument Data
              instrument_data.map(data => {
                if(data.instrument_id == instrument.id){
                  instrument["nodes"].push(data);
                }
              });
              
              header["nodes"].push(instrument);
            }
          });
          flare["nodes"].push(header);
        }

        // Adding Instruments to Flare
        instruments.map(instrument => {
          if(instrument.parent_type === 'flare' && instrument.parent_id == header.id){
            instrument["nodes"] = [];

            //Adding Instrument Data
            instrument_data.map(data => {
              if(data.instrument_id == instrument.id){
                instrument["nodes"].push(data);
              }
            });
            
            flare["nodes"].push(instrument);
          }
        });
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
    // console.log(data)
    var databox = document.getElementById("data");
    while (databox.firstChild) {
        databox.removeChild(databox.firstChild);
    }
    data = JSON.parse(data);
    var h3 = document.createElement("h3");
    h3.innerHTML = "Properties:"
    databox.appendChild(h3);
    for(var key in data){
      if(key !== 'nodes' && !key.includes("id")){
        var p = document.createElement("p");
        p.innerHTML = key+": "+ data[key];
        databox.appendChild(p);
      }
    }
    
}

// // Opens the Sidebar
// function openSideBar(type, data){
//     addSideBarElements(type, data, -1);

//     document.getElementById("sidebar").style.width = "400px";
//     document.getElementById("main").style.marginRight = "400px";
// }

// // Closes the Sidebar
// function closeSideBar(){
//     document.getElementById("sidebar").style.width = "0";
//     document.getElementById("main").style.marginRight = "0";
// }

// // Adds Sidebar Elements
// function addSideBarElements(type, data, select){

//     console.log(data);
//     // Clear Sidebar
//     var bar= document.getElementById("sidebar_options");
//     while (bar.firstChild) {
//         bar.removeChild(bar.firstChild);
//     }
    
//     // Searching for Selection
//     for(let i = 0; i< CRUDS.length; i++){

//         if(CRUDS[i].type === type){

//             // Adding Sidebar Links
//             for(let j = 0; j< CRUDS[i].funcs.length; j++){
//                 var a = document.createElement("a");
//                 a.innerHTML = CRUDS[i].funcs[j].topic;
//                 a.href = "javascript:void(0)";
//                 a.onclick = (event) => {addSideBarElements(type, data, j); }
//                 bar.appendChild(a);

                
//                 if(j===select || (select === -1 && j == CRUDS[i].funcs.length-1)){
//                     var total_inputs = CRUDS[i].funcs[j].inputs? CRUDS[i].funcs[j].inputs.length: 0;

//                     // Adding Inputs
//                     for(let k = 0; k < total_inputs; k++){
//                         var label = document.createElement('label');
//                         label.innerHTML = CRUDS[i].funcs[j].inputs[k];

//                         var input = document.createElement('input');
//                         input.type = 'text';
//                         input.id = CRUDS[i].funcs[j].inputs[k];
//                         input.placeholder = 'blank';
//                         if(CRUDS[i].funcs[j].CRUD === "update"){
//                             // console.log(data);
//                             input.value = data[CRUDS[i].funcs[j].inputs[k]];
//                         }

//                         var br = document.createElement("br");
//                         bar.appendChild(label);
//                         bar.appendChild(br);
//                         bar.appendChild(input);
                       
//                     }

//                     var br2 = document.createElement("br");
//                     var submit = document.createElement("button");
//                     if(CRUDS[i].funcs[j].CRUD === "update"){
//                         submit.innerHTML = "UPDATE";
//                         submit.onclick = () => {updateNode(data.loc)}
//                     } 
//                     else if (CRUDS[i].funcs[j].CRUD === "create"){
//                         submit.innerHTML = "CREATE";
//                         submit.onclick = () => {createNode(data ? data.loc: "", CRUDS[i].funcs[j].createType, CRUDS[i].funcs[j].inputs)}
//                     }
//                     else if (CRUDS[i].funcs[j].CRUD === "delete"){
//                         submit.innerHTML = "DELETE";
//                         submit.onclick = () => {deleteNode(data.loc)}
//                     }
//                     bar.appendChild(br2);
//                     bar.appendChild(submit);
//                 }
//             }
//             break;
//         }
//     }
// }




// // Deletes Nodes From Tree
// function deleteNode(loc){
//     loclist = loc.split('.');
//     if(loclist.length == 1){
//         tree.splice(loclist[0],1);
//     } else if (loclist.length == 2){
//         tree[loclist[0]].nodes.splice(loclist[1], 1);
//     } else if (loclist.length == 3){
//         tree[loclist[0]].nodes[loclist[1]].nodes.splice(loclist[2], 1);
//     } else if (loclist.length == 4) {
//         tree[loclist[0]].nodes[loclist[1]].nodes[loclist[2]].nodes.splice(loclist[3], 1);
//     }
//     refreshTree();
//     closeSideBar();
// }

// // Adds Node To Tree
// function createNode(loc, type, inputs){
//     var loclist = loc.split('.');
//     console.log(loclist);
//     var newnode = { type: type };

//     for(let i = 0; i< inputs.length;i++){
//         newnode[inputs[i]] = document.getElementById(inputs[i]).value;
//     }    
//     newnode["text"] = newnode["name"];
   

//     if(loclist.length == 0){
//         newnode['loc'] = loc+tree.length;
//         tree.push(newnode);
//     } else if (loclist.length == 2){
        
//     } else if (loclist.length == 3){
        
//     } else if (loclist.length == 4) {
        
//     }
//     console.log(newnode);
//     refreshTree();
//     closeSideBar();
// }

// // CRUD for Each Type
// const CRUDS = [
//     {
//         type: 'plant',
//         funcs:[
//             {
//                 CRUD: 'create',
//                 topic: 'Create Flare',
//                 createType: 'flare',
//                 inputs: [
//                     'name'
//                 ]
//             }
//         ]
//     },
//     {
//         type: 'flare',
//         funcs:[
//             {
//                 CRUD: 'create',
//                 topic: 'Create Header',
//                 createType: 'header',
//                 inputs: [
//                     'name'
//                 ]
//             },
//             {
//                 CRUD: 'create',
//                 topic: 'Create Instrument',
//                 createType: 'instrument',
//                 inputs: [
//                     'name'
//                 ]
//             },
//             {
//                 CRUD: 'delete',
//                 topic: 'Delete Flare',
//             },
//             {
//                 CRUD: 'update',
//                 topic: 'Update Flare',
//                 inputs: [
//                     'name'
//                 ]
//             }
//         ]
//     },
//     {
//         type: 'header',
//         funcs:[
//             {
//                 CRUD: 'create',
//                 topic: 'Create Instrument',
//                 createType: 'instrument',
//                 inputs: [
//                     'name'
//                 ]
//             },
//             {
//                 CRUD: 'create',
//                 topic: 'Create Process',
//                 createType: 'process',
//                 inputs: [
//                     'name'
//                 ]
//             },
//             {
//                 CRUD: 'delete',
//                 topic: 'Delete Header',
//             },
//             {
//                 CRUD: 'update',
//                 topic: 'Update Header',
//                 inputs: [
//                     'name'
//                 ]
//             }
//         ]
//     },
//     {
//         type: 'instrument',
//         funcs:[
//             {
//                 CRUD: 'create',
//                 topic: 'Create Instrument Data',
//                 createType: 'instrument data',
//                 inputs: [
//                     'PI tag'
//                 ]
//             },
//             {
//                 CRUD: 'delete',
//                 topic: 'Delete Instrument',
//             },
//             {
//                 CRUD: 'update',
//                 topic: 'Update Instrument',
//                 inputs: [
//                     'name'
//                 ]
//             }
//         ]
//     },
//     {
//         type: 'instrument data',
//         funcs:[
//             {
//                 CRUD: 'delete',
//                 topic: 'Delete PI Tag',
//             },
//             {
//                 CRUD: 'update',
//                 topic: 'Update PI Tag',
//                 inputs: [
//                     'PI Tag'
//                 ]
//             }
//         ]
//     },
//     {
//         type: 'process',
//         funcs:[
//             {
//                 CRUD: 'delete',
//                 topic: 'Delete Process',
//             },
//             {
//                 CRUD: 'update',
//                 topic: 'Update Process',
//                 inputs: [
//                     'name'
//                 ]
//             }
//         ]
//     },
// ];
