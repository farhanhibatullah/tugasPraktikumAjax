var tampilanData = document.getElementById("tampilanData");
var tampilanDataPost = document.getElementById("tampilanDataPost");

function AjaxGET() {
    var data_file = "api.php/mahasiswa?t=" + Math.random();
    var http_request = new XMLHttpRequest();
    try {
        http_request = new XMLHttpRequest();
    } catch (e) {
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert("Browser rusak!");
                return false;
            }
        }
    }

    http_request.onreadystatechange = function() {
        if (http_request.readyState == 4) {
            var jsonObj = JSON.parse(http_request.responseText);
            tampilkanData(jsonObj);
        }
    }
    http_request.open("GET", data_file, true);
    http_request.send();

    function createNode(element){
        return document.createElement(element);
    }

    function append(parent, el){
        return parent.appendChild(el);
    }

    function tampilkanData(dataRAW) {
        tampilanData.innerHTML = "Status: " + dataRAW.status;
        let table = createNode('table'),
        thead = createNode('thead'),
        th1 = createNode('th'),
        th2 = createNode('th'),
        thEdit = createNode('th'),
        thDelete = createNode('th');

        th1.innerHTML = 'Nama';
        th2.innerHTML = 'NPM';
        thEdit.innerHTML = 'Aksi1';
        thDelete.innerHTML = 'Aksi2';

        append(thead, th1);
        append(thead, th2);
        append(thead, thEdit);
        append(thead, thDelete);
        append(table, thead);

        for (let i = 0; i < dataRAW.data.length; i++) {
            let row = createNode('tr'),
            td1 = createNode('td'),
            td2 = createNode('td'),
            tdEdit = createNode('td'),
            tdDelete = createNode('td'),
            editBtn = createNode('button'),
            deleteBtn = createNode('button');

            td1.innerHTML = dataRAW.data[i].nama;
            td2.innerHTML = dataRAW.data[i].npm;
            editBtn.innerHTML = 'Edit';
            deleteBtn.innerHTML = 'Delete';
            
            editBtn.onclick = function () {
                editData(dataRAW.data[i].id, dataRAW.data[i].nama,  dataRAW.data[i].npm);                
            }

            deleteBtn.onclick = function () {
                deleteData(dataRAW.data[i].id);
            }

            append(tdEdit, editBtn);
            append(tdDelete, deleteBtn);
            append(row, td1);
            append(row, td2);
            append(row, tdEdit);
            append(row, tdDelete);
            append(table, row);
        }

        append(tampilanData, table);
    }
}

document.getElementById("btnAmbilData").addEventListener("click", AjaxGET);

function AjaxPOST() {
    var nama = document.getElementById("nama").value;
    var npm = document.getElementById("npm").value; 
    var data_file = "api.php/mahasiswa"; 
    var params = "nama=" + nama + "&npm=" + npm;
    var http_request = new XMLHttpRequest();
    try {
        http_request = new XMLHttpRequest();
    } catch (e) {
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert("Browser rusak!");
                return false;
            }
        }
    }
    http_request.onreadystatechange = function () {
        if (http_request.readyState == 4) {
            var jsonObj = JSON.parse(http_request.responseText);
            tampilkanDataPost(jsonObj);
        }
    }
    http_request.open("POST", data_file, true);
    http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http_request.send(params);

    function tampilkanDataPost(dataRAW) {
        tampilanDataPost.innerHTML = "Status: " + dataRAW.status + "<br/>";
        tampilanDataPost.innerHTML += "ID baru: " + dataRAW.data.id + "<br/>";
        tampilanDataPost.innerHTML += "Nama: " + dataRAW.data.nama + "<br/>";
        tampilanDataPost.innerHTML += "NPM: " + dataRAW.data.npm + "<br/>";
    }
}

document.getElementById("btnKirimData").addEventListener("click", AjaxPOST);

function editData(id, nama, npm) {
    var tampilEdit = document.getElementById("editData");
    let inputNama = document.createElement("input"),
    inputNPM = document.createElement("input"),
    submit = document.createElement("button");

    inputNama.setAttribute("type", "text");
    inputNama.setAttribute("id", "nama");
    inputNama.setAttribute("placeholder", "ganti nama disini");
    inputNama.setAttribute("value", nama);
    
    inputNPM.setAttribute("type", "text");
    inputNPM.setAttribute("id", "npm");
    inputNPM.setAttribute("placeholder", "ganti npm disini");
    inputNPM.setAttribute("value", npm)
    
    submit.innerHTML = "Submit"
    submit.onclick = function(){
        var nama = document.getElementById("nama").value;
        var npm = document.getElementById("npm").value;
        var data_file = "api.php/mahasiswa/" + id;
        var http_request = new XMLHttpRequest();
        try {
            http_request = new XMLHttpRequest();
        } catch (e) {
            try {
                http_request = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    http_request = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                    alert("Browser rusak!");
                    return false;
                }
            }
        }
        http_request.onreadystatechange = function () {
            if (http_request.readyState == 4) {
                var jsonObj = JSON.parse(http_request.responseText);
                tampilkanDataPut(jsonObj);
            }
        }
        
        http_request.open("PUT", data_file, true);
        http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http_request.send("id=" + id + "&nama=" + nama + "&npm=" + npm);

        function tampilkanDataPut(dataRAW) {
            tampilEdit.innerHTML = "Status: " + dataRAW.status + "<br/>";
            tampilEdit.innerHTML += "ID yang diubah: " + dataRAW.data.id + "<br/>";
            tampilEdit.innerHTML += "Nama baru: " + dataRAW.data.nama + "<br/>";
            tampilEdit.innerHTML += "NPM baru: " + dataRAW.data.npm + "<br/>";
        }
    }

    tampilEdit.appendChild(inputNama);
    tampilEdit.appendChild(inputNPM);
    tampilEdit.appendChild(submit);
}

function deleteData(id) {
    var data_file = "api.php/mahasiswa/" + id;
    var http_request = new XMLHttpRequest();
    try {
        http_request = new XMLHttpRequest();
    } catch (e) {
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert("Browser rusak!");
                return false;
            }
        }
    }
    http_request.onreadystatechange = function () {
        if (http_request.readyState == 4) {
            var jsonObj = JSON.parse(http_request.responseText);
            tampilkanDataDelete(jsonObj);
        }
    }
    http_request.open("DELETE", data_file, true);
    http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http_request.send();

    function tampilkanDataDelete(dataRAW) {
        tampilanData.innerHTML = "Status: " + dataRAW.status + "<br/>";
        tampilanData.innerHTML += "ID yang dihapus: " + dataRAW.data.id + "<br/>";
        tampilanData.innerHTML += "Nama: " + dataRAW.data.nama + "<br/>";
        tampilanData.innerHTML += "NPM: " + dataRAW.data.npm + "<br/>";
    }
}