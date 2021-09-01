//HTML para inserção automática no DOM
let col = "<td id='troca' class=''>   <div id='group' class='input-group'>\n       <button name='sub' id='sub' class='btn btn-secondary'>-</button>\n       <input id='txt' type='text' class='form-control' value='0'>\n       <button name='add' id='add' class='btn btn-secondary'>+</button>\n   </div>\n</td>";

let colName = "<th scope='row' id='nome' colspan='2' class='col-md-2 col-xs-12'></th>";

let ids = [["c22","b22","t22","b22"],["c40","b40","t40","b40"],["c556","b556","t556","b556"],["c12","b12","t12","b12"],["c9","b9","t9","b9"],["c380","b380","t380","b380"],["c38","b38","t38","b38"],["c357","b357","t357","b357"]]

let pts = [["c2","b2","t2","b2"],["c3","b3","t3","b3"],["c4","b4","t4","b4"],["c5","b5","t5","b5"]]

let vlr = [1,6,10,6,5,4,5,7]
//Pegar elementos do DOM
//let tbod = document.getElementById("tBody").getElementsByTagName("tr")
//console.log(tbod.length)

function inserir(){
    let name = document.getElementById("name").value
    inserirShots(name)
    inserirHits(name)
}

function inserirShots(name){
    let tbody = document.getElementById("tBody")
    let quant = tbody.getElementsByTagName("tr").length
    
    let tr = document.createElement("tr")
    tr.id = "ts"+name
    tr.innerHTML = colName
    for(let i = 0;i < 8; i++){
        tr.innerHTML += col
    }

    tr.innerHTML += "<td id='total' class=''> <input type='text' id='tot' class='form-control w-100' value='0'> </td>"

    if(quant == 0){
        tbody.appendChild(tr)
    }else{
        //tbody.getElementsByTagName("tr")[0].insertBefore(tr,tbody.nextSibling)
        tbody.getElementsByTagName("tr")[quant-1].after(tr)
    }

    for(let i = 0; i < 8;i++){
        document.getElementById("troca").setAttribute("id",ids[i][0])
        document.getElementById("sub").setAttribute("id",ids[i][1])
        document.getElementById("txt").setAttribute("id",ids[i][2])
        document.getElementById("add").setAttribute("id",ids[i][3])
    }

    document.getElementById("tot").setAttribute("id","tots"+name)

    document.getElementById("nome").setAttribute("id",name)
    document.getElementById(name).innerHTML = name

    let btn = document.getElementsByTagName("button")
    for(let i = 1;i<btn.length;i++){
        btn[i].addEventListener("click", button)
    }
}

function inserirHits(name){
    let tbody = document.getElementById("tBodyHits")
    let quant = tbody.getElementsByTagName("tr").length
    let tr = document.createElement("tr")
    tr.id = "th"+name
    tr.innerHTML = colName
    for(let i = 0;i < 4; i++){
        tr.innerHTML += col
    }

    tr.innerHTML += "<td id='totalHits' class=''> <input type='text' id='tot' class='form-control w-100' value='0'> </td>"

    if(quant == 0){
        tbody.appendChild(tr)
    }else{
        //tbody.getElementsByTagName("tr")[0].insertBefore(tr,tbody.nextSibling)
        tbody.getElementsByTagName("tr")[quant-1].after(tr)
    }

    for(let i = 0; i < 4;i++){
        document.getElementById("troca").setAttribute("id",pts[i][0])
        document.getElementById("sub").setAttribute("id",pts[i][1])
        document.getElementById("txt").setAttribute("id",pts[i][2])
        document.getElementById("add").setAttribute("id",pts[i][3])
    }

    document.getElementById("tot").setAttribute("id","toth"+name)

    document.getElementById("nome").setAttribute("id","h"+name)
    document.getElementById("h"+name).innerHTML = name

    let btn = document.getElementsByTagName("button")
    for(let i = 1;i<btn.length;i++){
        btn[i].addEventListener("click", button)
    }
}

//Botões de + e -

let btn = document.getElementsByTagName("button")
for(let i = 1;i<btn.length;i++){
    btn[i].addEventListener("click", button)
}

function button(e){
    let name = e.target.name
    let ident = String(e.target.id)
    let idPai = String(e.target.parentNode.parentNode.parentNode.id)
    console.log(idPai)
    let pai = document.getElementById(idPai)
    ident = ident.replace('b','t')
    let txt = pai.querySelector("#"+ident)
    let tot = pai.querySelector("#to"+idPai)
    if(name == "sub"){
        sub(txt)
    }else{
        add(txt)
    }
    atualiza(tot, pai)
}

function sub(txt){
    txt.value = parseInt(txt.value) - 1
}

function add(txt){    
    txt.value = parseInt(txt.value) + 1  
}

function atualiza(tot, pai){
    var soma = 0
    if(pai.id.substring(2,0) == "ts"){
        for(let i = 0; i < 8;i++){
            soma += parseInt(pai.querySelector("#"+ids[i][2]).value) * vlr[i]
        }
    }else{
        for(let i = 0; i < 4;i++){
            soma += parseInt(pai.querySelector("#"+pts[i][2]).value) * parseInt(pts[i][2].substring(1))
        }
    }
    console.log(soma)
    console.log(tot)
    tot.value = soma
    soma = 0
}

function escreverArquivo() {  
    let arq  = new ActiveXObject("Scripting.FileSystemObject");
    let txt = arq.CreateTextFile("Tiro Porrada e Bomba.txt", true); 
    txt.WriteLine("Coloque todo o conteudo que voce deseja nesse trecho...");
    txt.Close(); 
    
}

//Salvar informações
function save(){
    let tbody = document.getElementById("tBody")
    let tbodyhits = document.getElementById("tBodyHits")
    let quant = tbody.getElementsByTagName("tr").length
    let texto = "Shots\t\n Nome \t .22 \t .40 \t .556 \t .12 \t .9 \t .380 \t .38 \t .357 \t Total \n"
    let tr

    for(let i = 0; i< quant; i++){
        tr = tbody.getElementsByTagName("tr")[i]
        texto += tr.querySelector("th").innerHTML + " \t  "
        console.log(tr.querySelectorAll("input"))
        for(let j = 0; j < 8; j++){
            texto += tr.querySelector("#"+ids[j][2]).value + " \t "
        }
        texto += tr.querySelectorAll("input")[8].value+"\n"
    }

    texto += "\nHits\t\n Nome \t 2pts \t 3pts \t 4pts \t 5pts \t Total \n"

    for(let i = 0; i< quant; i++){
        tr = tbodyhits.getElementsByTagName("tr")[i]
        texto += tr.querySelector("th").innerHTML + " \t  "
        console.log(tr.querySelectorAll("input"))
        for(let j = 0; j < 4; j++){
            texto += tr.querySelector("#"+pts[j][2]).value + " \t "
        }
        texto += tr.querySelectorAll("input")[4].value+"\n"
    }

    //let txt = new Blob([texto], { type: "text/plain;charset=utf-8" });
    //saveAs(txt, "Tiro Porrada e Bomba.txt");

    let txt = new Blob([texto], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset = UTF-8" });
    saveAs(txt, "Tiro Porrada e Bomba.xls");
}

