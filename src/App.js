import React, {useState , useEffect} from "react";
const { uuid } = require("uuidv4");
import "./styles.css";

import api from "./services/api";

/*
id: repositories[repIndex].id,
      title,
      url,
      techs,
      likes
*/

function App() {
  async function handleAddRepository() {
    // função para adicionar repositorio
    const response = await api.post('repositories',{
      id: uuid(),
      title: `Projeto ${Date.now()}`,
      url: "http://www.google.com.br",
      techs: ["ReactJS","NodeJS","Power BI"],
    });

    const newRepository = response.data;

    setRepository([...repositories,newRepository]);
  }

  async function handleRemoveRepository(id) {
    // função para deletar
    const base_url = 'repositories/'+id;

    const response = api.delete(base_url);    
    
    setRepository (
      repositories.filter((repository) => repository.id !== id)
    );

  }

  


  const [repositories, setRepository] = useState([]);

  useEffect(() =>{
    api.get('repositories').then(response => {
      setRepository(response.data);
      console.log(response);
    });

  },[]);



  return (
    
    <div>
      <ul data-testid="repository-list">
        
          {repositories.map(repositories => <li key={repositories.id}>{repositories.title}
          <button onClick={() => handleRemoveRepository(repositories.id)}>
            Remover
          </button>          
        </li>)}

          
        

        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
