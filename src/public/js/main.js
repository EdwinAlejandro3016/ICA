    // let text = document.getElementById('text');
    // let bird1 = document.getElementById('bird1');
    // let bird2 = document.getElementById('bird2');
    // let btn = document.getElementById('btn');
    // let rocks = document.getElementById('rocks');
    // let water = document.getElementById('water');
    // let header = document.getElementById('header');

    //carousel
    const carousel = document.getElementById('carousel');
    const btnLeft = document.getElementById('btn-left');
    const btnRight = document.getElementById('btn-right');

    //bars
    const bars = document.getElementById('bars');
    const navbar = document.querySelector('.nav-responsive');
    const btnSalir = document.getElementById('salir');
    const body = document.getElementsByTagName('body')[0];

    //navbar animation
    const disableScroll = ()=>{
        window.scrollTo(0,0);
    }

    bars.addEventListener('click',()=>{
        navbar.classList.add('activo');
        bars.style.display = 'none';
        body.style.overflowY = 'hidden';
    });

    btnSalir.addEventListener('click',()=>{
        navbar.classList.remove('activo'); 
        bars.style.display = 'block';
        body.style.overflowY = 'visible';
    });


    //scroll animation

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
                  // screens greater than >= 775px
                  breakpoint: 450,
                  settings: {
                    // Set to `auto` and provide item width to adjust to viewport
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    itemWidth: 150,
                    duration: 0.25
                  }
                },{
                  // screens greater than >= 1024px
                  breakpoint: 700, 
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    itemWidth: 150,
                    duration: 0.25
                  }
                },{
                    // screens greater than >= 1024px
                    breakpoint: 1024, 
                    settings: {
                      slidesToShow: 4,
                      slidesToScroll: 4,
                      itemWidth: 150,
                      duration: 0.25
                    }
                  }
              ]
        });
    })

    $(document).ready(function(){
        function scroll(event) {
            // Make sure this.hash has a value before overriding default behavior
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

      // animation navbar

    // self.addEventListener('scroll',()=>{
    //     let value = window.scrollY;
    //     text.style.top = 50 + value * -0.5 + '%';
    //     bird1.style.top = value * -1.5 + 'px';
    //     bird1.style.left = value * 2 + 'px';
    //     bird2.style.top = value * -1.5 + 'px';
    //     bird2.style.left = value * -5 + 'px';
    //     btn.style.marginTop = value * 1.5 + 'px';
    //     rocks.style.top = value * -0.12 + 'px';
    //     forest.style.top = value * 0.25 + 'px';
    //     header.style.top = value * 0.5 + 'px'; 
    // })

        //carousel animation
        let paginas = 1;
        const eventosTotales = document.querySelectorAll('.evento').length;
        let res  = Math.ceil(eventosTotales /3);

        btnLeft.addEventListener('click',()=>{
            clearInterval(sliderCarousel);
            if(paginas > 1 && paginas <= res){
                paginas -= 1;
                carousel.scrollLeft -= carousel.offsetWidth; 
            }
        })

        btnRight.addEventListener('click',()=>{
            clearInterval(sliderCarousel);
            if(paginas >= 1 && paginas < res){
                paginas += 1;
                carousel.scrollLeft += carousel.offsetWidth; 
            }
        })

        const sliderCarousel = ()=>{
            if(carousel.scrollLeft >= carousel.offsetWidth ){
                clearInterval(sliderCarousel);
            }else{
                carousel.scrollLeft += carousel.offsetWidth;
            }
        }

        // setTimeout(()=>{
        //     setInterval(sliderCarousel,2000);
        // },0);
