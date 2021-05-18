
function getLandscape(){
    $.ajax(
        {
          type: "GET",
          url: 'http://127.0.0.1:5000/landscape/',
          success: function(data){
            console.log(data);
            console.log(typeof(data))
            // console.log('data:image/png;base64,' + data)
            // var img = $('<img id="image_id">');
            // img.attr('src', 'data:image/png;base64,' + data);
            // img.appendTo('#imghldr');
            // document.getElementById('theimg').src = 'data:image/png;base64,' + data
            data = btoa(unescape(encodeURIComponent(data)))
            // console.log(embed())
            document.getElementById('theimg').src = 'data:image/png;base64,' + data
          },
          error: function() {
            alert('There was some error performing the AJAX call!');
          }
        }
    )
}

function toBinary(string) {
    const codeUnits = new Uint16Array(string.length);
    for (let i = 0; i < codeUnits.length; i++) {
      codeUnits[i] = string.charCodeAt(i);
    }
    return String.fromCharCode(...new Uint8Array(codeUnits.buffer));
  }