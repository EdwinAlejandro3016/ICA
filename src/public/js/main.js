
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

try{
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
   
///

    const btnEliminarMinisterio = document.querySelectorAll('.btn-eliminar-ministerio');

    btnEliminarMinisterio.forEach(btn=>{
      btn.addEventListener('click',async(e)=>{
        const id = e.currentTarget.dataset.id;
        const peticion = await fetch(`/form/ministerio/eliminar/${id}`,{method: 'delete'});
          const response = await peticion.json();
          if(response){
            console.log(response);
            window.location.href = '/';
          }
      })
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

  }catch(e){
  console.log(e);
}

      const crearCarousel = async({claseTarget,clasePrev,claseNext,claseDots})=>{

            await new Glider(document.querySelector(`.${claseTarget}`),{
              slidesToShow: 1,
              draggable:false,
              slidesToScroll: 1,
              dots: `.${claseDots}`,
              arrows: {
                prev: `.${clasePrev}`,
                next: `.${claseNext}`
              },responsive: [
                  {
                    breakpoint: 450, 
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2,
                      itemWidth: 150
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
      }

      const todos = document.querySelectorAll('.carousel-ministerio');
      todos.forEach(async(elem)=>{
        const clases = {};
        const guia = elem.childNodes[1].children;
        clases.claseTarget = guia[0].classList[1];
        clases.clasePrev = guia[1].classList[1];
        clases.claseNext = guia[2].classList[1]; 
        clases.claseDots = guia[3].classList[1];
        await crearCarousel(clases);
      }); 

    window.addEventListener('load',async function(){
      try{
       await new Glider(document.querySelector('.glider.ministerios'),{
            slidesToShow: 1,
            slidesToScroll: 1,
            draggable: false,
            dots: '.dots-ministerios',
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

      //   await new Glider(document.querySelector('.glider-info-otro-ministerio'),{
      //     slidesToShow: 1,
      //     draggable:false,
      //     slidesToScroll: 1,
      //     dots: '.dots-info-otro-ministerio',
      //     arrows: {
      //       prev: '.glider-prev-info-otro-ministerio',
      //       next: '.glider-next-info-otro-ministerio'
      //     },responsive: [
      //         {
      //           breakpoint: 450, 
      //           settings: {
      //             slidesToShow: 2,
      //             slidesToScroll: 2,
      //             itemWidth: 150
      //           }
      //         },{
      //             breakpoint: 1024, 
      //             settings: {
      //               slidesToShow: 3, 
      //               slidesToScroll: 3, 
      //             }
      //           }
      //       ]
      // });
      }catch(e){
        console.log(e);
      }
    })
    // FORMULARIO CREAR MINISTERIO
    try{

      $('.form-agregar-ministerio.crear').hide();

      $('#slideCrearMinisterio').click(function(e){
        e.preventDefault();
          $('.form-agregar-ministerio.crear').slideToggle();
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
      console.log('por aqui');

      const peticion = await fetch(`/form/oracion/${id}`,{method: 'delete'});
      const response = await peticion.json();
      if(response){
        child.parentNode.removeChild(child);
        window.location.href = '/';
      }
    })
    }catch(e){
      console.log(e);
    }




