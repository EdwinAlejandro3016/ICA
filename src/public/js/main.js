    let text = document.getElementById('text'); 
    let bird1 = document.getElementById('bird1'); 
    let bird2 = document.getElementById('bird2'); 
    let btn = document.getElementById('btn'); 
    let rocks = document.getElementById('rocks');
    let water = document.getElementById('water');
    let header = document.getElementById('header');

    //carousel
    const carousel = document.getElementById('carousel');
    const btnLeft = document.getElementById('btn-left');
    const btnRight = document.getElementById('btn-right');

    //bars
    const bars = document.getElementById('bars');
    const navbar = document.querySelector('.nav-responsive');
    const btnSalir = document.getElementById('salir');
    const body = document.getElementsByTagName('body')[0];

          // animation section

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



    //navbar-responsive animation

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
                  breakpoint: 450,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  }
                },{
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

