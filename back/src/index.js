const express = require('express');  
const dotenv = require('dotenv');  
const countriesRoutes = require('./routes'); 
const cors = require("cors");
const { fetchCountryData } = require('./models/countriesModels');

dotenv.config();  
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use('/countries', countriesRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
