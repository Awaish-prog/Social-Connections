import React, { useState } from 'react';
import AddConnection from './Components/AddConnection';
import DegreeOfSeparation from './Components/DegreeOfSeparation';
import People from './Components/People';

export interface Person {
  id: number
  name: string,
  connections: number[]
}

const App: React.FC = () : JSX.Element => {
  const [people, setPeople] = useState<Array<Person>>([])
  const [uid, setUid] = useState<number>(1)
  const [connections, setConnections] = useState<Array<string>>([])

  const addPerson: Function = (name: string) : void => {
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

  const addConnection : Function = (personOne: string, personTwo: string): string => {
    let personOneId : number = 0;
    let personTwoId : number = 0;
    let personTwoRef : Person = {
      id: 0,
      name: "",
      connections: []
    };

    people.forEach(person => {
      if(person.name === personOne){
        personOneId = person.id;
      }
    })
    if(personOneId === 0){
      return `${personOne} is not present in list of people`
    }
    
    people.forEach(person => {
      if(person.name === personTwo){
        personTwoId = person.id;
        personTwoRef = person
      }
    })
    if(personTwoId === 0){
      return `${personTwo} is not present in list of people`
    }
    for(let i = 0; i < personTwoRef.connections.length; i++){
      if(personTwoRef.connections[i] === personOneId){
        return "These two are friends already."
      }
    }
    

    setPeople(prev => {
      prev.forEach(person => {
        if(personOneId === person.id){
          person.connections.push(personTwoId)
        }
      })
      return prev
    })
    setPeople(prev => {
      prev.forEach(person => {
        if(personTwoId === person.id){
          person.connections.push(personOneId)
        }
      })
      return prev
    })
    setConnections(prev => {
      return [...prev, `${personOne} and ${personTwo} are friends`]
    })
    return `Connection Added between ${personOne} and ${personTwo}`
  }

  const clearData : Function = () : void => {
    setConnections([])
    setPeople([])
    setUid(1)
  }

  return (
    <>
    <button onClick={() => {clearData()}} className='clearButton'>Clear Data</button>
    <People people={people} addPerson={addPerson} />
    <AddConnection addConnection={addConnection} connections={connections} />
    <DegreeOfSeparation people={people} />
    </>
  );
}

export default App;
