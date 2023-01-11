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

  return (
    <People people={people} />
  );
}

export default App;
