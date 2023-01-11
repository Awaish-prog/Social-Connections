import React, { useState } from 'react';
import People from './Components/People';

export interface Person {
  id: number
  name: string,
  connections: number[]
}

function App() {
  const [people, setPeople] = useState<Array<Person>>([])
  const [uid, setUid] = useState<number>(1)

  const addPerson: Function = (name: string) => {
    const newPerson : Person = {
      id: uid,
      name: name,
      connections: []
    }
    setPeople((prev) => {
      return [...prev, newPerson]
    })
    setUid((prev) => {
      return prev + 1
    })
  }

  return (
    <People people={people} addPerson={addPerson} />
  );
}

export default App;
