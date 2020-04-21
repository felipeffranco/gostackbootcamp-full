import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';
import backgroundImage from './assets/background.jpg';

import Header from './components/Header';

/**
 * DOMINAR OS 3 CONCEITOS PARA CRIAR APP COM REACT
 * Componente
 * Propriedade: informação que pode passar de pai para filho.
 * Estado & Imutabilidade (garantir performance mesmo com muitos dados)
 */

//primeiro component no React, sempre primeira letra maiúscula
//utilizando conteúdo dentro do Header
function App() {
  //useState retorna um array com 2 posições
  // 1. Variável com o seu valor inicial
  // 2. Função para atualizarmos esse valor
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects').then(response => { 
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject() { 
    //projects.push(`Novo projeto ${Date.now()}`);

    //setProjects([...projects, `Novo projeto ${Date.now()}`]);
    //console.log(projects);

    const response = await api.post('projects', {
      "title": `Novo projeto ${Date.now()}`,
      "owner": "Felipe Franco"
    });

    const project = response.data;

    setProjects([... projects, project]);
  }

  return (
    <>
      <Header title="Projects" />

      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>

      <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
    </>
  )
}

export default App;