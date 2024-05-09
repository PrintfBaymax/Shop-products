const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const dataFilePath = '../front/src/assets/products.json';

app.use(bodyParser.json());
app.use(cors())
// Middleware pour autoriser les requêtes CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Endpoint pour récupérer tous les produits
app.get('/api/products', (req, res) => {
  console.log("GET NODE");
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(JSON.parse(data));
  });
});

// Endpoint pour ajouter un produit
app.post('/api/products', (req, res) => {
  console.log("ADD NODE");
  const newProduct = req.body;
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    const jsonData = JSON.parse(data);
    const products = jsonData.data;
    products.push(newProduct);
    const updatedJsonData = { data: products };
    fs.writeFile(dataFilePath, JSON.stringify(updatedJsonData, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.status(201).json(newProduct);
    });
  });
});

// Endpoint pour mettre à jour un produit
app.put('/api/products/:id', (req, res) => {
  console.log("UPDATE NODE");
  const productId = req.params.id;
  const updatedProduct = req.body;
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    console.log(productId)

    const jsonData = JSON.parse(data);
    const products = jsonData.data;
    const index = products.findIndex(product => product.id === parseInt(productId));
    console.log("index")
    console.log(index)
    if (index !== -1) {
      
      products[index] = updatedProduct;
      const updatedJsonData = { data: products };
      fs.writeFile(dataFilePath, JSON.stringify(updatedJsonData, null, 2), (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        res.json(updatedProduct);
      });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  });
});

// Endpoint pour supprimer un produit
app.delete('/api/products/:id', (req, res) => {
  console.log("DELETE NODE");

  const productId = req.params.id;

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la lecture du fichier' });
      return;
    }
    // Parser le contenu JSON
    const jsonData = JSON.parse(data);
    const products = jsonData.data;

    const indexToDelete = products.findIndex(product => product.id === parseInt(productId));
    if (indexToDelete !== -1) {
      products.splice(indexToDelete, 1);
    } else {
      console.error('L\'élément avec l\'ID spécifié n\'a pas été trouvé.');
      return;
    }
    const updatedJsonData = { data: products };
    fs.writeFile(dataFilePath, JSON.stringify(updatedJsonData , null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la lecture du fichier 2' });
        return;
      }
      res.json({ message: 'Product deleted successfully' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
