const express = require("express");
const cors = require("cors");

const {v4: uuidv4} = require('uuid');

const {validate} = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;
  const repositorie = {id: uuidv4(), title, url, techs, likes:0};

  repositories.push(repositorie);
  
  return response.json(repositorie)

});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const { title, techs, url} = request.body;
  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id)
  
  if(repositorieIndex < 0){
    return response.status(400).json({error:'Project not found!!'})
  };

  const repositorie = {id, title, techs, url};

  repositories[repositorieIndex] = repositorie;
  

  return response.json(repositorie)
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id)
  if(repositorieIndex < 0){
    return response.status(400).json({error:'Repositorie not found!!'})
  };
  repositories.splice(repositorieIndex, 1);

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id)
  
  if(repositorieIndex < 0){
   return response.status(400).json({error:'Repositorie not found!!'})
  } 
  
  repositories[repositorieIndex].likes++;
  
  return response.json(repositories[repositorieIndex])
  
});

module.exports = app;
