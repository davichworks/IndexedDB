async function readDataFromDB() {
    const db = await openDatabase();
    const transaction = db.transaction(['formData'], 'readonly');
    const store = transaction.objectStore('formData');

    return new Promise((resolve, reject) => {
        const request = store.getAll();

        request.onerror = () => {
            reject('Error reading the data');
        };

        request.onsuccess = () => {
            resolve(request.result);
        };
    });
}

async function displayData() {
    const data = await readDataFromDB();
    const container = document.getElementById('salida');
    
    data.forEach(item => {
        // Crear un div para cada elemento

        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `<strong>Mascota</strong>:${item.nombremascota}<br><br> <strong>Cliente:</strong>${item.nombredueño}<br><br> <strong>Telefono</strong>:${item.telefono}<br><br> <strong>Fecha:</strong>${item.fecha}<br><br> <strong>Hora</strong>:${item.hora}<br><br> <strong>Sintomas:</strong>${item.sintomas}<br><br> `;
        
        // Crear un botón para cada elemento
        const button = document.createElement('button');
        const ite = item.id
        button.innerText = 'Borrar';
        button.onclick = () => {
            // Aquí puedes poner el código que quieras que se ejecute al hacer clic en el botón
            const idToDelete = ite;
    deleteFromDB(idToDelete);
        };
        
        // Añadir el elemento y el botón al contenedor
        itemDiv.appendChild(button);
        container.appendChild(itemDiv);
        
        
    });

}



// Llama a la función para actualizar el textarea cuando la página se c
window.onload = displayData;
