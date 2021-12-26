
    let header = document.getElementById('header');
    const navigation = document.querySelector('.navigation');
    const itemsNavResp = document.querySelectorAll('.items-nav a');

    //items nav clases active
    const itemsNav = document.querySelectorAll('.navigation a');
    itemsNav.forEach((item)=>{
      item.addEventListener('click',(e)=>{
        itemsNav.forEach((item)=>{
          item.classList.remove('activo');
        })
        e.currentTarget.classList.add('activo');
      })
    })
    //carousel
    // const carousel = document.getElementById('carousel');
    const carousel = document.querySelector('.carousel');
    const tituloMinisterio = document.getElementById('ministerio');
    const elemCarousel = document.querySelectorAll('.ministerios .carousel__elemento img');


    //bars
    const bars = document.getElementById('bars');
    const navbar = document.querySelector('.nav-responsive');
    const btnSalir = document.getElementById('salir');
    const body = document.getElementsByTagName('body')[0];
    const btnOracion = document.getElementById('btn-oracion');
    const motivoOracion = document.querySelector('.motivo-oracion');

      //animation scroll

      $(document).ready(function(){
        function scroll(event) {
            if (this.hash !== "") {
              event.preventDefault();
              var hash = this.hash;
              $('html, body').animate({
                scrollTop: $(hash).offset().top
              }, 500, function(){
                window.location.hash = hash;
              });
            } // End if
  
          };// end function
        $("a").on('click', scroll);

      });

    window.addEventListener('scroll',()=>{
        header.classList.toggle('sticky', window.scrollY > 0);

    })

    //navbar-responsive animation

    bars.addEventListener('click',()=>{
        navbar.classList.toggle('activo');

        if( navbar.classList.contains('activo')){
          bars.style.color = '#fff';
          bars.classList.replace('fa-bars','fa-times'); 
          itemsNavResp.forEach(item=>{
            item.addEventListener('click',(e)=>{
               bars.style.color = "rgba(9, 75, 101,.8)";
               bars.classList.replace('fa-times','fa-bars');
               navbar.classList.remove('activo');
            })
          })
        }else{
          bars.style.color = "rgba(9, 75, 101,.8)";
          bars.classList.replace('fa-times','fa-bars')
          ;  
          // body.style.overflowY = "visible";
        }
    });

    //motivo de oracion
    btnOracion.addEventListener('click',()=>{
      motivoOracion.classList.toggle('activo');

      if( motivoOracion.classList.contains('activo')){
        // btnOracion.style.color = '#fff';
        btnOracion.children[0].children[0].classList.replace('fa-edit','fa-times'); 
        body.style.overflowY = "hidden";
        // motivoOracion.style.transform = `translateY(${body.scrollY}px)`;

      }else{
        // btnOracion.style.color = "rgba(9, 75, 101,.8)";
        btnOracion.children[0].children[0].classList.replace('fa-times','fa-edit');  
        body.style.overflowY = "visible";
        if(navbar.classList.contains('activo')){
          bars.classList.replace('fa-times','fa-bars');
          bars.style.color = "rgba(9, 75, 101,.8)";
          navbar.classList.remove('activo');

        }
      }
  });


    //carousel
    const btnLeft = document.getElementById('btn-left-carousel');
    const btnRight = document.getElementById('btn-right-carousel');
    const tituloInfoCarousel = document.getElementById('titulo-info-carousel');
    const btnCerrarInfo = document.getElementById('cerrar-info');
    const parrafoInfo = document.getElementById('parrafo-info-carousel');


    function slideInfo(e,data,close){   
      const {titulo, info,carpeta,dire} = data;
      const id = data._id;
      tituloInfoCarousel.textContent = titulo;
      parrafoInfo.textContent = info;

      try{
      const btnEliminar = document.getElementById('eliminar-ministerio');
        btnEliminar.addEventListener('click',async()=>{
          try{
            const data = await fetch(`/form/ministerio/eliminar/${id}`,{
              method: 'delete',
            });
            const respuesta = await data.json();
            
            // para eliminar la carpeta
            const response = await fetch('/form/ministerio/eliminar',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({carpeta,dire})
            })
            const ok = await response.json();
            if(ok){
              window.location.href = '/';

            } 

            ///////

          }catch(e){
              console.log(e);
          }

       });

      }catch(e){
        console.log('el btn eliminar esta oculto')
      }
      if(close){
        $('.info-carousel').slideUp();
      }else{
        e.preventDefault();
        $('.info-carousel').slideDown();
      }
 
    }

    try{
    btnCerrarInfo.addEventListener('click',(e)=>{
        slideInfo(e,'',true);
      })
    }catch(e){
      console.log("vista bloqueda");
    }


    if(window.screen.width < 450){
      tituloMinisterio.textContent = elemCarousel[0].dataset.ministerio;
      
      btnLeft.addEventListener('click',(e)=>{
        if(contadorCarousel === 1){ 

        }else{
          contadorCarousel--;
          tituloMinisterio.textContent = elemCarousel[contadorCarousel - 1].dataset.ministerio;
        }
        console.log(contadorCarousel);
        return false;
      })

      btnRight.addEventListener('click',(e)=>{
        if(contadorCarousel === elemCarousel.length){

        }else{
          contadorCarousel++;
          tituloMinisterio.textContent = elemCarousel[contadorCarousel - 1].dataset.ministerio;
        }
        console.log(contadorCarousel);
        return false;
      })
      ///////
    }
    else{
      btnLeft.addEventListener('click',(e)=>{
        tituloMinisterio.textContent = 'MINISTERIOS';
      })
      btnRight.addEventListener('click',(e)=>{
        tituloMinisterio.textContent = 'MINISTERIOS';
      })

    }

    carousel.addEventListener('mouseleave',(e)=>{
      if(window.screen.width > 450){
        tituloMinisterio.textContent = 'Ministerios';
      }

    });


    elemCarousel.forEach((elem)=>{
      elem.addEventListener('click',async(e)=>{

          const ministerio = e.target.dataset.ministerio;
          const response = await fetch('/form/ministerio/info',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({titulo: ministerio})
          })
          .then(res=>res.json())
          .then(data=>{ 
              return data;
           })
          .catch(()=>{console.log('error en la peticion')});
          console.log(e);
          slideInfo(e,response,false);
       });


    })

    let contadorCarousel = 1;

    carousel.addEventListener('mouseover',(e)=>{
      let targetActual = e.target;

        if(e.target.dataset.ministerio === undefined){
          return false;
        }else{
          let parrafo = e.target.dataset.ministerio;
          tituloMinisterio.textContent = parrafo;
        }
        
    });



    window.addEventListener('load',async function(){
       await new Glider(document.querySelector('.glider'),{
            slidesToShow: 1,
            slidesToScroll: 1,
            draggable: false,
            dots: '.dots',
            arrows: {
              prev: '.glider-prev',
              next: '.glider-next'
            },responsive: [
                {
                  breakpoint: 450, 
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                  }
                },{
                    breakpoint: 1024, 
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 3,
                    }
                  }
              ]
        });
       await new Glider(document.getElementById('carousel-info'),{
          slidesToShow: 1,
          draggable:false,
          slidesToScroll: 1,
          dots: '.dots-info',
          arrows: {
            prev: '.glider-prev-info',
            next: '.glider-next-info'
          },responsive: [
              {
                breakpoint: 450, 
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                }
              },{
                  breakpoint: 1024, 
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                  }
                }
            ]
      });
      $('.info-carousel').hide();

      // $('.slide-carousel-info').click(slideInfo(e,'yo'));
    })

    // FORMULARIO CREAR MINISTERIO
    try{

      $('.form-agregar-ministerio').hide();

      $('#slideCrearMinisterio').click(function(e){
        e.preventDefault();
          $('.form-agregar-ministerio').slideToggle();
      });
    }catch(e){
      console.log('no estamos en la cuenta privada');
    }
  
    //oraciones
    try{
    const btnEliminarOracion = document.getElementById('eliminar-oracion');
    btnEliminarOracion.addEventListener('click',async(e)=>{
      const id = e.currentTarget.dataset.id;
      const oracion = e.currentTarget;
      const child = oracion.parentNode.parentNode;
      child.parentNode.removeChild(child);

      const peticion = await fetch(`/form/oracion/${id}`,{method: 'delete'});
      const response = await peticion.json();
      window.location.href = '/';
    })
    }catch(e){

    }




