    let text = document.getElementById('text'); 
    let bird1 = document.getElementById('bird1'); 
    let bird2 = document.getElementById('bird2'); 
    let btn = document.getElementById('btn'); 
    let rocks = document.getElementById('rocks');
    let water = document.getElementById('water');
    let header = document.getElementById('header');
    const navigation = document.querySelector('.navigation');

    //carousel
    const carousel = document.getElementById('carousel');
    const btnLeft = document.getElementById('btn-left');
    const btnRight = document.getElementById('btn-right');

    //bars
    const bars = document.getElementById('bars');
    const navbar = document.querySelector('.nav-responsive');
    const btnSalir = document.getElementById('salir');
    const body = document.getElementsByTagName('body')[0];
    const btnOracion = document.getElementById('btn-oracion');
    const motivoOracion = document.querySelector('.motivo-oracion');


    window.addEventListener('scroll',()=>{
        header.classList.toggle('sticky', window.scrollY > 0);

    })

    //navbar-responsive animation

    bars.addEventListener('click',()=>{
        navbar.classList.toggle('activo');

        if( navbar.classList.contains('activo')){
          bars.style.color = '#fff';
          bars.classList.replace('fa-bars','fa-times'); 
          body.style.overflowY = "hidden";

        }else{
          bars.style.color = "rgba(9, 75, 101,.8)";
          bars.classList.replace('fa-times','fa-bars')
          ;  
          body.style.overflowY = "visible";
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
    window.addEventListener('load',function(){
        new Glider(document.querySelector('.glider'),{
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: '.dots',
            arrows: {
              prev: '.glider-prev',
              next: '.glider-next'
            },responsive: [
                {
                    breakpoint: 350, 
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                    }
                  },
                {
                  breakpoint: 700, 
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
    })

    //animation scroll

    $(document).ready(function(){
        function scroll(event) {
            if (this.hash !== "") {
              event.preventDefault();
              var hash = this.hash;
              $('html, body').animate({
                scrollTop: $(hash).offset().top
              }, 800, function(){
                window.location.hash = hash;
              });
            } // End if
  
          };// end function
        $("a").on('click', scroll);

      });

