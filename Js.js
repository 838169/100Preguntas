const overlay = document.getElementById('overlay');
const threshold = 800; // Cambia este valor al tamaño que desees

function toggleOverlay() {
  if (window.innerWidth > threshold) {
    overlay.style.display = 'block';
  } else {
    overlay.style.display = 'none';
  }
}

// Ejecuta la función al cargar y al redimensionar la ventana
window.addEventListener('load', toggleOverlay);
window.addEventListener('resize', toggleOverlay);

const strings = ['Princesita', 'Anis', 'Flaquita', 'Cielo', 'Corazón', 'Preciosa', 'Vida', 'Niña'];

function getRandomString(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

// Inicializar Typed.js
var typed = new Typed('.title', {
    strings: [
        getRandomString(strings), 
        getRandomString(strings),
        getRandomString(strings),
        getRandomString(strings)
    ],
    typeSpeed: 100,
    backSpeed: 10,
    backDelay: 5000,
    loop: true
});


//Para los corazones del click
document.addEventListener('click', function(event) {
    let heart = document.createElement('span');
    heart.classList.add('heart');
    heart.textContent = '💕';
    
    heart.style.left = `${event.pageX}px`;
    heart.style.top = `${event.pageY}px`;
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 1000);
});


document.addEventListener('DOMContentLoaded', function() {
    (function() {
        emailjs.init('RVt34sDSeGMt3RSrE');
    })();
    
    document.querySelector('.btn').addEventListener('click', function(e) {
        e.preventDefault(); 

        let respuestas = {};
        let allFieldsFilled = true; 

        for (let i = 1; i <= 100; i++) {
            let respuesta = document.getElementById(`respuesta${i}`)?.value; 
            respuestas[`respuesta${i}`] = respuesta || ''; 
            

            if (respuesta === '') {
                allFieldsFilled = false; 
            }
        }

        // Si algún campo está vacío, muestra un mensaje y no envía
        if (!allFieldsFilled) {
            swal({
                title: "Campo vacío",
                text: "Hermosa, se te olvida responder algunas preguntas 🥹.",
                icon: "warning",
                button: {
                    text: "Entendido",
                    className: "custom-btn"
                }
            });
            return; // Detiene la ejecución si hay campos vacíos
        }

        // Parámetros que se enviarán al servicio de EmailJS
        const params = {
            ...respuestas
        };

        const sendButton = document.querySelector('.btn');
        sendButton.disabled = true;
        sendButton.textContent = "Enviando..."; 

        // Enviar el correo utilizando EmailJS
        emailjs.send('service_d3f1uso', 'template_0qz9ss8', params)
            .then(function(response) {
                swal("¡Mensaje enviado!", "¡Gracias por responder, mi vida te amo 🥺!", "success");
                // Limpia los campos del formulario
                for (let i = 1; i <= 100; i++) {
                    document.getElementById(`respuesta${i}`).value = '';
                }
                sendButton.disabled = false; 
                sendButton.textContent = "Enviar Respuestas"; 
            }, function(error) {
                swal({
                  title: "Error",
                  text: "Error al enviar las respuestas. Inténtalo más tarde.",
                  icon: "error",  
                  button: {
                    text: "Entendido",
                    className: "custom-btn"
                  }
                });
                console.log('Error: ', error);
                sendButton.disabled = false; 
                sendButton.textContent = "Enviar Respuestas"; 
            });
    });
});


