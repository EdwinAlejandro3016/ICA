
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

    function slideInfo(e,close){   
      if(close){
        $('.info-carousel').slideUp();
      }else{
        tituloInfoCarousel.textContent = e.target.dataset.ministerio;
        e.preventDefault();
        $('.info-carousel').slideDown();
      }

    }
    btnCerrarInfo.addEventListener('click',(e)=>{
        slideInfo(e,true);
    })

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
        console.log("ok");
        tituloMinisterio.textContent = 'MINISTERIOS';
      })
      btnRight.addEventListener('click',(e)=>{

        console.log("ok");

        tituloMinisterio.textContent = 'MINISTERIOS';
      })

    }

    carousel.addEventListener('mouseleave',(e)=>{
      if(window.screen.width > 450){
        console.log('mouseleave');
        tituloMinisterio.textContent = 'Ministerios';
      }

    });

    console.log(elemCarousel);
    elemCarousel.forEach((elem)=>{
      elem.addEventListener('click',(e)=>{
          slideInfo(e,false);
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



    window.addEventListener('load',async function(){
       await new Glider(document.querySelector('.glider'),{
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: '.dots',
            scrollLock: true,
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
          slidesToScroll: 1,
          dots: '.dots-info',
          scrollLock: true, 
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








