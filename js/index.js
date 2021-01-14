import data from "./data.js";

var Lbody = document.getElementById("Loaded");
var Ctable = document.getElementById("workers_table");
var Cbutton = document.getElementsByClassName("item");
var Price_t = document.getElementById("TotalPrice");
var Tprod = document.getElementById("tableProd");
var Tbody = document.getElementById("Tbody");
var Trow = document.getElementById("Trow");

var ElementConcat = "<tbody><tr>";

var precioTotal = 0;
var SelectProductos = [];


function AgregarProdTable(pos) {
    //var p = SelectProductos[pos];
    SelectProductos[pos].push(data[pos].Titulo)
    Trow.innerHTML += `<td>${SelectProductos[pos]} : ${SelectProductos[pos].length}</td>`;
}

function vaciasPro() {
    precioTotal = 0;
    //Price_t.style.display = 'none';
    for (var i = 0; i < SelectProductos.length; i++) {
        var len = SelectProductos[i].length;
        for (let j = 0; j < len; j++) {
            SelectProductos[i].pop();
            Trow.innerHTML = null;
        }
    }
    Price_t.innerHTML = `<p>SE VACIO EL CARRITO!!!`;
    console.log(SelectProductos);
    //console.log(SelectProductos)
}

function AgregarProd(pos) {
    precioTotal+=data[pos].Precio;
    Price_t.style.display = 'flex';
    Price_t.innerHTML = `<p>Precio Total: ${precioTotal} </p><button id='resetPrice'>Vaciar Carrito</button>`;
    var rPr = document.getElementById("resetPrice");
    rPr.addEventListener('click',vaciasPro);
}
function CargarProductos(cantidad,estruct) {
    if(cantidad == 0)
    {
        console.log("No se estructura nada!!");
        estruct+="<td>ERROR:NO SE ENCONTRARON ELEMENTOS EN LA BASE DE DATOS!</td></tr></table>";
        Ctable.innerHTML = estruct;
    }else{
        for (var i = 0; i < cantidad; i++) {
            SelectProductos.push([]);
            estruct += `<td><div id='mainbox'><div class='card'><img class='profile_pic' src=${data[i].Url} alt=${data[i].Titulo} title=${data[i].Titulo}> <p><strong>Precio:</strong>${data[i].Precio}        </p><br><p><strong>Descripcion:</strong>${data[i].Descripcion}</p><br><button class='item'>Agregar</button></div></div></td>`;
        }
        Ctable.innerHTML = estruct + "</tr></tbody></table>";
    }

    for (var i = 0; i < Cbutton.length; i++){
        var currD;
        (function (_i) {
            Cbutton[_i].addEventListener('click', function(){
              currD = _i;
               AgregarProd(_i);
               AgregarProdTable(_i);
               console.log(precioTotal);
            });
        })(i);
    
    }
}
Lbody.addEventListener('load',CargarProductos(data.length,ElementConcat));
// resetPric.addEventListener('click',resetPrices(precioTotal))