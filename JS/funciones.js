document.addEventListener('DOMContentLoaded', () => {
    cargarServicios();
    const formServicio = document.getElementById('formServicio');
    formServicio.addEventListener('submit', registrarServicio);
});

function registrarServicio(event) {
    event.preventDefault();
    const cedula = document.getElementById('cedula').value;
    const fechaIngreso = document.getElementById('fechaIngreso').value;
    const servicioPrestado = document.getElementById('servicioPrestado').value;
    const valorServicio = document.getElementById('valorServicio').value;
    const observaciones = document.getElementById('observaciones').value;

    const servicio = {
        cedula,
        fechaIngreso,
        servicioPrestado,
        valorServicio,
        observaciones,
        estado: 'Recibido' // Estado inicial
    };

    guardarServicio(servicio);
    cargarServicios();
}

function guardarServicio(servicio) {
    let servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    servicios.push(servicio);
    localStorage.setItem('servicios', JSON.stringify(servicios));
}

function cargarServicios() {
    const servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    const tablaServicios = document.getElementById('tablaServicios').getElementsByTagName('tbody')[0];
    tablaServicios.innerHTML = ''; // Limpiar la tabla antes de cargar los datos

    servicios.forEach((servicio, index) => {
        let fila = tablaServicios.insertRow();
        fila.insertCell().textContent = servicio.cedula;
        fila.insertCell().textContent = servicio.fechaIngreso;
        fila.insertCell().textContent = servicio.servicioPrestado;
        fila.insertCell().textContent = servicio.valorServicio;
        fila.insertCell().textContent = servicio.observaciones;
        let celdaEstado = fila.insertCell();
        celdaEstado.textContent = servicio.estado;
        celdaEstado.className = servicio.estado.replace(/ /g, '').toLowerCase(); // clase para el estado

        // Añadir botón para cambiar estado
        let celdaCambioEstado = fila.insertCell();
        let botonCambioEstado = document.createElement('button');
        botonCambioEstado.textContent = 'Cambiar Estado';
        botonCambioEstado.dataset.index = index;
        botonCambioEstado.onclick = function() {
            cambiarEstadoServicio(this.dataset.index);
        };
        celdaCambioEstado.appendChild(botonCambioEstado);
    });
}

function cambiarEstadoServicio(index) {
    let servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    if (index !== -1) {
        switch(servicios[index].estado) {
            case 'Recibido':
                servicios[index].estado = 'En Proceso';
                break;
            case 'En Proceso':
                servicios[index].estado = 'Listo para Entrega';
                break;
            case 'Listo para Entrega':
                servicios[index].estado = 'Entregado';
                break;
            default:
                alert('El servicio ya ha sido entregado.');
                return;
        }
        localStorage.setItem('servicios', JSON.stringify(servicios));
        cargarServicios(); // Actualizar tabla
    }
}