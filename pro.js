function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('myDatabase', 1);

        request.onerror = () => {
            reject('Error opening the database');
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore('formData', { keyPath: 'id', autoIncrement: true });
        };
    });
}

// Función para agregar datos al IndexedDB
async function addDataToDB(nombremascota, nombredueño, telefono, fecha, hora, sintomas) {
    const db = await openDatabase();
    const transaction = db.transaction(['formData'], 'readwrite');
    const store = transaction.objectStore('formData');

    return new Promise((resolve, reject) => {
        const request = store.add({ nombremascota, nombredueño, telefono, fecha, hora, sintomas });

        request.onerror = () => {
            reject('Error saving the data');
        };

        request.onsuccess = () => {
            resolve('Data saved successfully');
        };
    });
}

// Escucha el evento de envío del formulario
document.getElementById('myForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const name1 = document.getElementById('nombremascota').value;
    const name2 = document.getElementById('nombredueño').value;
    const telefono = document.getElementById('telefono').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const sintomas = document.getElementById('sintomas').value;

    try {
        const response = await addDataToDB(name1, name2, telefono, fecha, hora, sintomas);
        console.log(response);
    } catch (error) {
        console.error('There was an error:', error);
    }
});

function deleteFromDB(id) {
    const dbRequest = indexedDB.open('myDatabase');

    dbRequest.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(['formData'], 'readwrite');
        const objectStore = transaction.objectStore('formData');
        
        const deleteRequest = objectStore.delete(id);

        deleteRequest.onsuccess = function() {
            console.log('Elemento borrado exitosamente!');
        };

        deleteRequest.onerror = function() {
            console.error('Hubo un error al borrar el elemento.');
        };
    };

    dbRequest.onerror = function() {
        console.error('Error al abrir la base de datos.');
    };
}