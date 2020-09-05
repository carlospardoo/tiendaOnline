$( document ).ready(function() {

  $.get( '/ciudades/listar', {} )
    .done(function( data ) {
      if (data.exe.hasOwnProperty('errorNum')){
        console.error(data);
      }else{
        for(let i=0; i<data.exe.objects.length; i++){
          $('#listaciudades').append("<option value='"+data.exe.objects[i].id+"'>"+data.exe.objects[i].nombre+"</option>");
        }
        console.log(data);
      }
    }).fail(function() {
      console.error( "error" );
    });

  $.get( '/categorias/listar', {} )
    .done(function( data ) {
      if (data.exe.hasOwnProperty('errorNum')){
        console.error(data);
      }else{
        for(let i=0; i<data.exe.objects.length; i++){
          let ctg = $("<li class='dropdown dropdown-submenu'></li>");
          ctg.append("<a classname='dropdown-toggle' href='#' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false')>"+data.exe.objects[i].nombre+"</a>");
          if(data.exe.objects[i].categorias){
            $('#listacategorias').append("<option value='"+data.exe.objects[i].id+"'>&nbsp;"+data.exe.objects[i].nombre+"</option>")
            for(let j=0; j<data.exe.objects[i].categorias.length; j++){
              $('#listacategorias').append("<option value='"+data.exe.objects[i].categorias[j].id+"'>&nbsp;&nbsp;"+data.exe.objects[i].categorias[j].nombre+"</option>")
            }
          }
        }
        console.log(data);
      }
    }).fail(function() {
      console.error( "error" );
    });

    $('#listaciudades').on('change', function (){
      $.get( '/catalogo/listarProductosCiudad', {idciudad: $('#listaciudades').val()} )
        .done(function( data ) {
          if (data.exe.hasOwnProperty('errorNum')){
            console.error(data);
          }else{
            listarProductos(data.exe.objects);
            console.log(data);
          }
        }).fail(function() {
          console.error( "error" );
        });
    });

    $('#buscar').on('click', function (){
      event.preventDefault();
      $.get( '/catalogo/listarProductosCriterios', $('#formbusqueda').serialize() )
        .done(function( data ) {
          if (data.exe.hasOwnProperty('errorNum')){
            console.error(data);
          }else{
            listarProductos(data.exe.objects);
            console.log(data);
          }
        }).fail(function() {
          console.error( "error" );
        });
    });

    function listarProductos(productos){
      $('#items').empty();
      for(let i=0; i<productos.length; i++){

        let card = $('<div class="card col-4" style="background-color: rgb(252, 227, 0);"></div>');
        card.append('<img class="card-img-top mt-2" style="width:250px; height: 250px" src="'+productos[i].imagen+'">');
        card.append('<div class="card-body"></div>');
        card.find('.card-body').append('<h5 class="card-title">'+productos[i].nombre+'</h5>');
        card.find('.card-body').append('<p class="card-info">$'+productos[i].precio+'</p>');
        card.find('.card-body').append('<form class="form ml-4"></form>');
        card.find('.card-body').find('form').append('<div class="form-group mb-2"></div>')
        card.find('.card-body').find('form').find('div').append('<input type="hidden" name="producto" value="'+productos[i].id+'">');
        card.find('.card-body').find('form').find('div').append('<input type="hidden" name="precio" value="'+productos[i].precio+'">')
        card.find('.card-body').find('form').find('div').append('<button class="btn btn-secondary btn-sm ml-3 restarCantidad"> - </button>');
        card.find('.card-body').find('form').find('div').append('<input type="text" name="cantidad" class="border border-dark ml-4 prodCantidad" style="width: 25px;" value="0">');
        card.find('.card-body').find('form').find('div').append('<button class="btn btn-secondary btn-sm ml-4 sumarCantidad"> + </button>');
        card.find('.card-body').find('form').find('div').append('<button class="btn btn-dark mt-1 ml-4 rounded d-block mb-3 agregarProd">Agregar</button>');
        card.find('.card-body').find('.sumarCantidad').on('click', function(){
          event.preventDefault();
          $(this).parent().find('.prodCantidad').val(parseInt($(this).parent().find('.prodCantidad').val())+1);
        });
        card.find('.card-body').find('.restarCantidad').on('click', function(){
          event.preventDefault();
          $(this).parent().find('.prodCantidad').val(parseInt($(this).parent().find('.prodCantidad').val())-1);
        });
        card.find('.agregarProd').on("click", function(){
          event.preventDefault();
          $.post( '/pedidocliente/agregarproducto', $(this).parent().parent().serialize() )
            .done(function( data ) {
              console.log(data);
              if (data.exe.hasOwnProperty('errorNum')){
                console.error(data);
                alert("Para agregar productos por favor registrese o inicie sesión");
              }else{
                cargarCarrito(data.exe.objects.pedido);
                console.log(data);
              }
            }).fail(function() {
              console.error( "error" );
            });
        });
        $('#items').append(card);
      }
    }

    $.get( '/pedidocliente/cargarpedido', {} )
    .done(function( data ) {
      if (data.exe.hasOwnProperty('errorNum')){
        console.error(data);
      }else{
        if (data.exe.hasOwnProperty('objects')){
          cargarCarrito(data.exe.objects.pedido)
        }
        console.log(data);
      }
    }).fail(function() {
      console.error( "error" );
    });

    $('#crearpedido').on("click", function(){

      $.get( '/pedidocliente/crearpedido', {} )
        .done(function( data ) {
          if (data.exe.hasOwnProperty('errorNum')){
            console.error(data);
          }else{
            if (data.exe.hasOwnProperty('objects')){
              cargarCarrito(data.exe.objects.pedido)
            }
            console.log(data);
          }
        }).fail(function() {
          console.error( "error" );
        });

    });

    function cargarCarrito(pedido){

      $('#carrito').empty();
        for(let i=0; i<pedido.productos.length; i++){
          let producto = pedido.productos[i];
          let tarjeta = $('<li class="list-group-item text-right mx-2"></li>');
          tarjeta.append('<p>' + producto.nombre + ' x' + producto.cantidad + ' - $' + producto.precio + '</p>');
          tarjeta.append('<p>total: ' + (producto.cantidad * producto.precio) + '</p>');
          tarjeta.append('<button class="btn btn-danger mx-4" item="2" style="margin-left: 1rem;" data-idprodpcli="'+producto.id+'" data-cantidad="'+producto.cantidad+'" data-precio="'+producto.precio+'">x</button>');
          tarjeta.find("button").on("click",function(){
            event.preventDefault();
            $.post( '/pedidocliente/quitarproducto', {idprodpcli: $(this).data("idprodpcli"), cantidad: $(this).data("cantidad"), precio: $(this).data("precio"),} )
              .done(function( data ) {
                if (data.exe.hasOwnProperty('errorNum')){
                  console.error(data);
                }else{
                  cargarCarrito(data.exe.objects.pedido)
                  console.log(data);
                }
              }).fail(function() {
                console.error( "error" );
              });
          });
          $('#carrito').append(tarjeta);
        }
        $('#stotal').text(pedido.subtotal);
        $('#iva').text(pedido.iva);
        $('#total').text(pedido.total);

    }

    $('#boton-vaciar').on("click", function(){
      $.get( '/pedidocliente/vaciar', {} )
        .done(function( data ) {
          if (data.exe.hasOwnProperty('errorNum')){
            console.error(data);
          }else{
            cargarCarrito(data.exe.objects.pedido)
            console.log(data);
          }
        }).fail(function() {
          console.error( "error" );
        });
    });

});




