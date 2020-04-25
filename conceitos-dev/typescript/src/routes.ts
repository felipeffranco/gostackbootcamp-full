import { Request, Response } from "express";
import createUser from './services/CreateUser';

// string, number, boolean, object, Array
// interfaces definir tipagem de conjunto de dados (objetos, vetores) 

export function helloWorld(request: Request, response: Response) {
  const user = createUser({
    email: 'felipe@hotmail.com',
    password: '123456',
    techs: [
      'Node.js', 
      'ReactJS', 
      'React Native',
      { title: 'JavaScript', experience: 100 },
    ],
  });

  return response.json({ message: 'Hello World' });
}