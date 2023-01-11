import React, { useState } from 'react';
import AddConnection from './Components/AddConnection';
import People from './Components/People';

export interface Person {
  id: number
  name: string,
  connections: number[]
}

function App() {
  const [people, setPeople] = useState<Array<Person>>([])
  const [uid, setUid] = useState<number>(1)

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
      }
    })
    if(personTwoId === 0){
      return `${personTwo} is not present in list of people`
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
    return `Connection Added between ${personOne} and ${personTwo}`
  }

  return (
    <>
    <People people={people} addPerson={addPerson} />
    <AddConnection addConnection={addConnection} />
    </>
  );
}

export default App;
