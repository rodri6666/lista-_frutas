// importar express bodyparser
const express = require('express');
const bodyParser = require('body-parser');
//inicializa
const app =express();

app.use(bodyParser.json());

//ruta de ejemplo
// app.get('/', (req, res) =>{
//     res.send("hola con nodejs");
// });
let items = ['manzana','papaya','limon'];
app.get('/', (req, res) =>{
    res.send("hola con nodejs");
});
//endpoint 1 / rutas GET
app.get('/items', (req, res) =>{
    res.status(200).json(items);
});
//endpoint 2 / rutas POST
app.post('/items', (req, res) =>{
    const fruta = req.body; 
    if (fruta) {
        items.push(fruta.item);
        // res.status(200).send(`Se agrego la fruta: ${fruta.item}`);
        res.status(200).send(`Se correctamente agrego la fruta: ${fruta.item} \n Lista: ${JSON.stringify(items)}`);
    } else {
        res.status(400).send("este item es invalido");
    }
});
//endpoint 3 / rutas PUT
app.put('/items/:index', (req, res) =>{
    const index = req.params.index; // Obtenemos el índice de los parámetros de la URL
    const newItem = req.body.item;  // Nuevo valor a asignar al elemento

    if (index >= 0 && index < items.length) {
        items[index] = newItem;
        res.status(200).send(`Se actualizó correctamente el item en el índice ${index} a: ${newItem} \nLista: ${JSON.stringify(items)}`);
    } else {
        res.status(400).send("El índice proporcionado es inválido");
    }
});
//endpoint 4 / rutas DELETE
app.delete('/items/:index', (req, res) =>{
    console.log(req.params['index']);
    const index = req.params.index;

    if (index >= 0 && index < items.length) {
        const deletedItem = items.splice(index, 1);
        res.status(200).send(`Se eliminó el item en el índice ${index}: ${deletedItem} \nLista actualizada: ${JSON.stringify(items)}`);
    } else {
        res.status(400).send("El índice proporcionado es inválido");
    }
});

//escuchar en el puerto 30000
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => { console.log(`Servidor en funcionando en puerto: ${PORT}`) });