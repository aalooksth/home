var qrAPIlink = "https://quickchart.io/qr?size=200&text=";
// "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data="
var accounts = data;

var getone = function (wtype, key, apply = false) {
    var value = accounts[wtype][key];
    var button = document.createElement('button');
    button.innerHTML = key;
    button.classList = ["button"]
    button.onclick = function () {
        var qrData = value['qrdata'];
        document.getElementById("image").src = qrAPIlink + encodeURIComponent(JSON.stringify(qrData)); document.getElementById("text").innerHTML = '<b>' + key + '</b><br/>' + (wtype == "Bank Transfer" ? qrData["accountName"] + '<br/>' + qrData["accountNumber"] + '<br/>' : '');
        // alert(JSON.stringify(value)); return false; JSON.stringify(qrData)
    };
    if (apply == true) {
        var qrData = value['qrdata'];
        document.getElementById("image").src = qrAPIlink + encodeURIComponent(JSON.stringify(qrData));
        document.getElementById("text").innerHTML = '<b>' + key + '</b><br/>' + (wtype == "Bank Transfer" ? qrData["accountName"] + '<br/>' + qrData["accountNumber"] + '<br/>' : JSON.stringify(qrData));
    }
    return button;
};

getone('Bank Transfer', 'NIC Asia Bank (preferred)', true);

var foo = function () {
    for (const [wtype, wdata] of Object.entries(accounts)) {
        var wdiv = document.createElement('h2');
        wdiv.innerHTML = wtype;
        document.getElementById('foobutton').appendChild(wdiv);
        for (const [key, value] of Object.entries(wdata)) {
            var button = getone(wtype, key);
            document.getElementById('foobutton').appendChild(button);
            // document.body.appendChild(button);
        }
    }
};
foo()