/*window.onload = function () {
  //Acá lee el JSON
  let baseDeDatos = [{
      id: 1,
      nombre: 'Leche',
      precio: 1500,
      imagen: 'img/leche.jpg'
    },
    {
      id: 2,
      nombre: 'Leche',
      precio: 1600,
      imagen: 'img/leche.jpg'
    },
    {
      id: 3,
      nombre: 'Leche',
      precio: 1700,
      imagen: 'img/leche.jpg'
    },
    {
      id: 4,
      nombre: 'Leche',
      precio: 1800,
      imagen: 'img/leche.jpg'
    }

  ]
  let $items = document.querySelector('#items');
  let carrito = [];
  let total = 0;
  let $carrito = document.querySelector('#carrito');
  let $total = document.querySelector('#total');
  let $botonVaciar = document.querySelector('#boton-vaciar');
  let $botonPagar = document.querySelector('#boton-pagar');


  function renderItems() {
    for (let info of baseDeDatos) {
      let miNodo = document.createElement('div');
      miNodo.classList.add('card', 'col-sm-4', );
      miNodo.classList.add('card', 'border-warning', );
      let miNodoCardBody = document.createElement('div');
      miNodoCardBody.classList.add('card-body');
      let miNodoTitle = document.createElement('h5');
      miNodoTitle.classList.add('card-title');
      miNodoTitle.textContent = info['nombre'];
      let miNodoImagen = document.createElement('img');
      miNodoImagen.classList.add('img-fluid');
      miNodoImagen.setAttribute('src', info['imagen']);
      let miNodoPrecio = document.createElement('p');
      miNodoPrecio.classList.add('card-info');
      miNodoPrecio.textContent = '$' + info['precio'];
      let miNodoBoton = document.createElement('button');
      miNodoBoton.classList.add('btn', 'btn-warning');
      miNodoBoton.textContent = 'Agregar';
      miNodoBoton.setAttribute('marcador', info['id']);
      miNodoBoton.addEventListener('click', anyadirCarrito);
      miNodoCardBody.appendChild(miNodoImagen);
      miNodoCardBody.appendChild(miNodoTitle);
      miNodoCardBody.appendChild(miNodoPrecio);
      miNodoCardBody.appendChild(miNodoBoton);
      miNodo.appendChild(miNodoCardBody);
      $items.appendChild(miNodo);
    }
  }

  function anyadirCarrito() {
    carrito.push(this.getAttribute('marcador'))
    calcularTotal();
    renderizarCarrito();
  }

  function renderizarCarrito() {
    $carrito.textContent = '';
    let carritoSinDuplicados = [...new Set(carrito)];
    carritoSinDuplicados.forEach(function (item, indice) {
      //Cargamos los elementos de la base de datos
      let miItem = baseDeDatos.filter(function (itemBaseDatos) {
        return itemBaseDatos['id'] == item;
      });
      let numeroUnidadesItem = carrito.reduce(function (total, itemId) {
        return itemId === item ? total += 1 : total;
      }, 0);

      let miNodo = document.createElement('li');
      miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
      miNodo.textContent = ` ${miItem[0]['nombre']} x${numeroUnidadesItem} - $${miItem[0]['precio']}`;
      let miBoton = document.createElement('button');
      miBoton.classList.add('btn', 'btn-danger', 'mx-4');
      miBoton.textContent = 'x';
      miBoton.style.marginLeft = '1rem';
      miBoton.setAttribute('item', item);
      miBoton.addEventListener('click', borrarItemCarrito);
      miNodo.appendChild(miBoton);
      $carrito.appendChild(miNodo);
    })
  }

  function borrarItemCarrito() {
    console.log()
    let id = this.getAttribute('item');
    carrito = carrito.filter(function (carritoId) {
      return carritoId !== id;
    });
    renderizarCarrito();
    calcularTotal();
  }

  function calcularTotal() {
    total = 0;
    for (let item of carrito) {
      let miItem = baseDeDatos.filter(function (itemBaseDatos) {
        return itemBaseDatos['id'] == item;
      });
      total = total + miItem[0]['precio'];
    }
    let totalDosDecimales = total.toFixed(0);
    $total.textContent = totalDosDecimales;
  }

  function vaciarCarrito() {
    carrito = [];
    renderizarCarrito();
    calcularTotal();
  }

  function pagarCarrito() {
    window.open("pagar.html", 'Pagar');
  }
  $botonVaciar.addEventListener('click', vaciarCarrito);
  $botonPagar.addEventListener('click', pagarCarrito);
  renderItems();
}*/