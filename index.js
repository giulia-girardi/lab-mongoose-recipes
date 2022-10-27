const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    
    const newRecipe = {
      title: 'Tiramisu', 
      level: 'Amateur Chef', 
      ingredients: ['eggs', 'cacao', 'sugar', 'savoiardi'],
      cuisine: 'Italian', 
      dishType: 'dessert', 
      duration: 30,
    }
    Recipe.create(newRecipe) 
    Recipe.insertMany(data)
    Recipe.findOneAndUpdate({title: 'Rigatoni alla Genoves'}, {duration: 100})
    .then(console.log('Updated successfully'))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
