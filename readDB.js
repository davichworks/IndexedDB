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

async function updateTextarea() {
    try {
        const data = await readDataFromDB();
        const output = data.map(item => `nombremascota: ${item.nombremascota}, nombredueño: ${item.nombredueño}, telefono: ${item.telefono},fecha: ${item.fecha}, hora: ${item.hora}, sintomas: ${item.sintomas} `).join('\n');
        document.getElementById('salida').textContent = output;
    } catch (error) {
        console.error('There was aaaan error:', error);
    }
}

// Llama a la función para actualizar el textarea cuando la página se carga
window.onload = updateTextarea;
