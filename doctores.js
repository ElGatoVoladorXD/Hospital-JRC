document.getElementById('buscarMedico').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('idMedico').value;
    fetch('doctores.json')
        .then(response => response.json())
        .then(data => {
            const medicos = data.Medicos;
            const medico = medicos.find(m => m.ID == id);
            if(medico){
                document.getElementById('resultadoMedico').innerHTML = `
                    <h3>Detalles del Médico</h3>
                    <p><strong>ID:</strong> ${medico.ID}</p>
                    <p><strong>Nombre:</strong> ${medico.Nombre}</p>
                    <p><strong>Especialidad:</strong> ${medico.Especialidad}</p>
                    <p><strong>Teléfono:</strong> ${medico.Telefono}</p>
                    <p><strong>Correo:</strong> ${medico.Correo}</p>
                `;
            } else {
                document.getElementById('resultadoMedico').innerHTML = `<p>No se encontró ningún médico con el ID ${id}.</p>`;
            }
        })
        .catch(error => console.error('Error:', error));
});
