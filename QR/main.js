var qrAPIlink = "https://quickchart.io/qr?size=200&text=";
// "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data="
var accounts = data;

var getone = function (QRtype, key, apply = false) {
    var value = accounts[QRtype][key];
    var button = document.createElement('button');
    button.innerHTML = key;
    button.classList = ["button"]
    button.onclick = function () {
        var qrData = value['qrdata'];
        document.getElementById("image").src = qrAPIlink + encodeURIComponent((QRtype == "Bank Transfer" ? JSON.stringify(qrData) : qrData));
        document.getElementById("text").innerHTML = '<b>' + key + '</b><br/>' + (QRtype == "Bank Transfer" ? qrData["accountName"] + '<br/>' + qrData["accountNumber"] + '<br/>' : '');
        // alert(JSON.stringify(value)); return false; JSON.stringify(qrData)
    };
    if (apply == true) {
        var qrData = value['qrdata'];
        document.getElementById("image").src = qrAPIlink + encodeURIComponent(JSON.stringify(qrData));
        document.getElementById("text").innerHTML = '<b>' + key + '</b><br/>' + (QRtype == "Bank Transfer" ? qrData["accountName"] + '<br/>' + qrData["accountNumber"] + '<br/>' : JSON.stringify(qrData));
    }
    return button;
};

getone('Bank Transfer', 'NIC Asia Bank (preferred)', true);

var foo = function () {
    for (const [QRtype, QRdata] of Object.entries(accounts)) {
        var wdiv = document.createElement('h2');
        wdiv.innerHTML = QRtype;
        document.getElementById('foobutton').appendChild(wdiv);
        for (const [key, value] of Object.entries(QRdata)) {
            var button = getone(QRtype, key);
            document.getElementById('foobutton').appendChild(button);
            // document.body.appendChild(button);
        }
    }
};
foo()