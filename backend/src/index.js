//criar um servidor HTTP
const express = require('express');
const { uuid, isUuid } = require('uuidv4');

const app = express();

//use é para adicionar algum tipo de função e tem que passar por ela
app.use(express.json());

/**
 * Métodos HTTP
 * 
 * GET: buscar informações do back-end
 * POST: criar uma informação do back-end
 * PUT/PATCH: alterar uma informação no back-end (PUTZ todos dados e PATCH um dado específico)
 * DELETE: deletar uma informação no back-end
 */

/**
 * Tipos de parâmetros:
 * 
 * Query Params: Filtros e paginação
 * Route Params: Identificar recursos (atualizar/deletar)
 * Request Body: Conteúdo na hora de criar/editar um recurso (JSON)
 */

/**
 * Middleware: MAIOR CONCEITO EXPRESS (EXPRESSO É BASEADO EM MIDDLEWARES)
 * 
 * Interceptador de requisições -> interromper totalmente a requisição ou alterar dados da requisição.
 * Recebe a requisição (request), resposta (response) ou prosseguir para o próximo (netx)
 */

const projects = [];

function logRequests(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel);

  next(); //Próximo middleware, sem interromper next

  console.timeEnd(logLabel);
} 

function validateProjectId(request, response, next) { 
  const { id } = request.params;

  if(!isUuid(id)) {
    return response.status(400).json({ error: 'Invalid project ID.' });
  }

  return next();
}

app.use(logRequests);
app.use('/projects/:id', validateProjectId);
//caso queira aplicar os middlewares somente em um route, comentar linha acima => app.get('/projects', logRequests, (request, response) => {
app.get('/projects', (request, response) => {
  const { title } = request.query;

  const results = title
    ? projects.filter(project => project.title.includes(title))
    : projects;
  
  return response.json(results);
});

app.post('/projects', (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuid(), title, owner };

  projects.push(project);

  return response.json(project);
});

app.put('/projects/:id', (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex(project => project.id === id);

  if(projectIndex < 0) { 
    return response.status(400).json({ error: "Project not found." })
  }

  const project = { 
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;

  return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex(project => project.id === id);

  if(projectIndex < 0) { 
    return response.status(400).json({ error: "Project not found." })
  }
  
  projects.splice(projectIndex, 1);

  return response.status(204).send();
});

app.listen(3333, () => {
  console.log('Back-end started! ❤')  
});

