// FUNCION PARA PODER CAMBIAR LA NAVEGACION AL HACER SCROLL
  window.addEventListener("scroll",function() {
    var header = document.querySelector("nav");
    var an=document.querySelector(".menu");
    // var itemsA=document.getElementById("itemsA");
    // var itemsB=document.getElementById("itemsB");
    // var itemsC=document.getElementById("itemsC");
  
    header.classList.toggle("navDark",window.scrollY > 0);
    an.classList.toggle("text-light",window.scrollY>0);
   
  })
 
// CONSTANTES PARA MANIPULAR EL DOM POR ID Y CLASES
  const body = document.querySelector('body')
  const contenedor = document.querySelector('main')
  const general= document.querySelector("#general")
  const recomendado = document.querySelector('#ofertas')
  const itemsTable = document.getElementById('items-table')
  const footerTable = document.getElementById('footer-table')
  const template = document.getElementById('template-productos').content
  const fragment = document.createDocumentFragment()
  const templateR = document.getElementById('template-recomendado').content
  const modalContent = document.getElementById('modal')
  const modalCarrito = document.querySelector('.listaCesta')
  const modalCesta = document.querySelector('.modalCarrito')
  const cerrarModal=document.getElementById('cerrarModal');
  const cerrarModal2=document.getElementById('cerrarModal2');
  const templateC = document.getElementById('template-carrito').content
  const carritoImg = document.querySelector('.imgCarrito')
  const añadirCesta = document.querySelector('.añadir')
  const verCesta = document.querySelector('#cesta')
  const verCesta2 = document.querySelector('#cesta2')
  const mensajeC= document.querySelector('#mensaje-cesta')
  const salir = document.getElementById('salir')
  const salir2 = document.getElementById('salir2')
  const buscar = document.getElementById('buscar')
  const comprar = document.querySelector('#comprar')
  const c_titulo = document.getElementById('c-titulo')
  const c_telefonia = document.getElementById('c-telefonia')
  const c_moda = document.getElementById('c-moda')
  const c_electronica = document.getElementById('c-electronica')
  const c_salud = document.getElementById('c-salud')
  const c_laptop = document.getElementById('c-laptop')
  const c_bolsa = document.getElementById('c-bolsa')
  const c_all = document.getElementById('c-all')
  // OBJETO QUE GUARDA LOS VALORES DE LA CESTA
  let cesta ={}

  //FUNCION QUE CARGA LOS DATOS CUANDO TERMINA DE CARGAR EL DOM
  document.addEventListener('DOMContentLoaded',()=>{
    DatosJson()
    
  })
  //FUNCION QUE BORRA EL OBJETO A SUS ESTADO INICIAL
  const borrarObjeto = ()=>{
    cesta={}
    llenarCesta()
  }
  
  //FUNCIONES PARA LOS MODALES Y BOTONES DE CESTA Y SALIR
  const cerrrarModal_Añadir = ()=>{
    modalContent.style.setProperty('display','none')
  }
  const verCesta_carrito = ()=>{
    modalCesta.style.setProperty('display','flex')
  }
  const cerrarModal_Cesta = ()=>{
    modalCesta.style.setProperty('display','none')
  }
  salir.addEventListener('click',()=>{
    if(Object.entries(cesta).length === 0){
     return
    }else{
      borrarObjeto()
      console.log('Borrado')
    }
  })
  salir2.addEventListener('click',()=>{
    if(cesta.length===0){
      console.log('vacion')
      return
    }else{
      borrarObjeto()
      console.log('Vv')
    }
  })
  contenedor.addEventListener('click',()=>{
    cerrarModal_Cesta()
    cerrrarModal_Añadir()
  })
  cerrarModal.addEventListener('click',()=>{
    cerrrarModal_Añadir()
  })
  cerrarModal2.addEventListener('click',()=>{
    cerrarModal_Cesta()
  })
  verCesta.addEventListener('click',()=>{
    verCesta_carrito()
    cerrrarModal_Añadir()
  })
  verCesta2.addEventListener('click',()=>{
    verCesta_carrito()
    cerrrarModal_Añadir()
  })

  //FUNCIONES QUE TRAE JSON DE PRODUCTOS CON FETCH API
  const DatosJson = async ()=>{
    try {
      await fetch('productos.json')
      .then(response => response.json())
      .then(response=>{
        elementos(response)
        ofertas(response)
        
      })
    } catch (error) {
      console.log(error)
    }
  }
  //FUNCION QUE OBTIENE LOS ELEMENTOS SEGUN JSON PARA EL CONTENEDOR
  const elementos = (data)=>{
    data.forEach(producto =>{
      template.querySelector('p').textContent = 'S/. '+ producto.precio
      template.querySelector('span').textContent = producto.nombre
      template.querySelector('img').setAttribute('src',producto.img)
      template.querySelector('.productoSelecionado').dataset.id = producto.id
      const copia = template.cloneNode(true)
      fragment.appendChild(copia)
    })
    general.appendChild(fragment)
  }

  //FUNCION QUE MUESTRA LAS OFERTAS AL INICIO
  const ofertas = (data)=>{
    data.forEach(producto =>{
      if(producto.cantidad >100){
        templateR.querySelector('p').textContent = 'Recomendado'
        templateR.querySelector('img').setAttribute('src',producto.img)
        templateR.querySelector('span').textContent = producto.nombre
        templateR.querySelector('.precio-recomendado').textContent = 'S/. '+ producto.precio
        const copia = templateR.cloneNode(true)
        fragment.appendChild(copia)
      }
    })
     recomendado.appendChild(fragment)
  }

  
  //FUNCION QUE FILTRA SEGUN LETRA DE BUSQUEDA
  buscar.addEventListener('keyup',()=>{
    general.innerHTML = ''
    filtrar_Busqueda()
  })
  const filtrar_Busqueda= async()=>{
     const palabra =await buscar.value.toLowerCase()
     await fetch('productos.json')
     .then(response=> response.json())
     .then(response=>{
        for(let producto of response)  {
         let nombre = producto.nombre.toLowerCase()
        
          if(!palabra.trim()){
           elementos(response)
           return
         }
         if(nombre.indexOf(palabra)!==-1){
          template.querySelector('p').textContent = 'S/. '+ producto.precio
          template.querySelector('span').textContent = producto.nombre
          template.querySelector('img').setAttribute('src',producto.img)
          template.querySelector('.productoSelecionado').dataset.id = producto.id
          const copia = template.cloneNode(true)
          fragment.appendChild(copia)
         }
       }
       general.appendChild(fragment)
      })
  }

  //FUNCION PARA FILTRAR POR CATEGORIA
  const filtrarCategoria= async (categoria)=>{
    await fetch('productos.json')
    .then(response=> response.json())
    .then(response=>{
       for(let producto of response)  {
        let nombre = producto.categoria
        c_titulo.textContent = categoria.toUpperCase() +':'
        if(nombre===categoria){
         template.querySelector('p').textContent = 'S/. '+ producto.precio
         template.querySelector('span').textContent = producto.nombre
         template.querySelector('img').setAttribute('src',producto.img)
         template.querySelector('.productoSelecionado').dataset.id = producto.id
         const copia = template.cloneNode(true)
         fragment.appendChild(copia)
        }
      }
      general.appendChild(fragment)
     })
  }

  c_telefonia.addEventListener('click',()=>{
    filtrarCategoria('telefonia')
    general.innerHTML=''
  })

  c_moda.addEventListener('click',()=>{
    filtrarCategoria('moda')
    general.innerHTML=''
  })
  c_electronica.addEventListener('click',()=>{
    filtrarCategoria('electronica')
    general.innerHTML=''
  })
  c_salud.addEventListener('click',()=>{
    filtrarCategoria('salud')
    general.innerHTML=''
  })
  c_laptop.addEventListener('click',()=>{
    filtrarCategoria('laptop')
    general.innerHTML=''
  })
  c_bolsa.addEventListener('click',()=>{
    filtrarCategoria('bolsa')
    general.innerHTML=''
  })
  c_all.addEventListener('click',async()=>{
    try {
      await fetch('productos.json')
      .then(response => response.json())
      .then(response=>{
        allProductos(response)
        
      })
    } catch (error) {
      console.log(error)
    }
  })

  //FUNCION QUE MUESTRA TODOS LOS PRODUCTOS
  const allProductos=(data)=>{
    c_titulo.textContent =''
    data.forEach(producto =>{
      template.querySelector('p').textContent = 'S/. '+ producto.precio
      template.querySelector('span').textContent = producto.nombre
      template.querySelector('img').setAttribute('src',producto.img)
      template.querySelector('.productoSelecionado').dataset.id = producto.id
      const copia = template.cloneNode(true)
      fragment.appendChild(copia)
    })
    general.appendChild(fragment)
  }
 
 
 
  //FUNCION QUE VALIDA SI EXISTE LAS CLASES EN UN CONTENEDOR
  general.addEventListener('click', e =>{
    if(e.target.classList.contains('productoSelecionado')){
      modalContent.style.setProperty('display','flex')
      cerrarModal_Cesta()
      setModal(e.target.parentElement)
    }
    e.stopPropagation()
  })

  //FUNCION QUE MUESTRA LOS PRODUCTOS AL TOCAR
  const setModal = (objeto) =>{
    let nombre = document.getElementById('nombre')
    let precio = document.getElementById('precio')
    let imageProducto = document.querySelector('.imageProducto')
    const producto = {
      id:objeto.querySelector('.productoSelecionado').dataset.id,
      nombre: objeto.querySelector('.nombreProducto').textContent,
      precio:objeto.querySelector('.precioProducto').textContent,
      imagen:objeto.querySelector('.productoSelecionado').src,
    }
    nombre.value= producto.nombre
    precio.value=producto.precio
    imageProducto.setAttribute('src',producto.imagen)
  }

  //FUNCION QUE AÑADE PRODUCTOS A LA CESTA AL DAR CLICK
  añadirCesta.addEventListener('click',()=>{
    llenarCesta()
    cerrrarModal_Añadir()
  })
  //FUNCION AÑADIR CESTA
  const llenarCesta = ()=>{
    let cantidad = document.querySelector('.cantidad')
    let contadorCesta= document.querySelector('#cesta-numero')
    let contadorCesta2 = document.querySelector('#cesta-numero2')
    let longitud=0
    const producto = {
      nombre: document.querySelector('.nombre').value,
      precio:document.querySelector('.precio').value,
      imagen:document.querySelector('.imageProducto').src,
      cantidad:cantidad.value
    }
    cesta[producto.nombre]={...producto}
    modalCarrito.innerHTML =''
    
    Object.values(cesta).forEach(producto=>{
      templateC.querySelector('.precio-carrito').textContent ='Precio: ' + producto.precio
      templateC.querySelector('.nombre-carrito').textContent = producto.nombre
      templateC.querySelector('.cantidad-carrito').textContent = 'Cantidad: '+ producto.cantidad
      templateC.querySelector('img').setAttribute('src',producto.imagen)
      const copiar = templateC.cloneNode(true)
      fragment.appendChild(copiar)
     })

     modalCarrito.appendChild(fragment)

    for(let i in cesta){
      longitud+=1;
    }
    contadorCesta.textContent =longitud
    contadorCesta2.textContent=longitud
    mensajeCesta()
    cantidad.value =1
  }
  
  //VALIDAR SI LA CESTA ESTA VACIA
  const mensajeCesta = ()=>{
    mensajeC.innerHTML=''
    if(Object.keys(cesta).length===0){
      mensajeC.innerHTML = `<p>Carrito Vacio</p>`
      return
    }else{
     comprar.style.setProperty('display','block')
      return
    }
  }
  //FUNCION QUE RETORNA UN ALERT AL COMPRAR
  comprar.addEventListener('click',()=>{
    alert('Tienda en Construccion')
  })
 
 
    
    
  
  
 
 
 
 




  
  // // añadirPagina();
  // // ofertas();