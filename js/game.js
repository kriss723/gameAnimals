

document.addEventListener('DOMContentLoaded', () => {
    /// variables///
    var imagenCafe = new Image(); 
    var imagenRojo = new Image();
    var imagenVerde = new Image();
    var imagenBlanco = new Image();
    imagenCafe.src = "img/Cafe.png";
    imagenRojo.src = "img/Rojo.png";
    imagenVerde.src = "img/Verde.png";
    imagenBlanco.src = "img/Blanco.png";

    var objetoActual = null;
    var objetoColision = null;
    var indexColision = null;
    var bandera;
    var banderaY;

    //efectos
    var backMusic = document.getElementById('background')
    var colisionSound = document.getElementById('colision');
    var moviGame = document.getElementById('movimiento');

    backMusic.play();

    ///----------clase del objeto-------------//////////

    var squaretemplate = function(options) {
        return {
            x: options.x || '',
            y: options.y || '',
            w: options.w || '',
            h: options.h || '',
            color: options.color || '#2125292e'           
        }
    }

    var squaretemplateGame = function(options) {
        return {
            x: options.x || '',
            y: options.y || '',
            w: options.w || '',
            h: options.h || '',
            image: options.image || ''
                    
        }
    }
    
    var muros = [
        new squaretemplate ({x:0,y:0,w:140,h:350}),
        new squaretemplate ({x:140,y:0,w:630,h:70}),
        new squaretemplate ({x:210,y:70,w:70,h:280}),
        new squaretemplate ({x:350,y:70,w:70,h:280}),
        new squaretemplate ({x:490,y:70,w:70,h:280}),
        new squaretemplate ({x:630,y:70,w:140,h:280}),
        new squaretemplate ({x:0,y:420,w:770,h:70})
    ];


    var animales = [
        new squaretemplateGame({x:140, x2: 210, y: 70, y2: 140, w: 70, h:70, image: imagenCafe}),
        /*new squaretemplateGame({x:140, x2: 210, y: 140, y2: 210, w: 70, h:70, image: imagenCafe}),
        new squaretemplateGame({x:140, x2: 210, y: 210, y2: 280, w: 70, h:70, image: imagenCafe}),*/
        new squaretemplateGame({x:280, x2: 350, y: 70, y2: 140, w: 70, h: 70, image: imagenRojo}),
        /*new squaretemplateGame({x:280, x2: 350, y: 140, y2: 210, w: 70, h: 70, image: imagenRojo}),
        new squaretemplateGame({x:280, x2: 350, y: 210, y2: 280, w: 70, h: 70, image: imagenRojo}),*/
        new squaretemplateGame({x:420, x2: 490, y: 70, y2: 140, w: 70, h:70, image: imagenVerde}),
        /*new squaretemplateGame({x:420, x2: 490, y: 140, y2: 210, w: 70, h:70, image: imagenVerde}),
        new squaretemplateGame({x:420, x2: 490, y: 210, y2: 280, w: 70, h:70, image: imagenVerde}),*/
        new squaretemplateGame({x:560, x2: 630, y: 70, y2: 140, w: 70, h:70, image: imagenBlanco})
        /*new squaretemplateGame({x:560, x2: 630, y: 140, y2: 210, w: 70, h:70, image: imagenBlanco}),
        new squaretemplateGame({x:560, x2: 630, y: 210, y2: 280, w: 70, h:70, image: imagenBlanco})*/
    ]
    //var squareGame = new squaretemplateGame({x:140, y: 70, w: 70, h:70, image: imagencafe})
    //------------Seccion del canvas-------------////////

    var canvasB = document.getElementById('lienzo').getContext('2d');
    var canvasP = document.getElementById('patrones').getContext('2d');
    var fondo = new Image();
    var patrones = new Image();

    var cW = canvasB.canvas.width;
    var cH = canvasB.canvas.height;
    fondo.src = "img/background.jpg";

    // tableros patrones del juego
    patrones.src = "img/patron1.jpg";
    patron1 = [{x:140, x2: 210, y: 70, y2: 140, w: 70, h:70, image: imagenCafe},
               {x:280, x2: 350, y: 70, y2: 140, w: 70, h: 70, image: imagenRojo},
               {x:420, x2: 490, y: 70, y2: 140, w: 70, h:70, image: imagenVerde},
               {x:560, x2: 630, y: 70, y2: 140, w: 70, h:70, image: imagenBlanco}
            ];

    

    function launcher(){


        this.render = function(){
            
            canvasB.fillStyle = this.bg;
            canvasB.drawImage(fondo,0,0);
            canvasP.drawImage(patrones,0,0);

            for (let index = 0; index < muros.length; index++) {
                canvasB.fillStyle = muros[index].color;
                canvasB.fillRect(muros[index].x,muros[index].y, muros[index].w,muros[index].h);
                
            }
            
            for (let index = 0; index < animales.length; index++) {
                canvasB.drawImage(animales[index].image, animales[index].x, animales[index].y, animales[index].w, animales[index].h);
            }
           
        }
        
    }

    var launcher = new launcher();

    function animate(){
        canvasB.clearRect(0, 0, cW, cH);
        launcher.render();
        
      }
      
      var animateInterval = setInterval(animate,6);
      

      canvasB.canvas.addEventListener('mousedown', function (event) {

        const rect = canvasB.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        console.log('es x '+x);
        console.log('es y '+y);

          for (let index = 0; index < animales.length; index++) {
           
              if (animales[index].x < x
                && (animales[index].w + animales[index].x > x)
                && animales[index].y < y
                && (animales[index].h + animales[index].y > y)) {
                  objetoActual = animales[index];
                  indexColision = index;
                  console.log(objetoActual);
                    /*  prueba de comprobacion
                  if(objetoActual.image == imagenCafe){
                      console.log('perrito');
                  }*/
                  break;
              }
              
          }
      })

      

      canvasB.canvas.addEventListener('mousemove', function (event) {
        //console.log('se mueve' +event.clientX+ ' x y  en y: '+event.clientY);
        //console.log(objetoActual);
        const rect = canvasB.canvas.getBoundingClientRect();
        var x2;
       
        console.log(testPatrol())///////////////////////////////////////////////////////////////////////////////////////////
        var bool = testPatrol();

        if(testPatrol() != false){
            console.log('ganaste');
        }

        if (objetoActual != null) {

            if (objetoColision == null) {
                moviGame.play();
            }
            
            bandera = objetoActual.x;
            banderaY = objetoActual.y;
            //objetoActual.x = (event.clientX - rect.left) -10;
            //console.log('coordenadas del objeto antes '+bandera);
            objetoActual.x = (event.clientX - rect.left);//cara izquierda del objeto
            objetoActual.x2 = objetoActual.x + objetoActual.w
            objetoActual.y = (event.clientY - rect.top);
            objetoActual.y2 = objetoActual.y + objetoActual.h
            //console.log('coordenada del objeto despues '+objetoActual.x);
            x2 = (objetoActual.x + objetoActual.w)//cara derecha del objeto

            console.log('X2: '+(objetoActual.x + objetoActual.w ));

            
            
            //colisones con el entorno las columnas
            


            if((objetoActual.x >= 0  && objetoActual.x <= 70 )&& bandera == 0){
                objetoActual.y = 350;
            }else if((objetoActual.x >= 70 && objetoActual.x <= 140) && bandera == 70){
                objetoActual.y = 350;
            }else if(objetoActual.x <= 140 && (objetoActual.y >= 0 && objetoActual.y <= 350)){
                objetoActual.x = 140;//permanecer en columna 1 limite izquierdo
            }else if((x2 >= 210 && bandera == 140) && (objetoActual.y >= 0 && objetoActual.y <= 350)){
                objetoActual.x = 140; //permanecer en columna 1 limite derecho
            }else if((objetoActual.x >= 630 && objetoActual.x <= 700) && (objetoActual.y >= 0 && objetoActual.y <= 350)){
                objetoActual.x = 630;//limite superior izquierdo
                objetoActual.y = 350;
            }else if (objetoActual.x > 700 && bandera == 700){
                objetoActual.y = 350;
            }

            if ( objetoActual.y <= 350 && objetoActual.x > 210 && objetoActual.x < 280) {
                objetoActual.y = 350;//limite inferior de la columna 1
            }

            if((objetoActual.x <= 280 && bandera == 280) && (objetoActual.y >= 0 && objetoActual.y <= 350)){
                objetoActual.x = 280;//permanecer en columna 2 limite izquierdo
                objetoActual.y = banderaY;
            }else if((x2 >= 350 && bandera == 280) && (objetoActual.y >= 0 && objetoActual.y <= 350)){
                objetoActual.x = 280;//permanecer en columna 2 limite derecho
            }

            if ( objetoActual.y <= 350 && objetoActual.x > 280 && objetoActual.x < 420) {
                objetoActual.y = 350;//limite inferior de la columna 2
            }

            if((objetoActual.x <= 420 && bandera == 420) && (objetoActual.y >= 0 && objetoActual.y <= 350)){
                objetoActual.x = 420;//permanecer en columna 3 limite izquierdo
            }else if((x2 >= 490 && bandera == 420) && (objetoActual.y >= 0 && objetoActual.y <= 350)){
                objetoActual.x = 420;//permanecer en columna 3 limite derecho
            }

            if ( objetoActual.y <= 350 && objetoActual.x > 420 && objetoActual.x < 560) {
                objetoActual.y = 350;//limite inferior de la columna 3
            }

            if((objetoActual.x <= 560 && bandera == 560) && (objetoActual.y >= 0 && objetoActual.y <= 350)){
                objetoActual.x = 560;//permanecer en columna 4 limite izquierdo
            }else if((x2 >= 630 && bandera == 560) && (objetoActual.y >= 0 && objetoActual.y <= 350)){
                objetoActual.x = 560;//permanecer en columna 4 limite derecho
            }
                

                if(objetoActual.x > 0 && objetoActual.x < 70){
                    objetoActual.x = 0;
                }else if(objetoActual.x > 70 && objetoActual.x < 140){
                    objetoActual.x = 70
                }else if (objetoActual.x > 140 && objetoActual.x < 210) {
                    objetoActual.x = 140;
                }else if(objetoActual.x > 210 && objetoActual.x < 280){
                    objetoActual.x = 210;                 
                }else if(objetoActual.x > 280 && objetoActual.x < 350 ){
                    objetoActual.x = 280;
                }else if(objetoActual.x > 350 && objetoActual.x < 420 ){
                    objetoActual.x = 350;
                }else if(objetoActual.x > 420 && objetoActual.x < 490 ){
                    objetoActual.x = 420;
                }else if(objetoActual.x > 490 && objetoActual.x < 560 ){
                    objetoActual.x = 490;
                }else if(objetoActual.x > 560 && objetoActual.x < 630 ){
                    objetoActual.x = 560;
                }else if(objetoActual.x > 630 && objetoActual.x < 700 ){
                    objetoActual.x = 630;
                }else if(objetoActual.x > 700){
                    objetoActual.x = 700;
                }else if(objetoActual.x < 0){
                    objetoActual.x = 0;
                }


                if (objetoActual.y < 70 ) {
                    objetoActual.y = 70;
                }else if(objetoActual.y > 70 && objetoActual.y < 140){
                    objetoActual.y = 70;
                }else if(objetoActual.y > 140 && objetoActual.y < 210){
                    objetoActual.y = 140;
                }else if(objetoActual.y > 210 && objetoActual.y < 280){
                    objetoActual.y = 210;
                }else if(objetoActual.y > 280 && objetoActual.y < 350){
                    objetoActual.y = 280;
                }else if(objetoActual.y > 350){
                    objetoActual.y = 350;
                }


            //colisiones entre demas objetos
            
            for (let index = 0; index < animales.length; index++) {
                
                var animalX1 = animales[index].x;
                var animalX2 = (animales[index].x + animales[index].w);
                var animalY1 = animales[index].y;
                var animalY2 = (animales[index].y + animales[index].h);
                               
                if (indexColision != index) {
                               
                    if (objetoActual.x < animalX2 && (objetoActual.x + objetoActual.w) > animalX1
                        && objetoActual.y < animalY2 && (objetoActual.y + objetoActual.h) > animalY1) {
                        console.log('colision');
                        colisionSound.play();
                        objetoColision = animales[index];
                         
                        break;
                    }     

                }                 
                
            }

            console.log('bandera y '+banderaY);

            if (objetoColision != null){
                
                //zona horizontal del juego
                if((objetoActual.x + objetoActual.w) > objetoColision.x && bandera == 0){
                    objetoActual.x = 0;
                }else if( objetoActual.x < objetoColision.x2 && bandera == 70){
                    objetoActual.x = 70;
                }else if((objetoActual.x + objetoActual.w) > objetoColision.x && bandera == 70){
                    objetoActual.x = 70;
                }else if( objetoActual.x < objetoColision.x2 && bandera == 140){
                    objetoActual.x = 140;
                }else if((objetoActual.x + objetoActual.w) > objetoColision.x && bandera == 140){
                    objetoActual.x = 140;
                }else if( objetoActual.x < objetoColision.x2 && bandera == 210){
                    objetoActual.x = 210;
                }else if((objetoActual.x + objetoActual.w) > objetoColision.x && bandera == 210){
                    objetoActual.x = 210;
                }else if( objetoActual.x < objetoColision.x2 && bandera == 280){
                    colisionSound.play();
                    objetoActual.x = 280;
                }else if((objetoActual.x + objetoActual.w) > objetoColision.x && bandera == 280){

                    objetoActual.x = 280;
                }else if( objetoActual.x < objetoColision.x2 && bandera == 350){

                    objetoActual.x = 350;
                }else if((objetoActual.x + objetoActual.w) > objetoColision.x && bandera == 350){

                    objetoActual.x = 350;
                }else if( objetoActual.x < objetoColision.x2 && bandera == 420){

                    objetoActual.x = 420;
                }else if((objetoActual.x + objetoActual.w) > objetoColision.x && bandera == 420){
                    objetoActual.x = 420;
                }else if( objetoActual.x < objetoColision.x2 && bandera == 490){

                    objetoActual.x = 490;
                }else if((objetoActual.x + objetoActual.w) > objetoColision.x && bandera == 490){

                    objetoActual.x = 490;
                }else if( objetoActual.x < objetoColision.x2 && bandera == 560){

                    objetoActual.x = 560;
                }else if((objetoActual.x + objetoActual.w) > objetoColision.x && bandera == 560){

                    objetoActual.x = 560;
                }else if( objetoActual.x < objetoColision.x2 && bandera == 630){

                    objetoActual.x = 630;
                }else if((objetoActual.x + objetoActual.w) > objetoColision.x && bandera == 630){

                    objetoActual.x = 630;
                }else if(objetoActual.x < objetoColision.x2 && bandera == 700){

                    objetoActual.x = 700;
                }

                //colision de columnas
                if((objetoActual.y + objetoActual.h) > objetoActual.y && banderaY == 70){
                    objetoActual.y = 70;
                    objetoActual = null;
                }else if(objetoActual.y < objetoColision.y2 && banderaY == 140){
                    objetoActual.y = 140;
                    objetoActual = null;
                }else if((objetoActual.x2 > objetoColision.y) && banderaY == 140){
                    objetoActual.y = 140;
                    objetoActual = null;
                }else if(objetoActual.y < objetoColision.y2 && banderaY == 210){
                    objetoActual.y = 210;
                    objetoActual = null;
                }else if((objetoActual.x2 > objetoColision.y) && banderaY == 210){
                    objetoActual.y = 210;
                    objetoActual = null;
                }else if(objetoActual.y < objetoColision.y2 && banderaY == 280){
                    objetoActual.y = 280;
                    objetoActual = null;
                }else if((objetoActual.x2 > objetoColision.y) && banderaY == 280){
                    objetoActual.y = 280;
                    objetoActual = null;
                }else if(objetoActual.y < objetoColision.y2 && banderaY == 350){
                    objetoActual.y = 350;
                    objetoActual = null;
                }else if((objetoActual.x2 > objetoColision.y) && banderaY == 350){
                    objetoActual.y = 350;
                    objetoActual = null;
                }


              
            }
            
            animateInterval = setInterval(animate,6);
        }
    })


    canvasB.canvas.addEventListener('mouseup', function (event) {
       
        objetoActual = null;
        objetoColision = null;

    })
    
    var touch;

    canvasB.canvas.addEventListener('touchstart', function(event){
        //Comprobamos si hay varios eventos del mismo tipo
        if (event.targetTouches.length == 1) { 
        touch = event.targetTouches[0]; 
        // con esto solo se procesa UN evento touch
        //alert(" se ha producido un touchstart en las siguientes cordenas: X " + touch.pageX + " en Y " + touch.pageY);
        //}

        const rect = canvasB.canvas.getBoundingClientRect();
        const x = touch.pageX - rect.left;
        const y = touch.pageY - rect.top;

        console.log('es x '+x);
        console.log('es y '+y);

          for (let index = 0; index < animales.length; index++) {
           
              if (animales[index].x < x
                && (animales[index].w + animales[index].x > x)
                && animales[index].y < y
                && (animales[index].h + animales[index].y > y)) {
                  objetoActual = animales[index];
                  indexColision = index;
                  console.log(objetoActual);
                  break;
              }
              
          }

          console.log( 'evento touchstart en x: '+x+' y: '+y);

        }
        
    }, false);


    canvasB.canvas.addEventListener('touchmove', function(event){

        event.preventDefault();
        //validamos que sea un solo toque.
        
        if (event.targetTouches.length == 1) {

            touch = event.targetTouches[0];

            const rect = canvasB.canvas.getBoundingClientRect();
            var x2;
       

        if (objetoActual != null) {

            if (objetoColision == null) {
                moviGame.play();
            }
            
            bandera = objetoActual.x;
            banderaY = objetoActual.y;
            //objetoActual.x = (event.clientX - rect.left) -10;
            //console.log('coordenadas del objeto antes '+bandera);
            objetoActual.x = (touch.pageX- rect.left);//cara izquierda del objeto
            objetoActual.x2 = objetoActual.x + objetoActual.w
            objetoActual.y = (touch.pageY - rect.top);
            objetoActual.y2 = objetoActual.y + objetoActual.h
            //console.log('coordenada del objeto despues '+objetoActual.x);
            x2 = (objetoActual.x + objetoActual.w)//cara derecha del objeto

            console.log('X2: '+(objetoActual.x + objetoActual.w ));

            
            
            //colisones con el entorno las columnas
            


            if((objetoActual.x >= 0  && objetoActual.x <= 70 )&& bandera == 0){
                objetoActual.y = 350;
            }else if((objetoActual.x >= 70 && objetoActual.x <= 140) && bandera == 70){
                objetoActual.y = 350;
            }else if(objetoActual.x <= 140 && (objetoActual.y >= 0 && objetoActual.y <= 350)){
                objetoActual.x = 140;//permanecer en columna 1 limite izquierdo
            }else if((x2 >= 210 && bandera == 140) && (objetoActual.y >= 0 && objetoActual.y <= 350)){
                objetoActual.x = 140; //permanecer en columna 1 limite derecho
            }else if((objetoActual.x >= 630 && objetoActual.x <= 700) && (objetoActual.y >= 0 && objetoActual.y <= 350)){
                objetoActual.x = 630;//limite superior izquierdo
                objetoActual.y = 350;
            }else if (objetoActual.x > 700 && bandera == 700){
                objetoActual.y = 350;
            }

            if ( objetoActual.y <= 350 && objetoActual.x > 210 && objetoActual.x < 280) {
                objetoActual.y = 350;//limite inferior de la columna 1
            }

            if((objetoActual.x <= 280 && bandera == 280) && (objetoActual.y >= 0 && objetoActual.y <= 350)){
                objetoActual.x = 280;//permanecer en columna 2 limite izquierdo
                objetoActual.y = banderaY;
            }else if((x2 >= 350 && bandera == 280) && (objetoActual.y >= 0 && objetoActual.y <= 350)){
                objetoActual.x = 280;//permanecer en columna 2 limite derecho
            }

            if ( objetoActual.y <= 350 && objetoActual.x > 280 && objetoActual.x < 420) {
                objetoActual.y = 350;//limite inferior de la columna 2
            }

            if((objetoActual.x <= 420 && bandera == 420) && (objetoActual.y >= 0 && objetoActual.y <= 350)){
                objetoActual.x = 420;//permanecer en columna 3 limite izquierdo
            }else if((x2 >= 490 && bandera == 420) && (objetoActual.y >= 0 && objetoActual.y <= 350)){
                objetoActual.x = 420;//permanecer en columna 3 limite derecho
            }

            if ( objetoActual.y <= 350 && objetoActual.x > 420 && objetoActual.x < 560) {
                objetoActual.y = 350;//limite inferior de la columna 3
            }

            if((objetoActual.x <= 560 && bandera == 560) && (objetoActual.y >= 0 && objetoActual.y <= 350)){
                objetoActual.x = 560;//permanecer en columna 4 limite izquierdo
            }else if((x2 >= 630 && bandera == 560) && (objetoActual.y >= 0 && objetoActual.y <= 350)){
                objetoActual.x = 560;//permanecer en columna 4 limite derecho
            }
                

                if(objetoActual.x > 0 && objetoActual.x < 70){
                    objetoActual.x = 0;
                }else if(objetoActual.x > 70 && objetoActual.x < 140){
                    objetoActual.x = 70
                }else if (objetoActual.x > 140 && objetoActual.x < 210) {
                    objetoActual.x = 140;
                }else if(objetoActual.x > 210 && objetoActual.x < 280){
                    objetoActual.x = 210;                 
                }else if(objetoActual.x > 280 && objetoActual.x < 350 ){
                    objetoActual.x = 280;
                }else if(objetoActual.x > 350 && objetoActual.x < 420 ){
                    objetoActual.x = 350;
                }else if(objetoActual.x > 420 && objetoActual.x < 490 ){
                    objetoActual.x = 420;
                }else if(objetoActual.x > 490 && objetoActual.x < 560 ){
                    objetoActual.x = 490;
                }else if(objetoActual.x > 560 && objetoActual.x < 630 ){
                    objetoActual.x = 560;
                }else if(objetoActual.x > 630 && objetoActual.x < 700 ){
                    objetoActual.x = 630;
                }else if(objetoActual.x > 700){
                    objetoActual.x = 700;
                }else if(objetoActual.x < 0){
                    objetoActual.x = 0;
                }


                if (objetoActual.y < 70 ) {
                    objetoActual.y = 70;
                }else if(objetoActual.y > 70 && objetoActual.y < 140){
                    objetoActual.y = 70;
                }else if(objetoActual.y > 140 && objetoActual.y < 210){
                    objetoActual.y = 140;
                }else if(objetoActual.y > 210 && objetoActual.y < 280){
                    objetoActual.y = 210;
                }else if(objetoActual.y > 280 && objetoActual.y < 350){
                    objetoActual.y = 280;
                }else if(objetoActual.y > 350){
                    objetoActual.y = 350;
                }


            //colisiones entre demas objetos
            
            for (let index = 0; index < animales.length; index++) {
                
                var animalX1 = animales[index].x;
                var animalX2 = (animales[index].x + animales[index].w);
                var animalY1 = animales[index].y;
                var animalY2 = (animales[index].y + animales[index].h);
                               
                if (indexColision != index) {
                               
                    if (objetoActual.x < animalX2 && (objetoActual.x + objetoActual.w) > animalX1
                        && objetoActual.y < animalY2 && (objetoActual.y + objetoActual.h) > animalY1) {
                        console.log('colision');
                        colisionSound.play();
                        objetoColision = animales[index];
                         
                        break;
                    }     

                }                 
                
            }

            console.log('bandera y '+banderaY);

            if (objetoColision != null){
                
                //zona horizontal del juego
                if((objetoActual.x + objetoActual.w) > objetoColision.x && bandera == 0){
                    objetoActual.x = 0;
                }else if( objetoActual.x < objetoColision.x2 && bandera == 70){
                    objetoActual.x = 70;
                }else if((objetoActual.x + objetoActual.w) > objetoColision.x && bandera == 70){
                    objetoActual.x = 70;
                }else if( objetoActual.x < objetoColision.x2 && bandera == 140){
                    objetoActual.x = 140;
                }else if((objetoActual.x + objetoActual.w) > objetoColision.x && bandera == 140){
                    objetoActual.x = 140;
                }else if( objetoActual.x < objetoColision.x2 && bandera == 210){
                    objetoActual.x = 210;
                }else if((objetoActual.x + objetoActual.w) > objetoColision.x && bandera == 210){
                    objetoActual.x = 210;
                }else if( objetoActual.x < objetoColision.x2 && bandera == 280){
                    colisionSound.play();
                    objetoActual.x = 280;
                }else if((objetoActual.x + objetoActual.w) > objetoColision.x && bandera == 280){

                    objetoActual.x = 280;
                }else if( objetoActual.x < objetoColision.x2 && bandera == 350){

                    objetoActual.x = 350;
                }else if((objetoActual.x + objetoActual.w) > objetoColision.x && bandera == 350){

                    objetoActual.x = 350;
                }else if( objetoActual.x < objetoColision.x2 && bandera == 420){

                    objetoActual.x = 420;
                }else if((objetoActual.x + objetoActual.w) > objetoColision.x && bandera == 420){
                    objetoActual.x = 420;
                }else if( objetoActual.x < objetoColision.x2 && bandera == 490){

                    objetoActual.x = 490;
                }else if((objetoActual.x + objetoActual.w) > objetoColision.x && bandera == 490){

                    objetoActual.x = 490;
                }else if( objetoActual.x < objetoColision.x2 && bandera == 560){

                    objetoActual.x = 560;
                }else if((objetoActual.x + objetoActual.w) > objetoColision.x && bandera == 560){

                    objetoActual.x = 560;
                }else if( objetoActual.x < objetoColision.x2 && bandera == 630){

                    objetoActual.x = 630;
                }else if((objetoActual.x + objetoActual.w) > objetoColision.x && bandera == 630){

                    objetoActual.x = 630;
                }else if(objetoActual.x < objetoColision.x2 && bandera == 700){

                    objetoActual.x = 700;
                }

                //colision de columnas
                if((objetoActual.y + objetoActual.h) > objetoActual.y && banderaY == 70){
                    objetoActual.y = 70;
                    objetoActual = null;
                }else if(objetoActual.y < objetoColision.y2 && banderaY == 140){
                    objetoActual.y = 140;
                    objetoActual = null;
                }else if((objetoActual.x2 > objetoColision.y) && banderaY == 140){
                    objetoActual.y = 140;
                    objetoActual = null;
                }else if(objetoActual.y < objetoColision.y2 && banderaY == 210){
                    objetoActual.y = 210;
                    objetoActual = null;
                }else if((objetoActual.x2 > objetoColision.y) && banderaY == 210){
                    objetoActual.y = 210;
                    objetoActual = null;
                }else if(objetoActual.y < objetoColision.y2 && banderaY == 280){
                    objetoActual.y = 280;
                    objetoActual = null;
                }else if((objetoActual.x2 > objetoColision.y) && banderaY == 280){
                    objetoActual.y = 280;
                    objetoActual = null;
                }else if(objetoActual.y < objetoColision.y2 && banderaY == 350){
                    objetoActual.y = 350;
                    objetoActual = null;
                }else if((objetoActual.x2 > objetoColision.y) && banderaY == 350){
                    objetoActual.y = 350;
                    objetoActual = null;
                }


              
            }
            
            animateInterval = setInterval(animate,6);
        }
            
            
        }
        
        
    }, false);


    canvasB.canvas.addEventListener('touchend', function(event){
        //Comprobamos cuando finaliza el evento touch
        touch = null;
        objetoActual = null;
        objetoColision = null;       
    }, false);


    function testPatrol(){

        
        for (let index = 0; index < animales.length; index++) {
            
            if(patron1[index].x == animales[index].x && patron1[index].y == animales[index].y && patron1[index].image == animales[index].image){                       
            }else{
                return false;
            }
            
        }    
    }

    

})
