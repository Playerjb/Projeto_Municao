//HTML para inserção automática no DOM
let col = "<td id='troca' class='col-md-2 col-xs-12'>   <div id='group' class='input-group'>\n       <button name='sub' id='sub' class='btn btn-secondary'>-</button>\n       <input id='txt' type='text' class='form-control' value='0'>\n       <button name='add' id='add' class='btn btn-secondary'>+</button>\n   </div>\n</td>";

let colName = "<th scope='row' id='nome' colspan='2' class='col-md-2 col-xs-12'></th>";

//Pegar elementos do DOM
//let tbod = document.getElementById("tBody").getElementsByTagName("tr")
//console.log(tbod.length)

function inserir(){
    let tbody = document.getElementById("tBody")
    let quant = tbody.getElementsByTagName("tr").length
    let name = document.getElementById("name").value
    let tr = document.createElement("tr")
    tr.id = "t"+name
    tr.innerHTML = colName
    for(let i = 0;i < 8; i++){
        tr.innerHTML += col
    }
    if(quant == 0){
        tbody.appendChild(tr)
    }else{
        //tbody.getElementsByTagName("tr")[0].insertBefore(tr,tbody.nextSibling)
        tbody.getElementsByTagName("tr")[quant-1].after(tr)
    }
    document.getElementById("troca").setAttribute("id","c22")
    document.getElementById("sub").setAttribute("id","b22")
    document.getElementById("txt").setAttribute("id","t22")
    document.getElementById("add").setAttribute("id","b22")

    document.getElementById("troca").setAttribute("id","c40")
    document.getElementById("sub").setAttribute("id","b40")
    document.getElementById("txt").setAttribute("id","t40")
    document.getElementById("add").setAttribute("id","b40")

    document.getElementById("troca").setAttribute("id","c556")
    document.getElementById("sub").setAttribute("id","b556")
    document.getElementById("txt").setAttribute("id","t556")
    document.getElementById("add").setAttribute("id","b556")

    document.getElementById("troca").setAttribute("id","c12")
    document.getElementById("sub").setAttribute("id","b12")
    document.getElementById("txt").setAttribute("id","t12")
    document.getElementById("add").setAttribute("id","b12")

    document.getElementById("nome").setAttribute("id",name)
    document.getElementById(name).innerHTML = name

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
    for(let i = 0; i < 8;i++){
        soma += parseInt(pai.querySelector("#"+ids[i][2]).value) * vlr[i]
    }
    tot.value = soma
    soma = 0
}

/*<tr>
                        <th scope="row" id="nome" colspan="2" class="col-md-2 col-xs-12">Jair Batista</th>
                        <td id="c22" class="col-md-2 col-xs-12">
                            <div id="group" class="input-group">
                                <button class="btn btn-secondary">-</button>
                                <input type="text" class="form-control">
                                <button class="btn btn-secondary">+</button>
                            </div>
                        </td>
                        <td id="c40" class="col-md-2 col-xs-12">
                            <div id="group" class="input-group">
                                <button class="btn btn-secondary">-</button>
                                <input type="text" class="form-control">
                                <button class="btn btn-secondary">+</button>
                            </div>
                        </td>
                        <td id="c556" class="col-md-2 col-xs-12">
                            <div id="group" class="input-group">
                                <button class="btn btn-secondary">-</button>
                                <input type="text" class="form-control">
                                <button class="btn btn-secondary">+</button>
                            </div>
                        </td>
                        <td id="c12" class="col-md-2 col-xs-12">
                            <div id="group" class="input-group">
                                <button class="btn btn-secondary">-</button>
                                <input type="text" class="form-control">
                                <button class="btn btn-secondary">+</button>
                            </div>
                        </td>
                    </tr>*/
