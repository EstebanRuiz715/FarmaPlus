const elementosAnimados = document.querySelectorAll(
    ".animar-izquierda, .animar-arriba"
);


const observador = new IntersectionObserver(

    function(entradas) {

        entradas.forEach(function(entrada) {

            if (entrada.isIntersecting) {

                entrada.target.classList.add("visible");

                observador.unobserve(entrada.target);

            }

        });

    },

    {
        threshold: 0.2
    }

);


elementosAnimados.forEach(function(elemento) {

    observador.observe(elemento);

});