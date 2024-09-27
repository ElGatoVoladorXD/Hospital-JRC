document.getElementById('buscarPaciente').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('idPaciente').value;
    fetch('pacientes.xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "application/xml");
            const pacientes = xml.getElementsByTagName('Paciente');
            let encontrado = false;
            for(let paciente of pacientes){
                if(paciente.getElementsByTagName('ID')[0].textContent == id){
                    const nombre = paciente.getElementsByTagName('Nombre')[0].textContent;
                    const edad = paciente.getElementsByTagName('Edad')[0].textContent;
                    const genero = paciente.getElementsByTagName('Genero')[0].textContent;
                    const diagnostico = paciente.getElementsByTagName('Diagnostico')[0].textContent;
                    document.getElementById('resultadoPaciente').innerHTML = `
                        <h3>Detalles del Paciente</h3>
                        <p><strong>ID:</strong> ${id}</p>
                        <p><strong>Nombre:</strong> ${nombre}</p>
                        <p><strong>Edad:</strong> ${edad}</p>
                        <p><strong>Género:</strong> ${genero}</p>
                        <p><strong>Diagnóstico:</strong> ${diagnostico}</p>
                    `;
                    encontrado = true;
                    break;
                }
            }
            if(!encontrado){
                document.getElementById('resultadoPaciente').innerHTML = `<p>No se encontró ningún paciente con el ID ${id}.</p>`;
            }
        })
        .catch(error => console.error('Error:', error));
});
