document.addEventListener('DOMContentLoaded', () => {
    const formConsulta = document.getElementById('formConsulta');
    formConsulta.addEventListener('submit', consultarServicios);
});

function consultarServicios(event) {
    event.preventDefault();
    const cedulaConsulta = document.getElementById('cedulaConsulta').value;
    const servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    const resultadosConsulta = servicios.filter(servicio => servicio.cedula === cedulaConsulta);

    mostrarResultados(resultadosConsulta);
}

function mostrarResultados(servicios) {
    const tablaResultados = document.getElementById('tablaResultados').getElementsByTagName('tbody')[0];
    tablaResultados.innerHTML = ''; // Limpiar la tabla antes de cargar los datos

    servicios.forEach(servicio => {
        let fila = tablaResultados.insertRow();
        fila.insertCell().textContent = servicio.cedula;
        fila.insertCell().textContent = servicio.fechaIngreso;
        fila.insertCell().textContent = servicio.servicioPrestado;
        fila.insertCell().textContent = servicio.valorServicio;
        fila.insertCell().textContent = servicio.observaciones;
        let celdaEstado = fila.insertCell();
        celdaEstado.textContent = servicio.estado;
        celdaEstado.className = servicio.estado.replace(/ /g, '').toLowerCase(); // clase para el estado
    });

    if (servicios.length === 0) {
        let fila = tablaResultados.insertRow();
        let celda = fila.insertCell();
        celda.textContent = 'No se encontraron servicios para esta cédula.';
        celda.colSpan = 6;
    }
}