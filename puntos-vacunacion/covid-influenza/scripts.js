$(document).ready(function() {
    // Leer y cargar el archivo JSON
    $.getJSON('datos-covid-influenza-puntos-vacunacion.json', function(data) {
      // Generar opciones de filtro por regiones y comunas
      var regiones = [];
      var comunas = [];
      $.each(data, function(index, punto) {
        if (!regiones.includes(punto.REGION)) {
          regiones.push(punto.REGION);
          $('#filtroRegion').append($('<option>').text(punto.REGION).val(punto.REGION));
        }
        if (!comunas.includes(punto.COMUNA)) {
          comunas.push(punto.COMUNA);
          $('#filtroComuna').append($('<option>').text(punto.COMUNA).val(punto.COMUNA));
        }
      });
  
      // Mostrar todos los puntos de vacunación al cargar la página
      mostrarPuntosVacunacion(data);
  
      // Evento de cambio en el filtro de regiones
      $('#filtroRegion, #filtroComuna').change(function() {
        var regionSeleccionada = $('#filtroRegion').val();
        var comunaSeleccionada = $('#filtroComuna').val();
        var puntosFiltrados = data.filter(function(punto) {
          return (punto.REGION === regionSeleccionada || regionSeleccionada === '') &&
                 (punto.COMUNA === comunaSeleccionada || comunaSeleccionada === '');
        });
        mostrarPuntosVacunacion(puntosFiltrados);
      });
    });
  
    // Función para mostrar los puntos de vacunación en la tabla
    function mostrarPuntosVacunacion(puntos) {
      var tabla = $('#tablaPuntosVacunacion tbody');
      tabla.empty();
      $.each(puntos, function(index, punto) {
        tabla.append('<tr><td>' + punto['NOMBRE DEL PUNTO'] + '</td><td>' + punto['DIRECCION DEL PUNTO'] + '</td><td>' + punto['CAMPAÑA ASOCIADA'] + '</td><td>' + punto['HORARIO HÁBIL'] + '</td></tr>');
      });
    }
  });s
  