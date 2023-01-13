import React, { useState, useEffect } from 'react';
import { addConnectionToServer, addPersonToServer, deleteAllPeople, getAllPeopleFromServer } from './APIcalls/apiCalls';
import AddConnection from './Components/AddConnection';
import DegreeOfSeparation from './Components/DegreeOfSeparation';
import People from './Components/People';
import { getPerson } from './HelperFunctions/getPerson';

export interface Person {
  id: number,
  name: string,
  connections: number[]
}
interface Response {
  uid: number,
  name: string,
  connections: number[]
}

interface AllPeople {
  allPeople: Array<Person>
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
    for(let i = 0; i < people.length; i++){
      if(newPerson.name === people[i].name){
        return
      }
    }
    setPeople((prev) => {
      return [...prev, newPerson]
    })
    setUid((prev) => {
      return prev + 1
    })
    addPersonToServer(newPerson.id, newPerson.name)
  }

  const addConnection : Function = (personOne: string, personTwo: string): string => {
    let personOneId : number = 0;
    let personTwoId : number = 0;
    let personTwoRef : Person = {
      id: 0,
      name: "",
      connections: []
    };
    console.log(getPerson(people, 1));
     
    people.forEach(person => {
      if(person.name === personOne){
        personOneId = person.id;
      }
      if(person.name === personTwo){
        personTwoId = person.id;
        personTwoRef = person
      }
    })
    if(personOneId === 0){
      return `${personOne} is not present in list of people`
    }
    
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
    addConnectionToServer(personOneId, personTwoId)
    return `Connection Added between ${personOne} and ${personTwo}`
  }

  const clearData : Function = () : void => {
    setConnections([])
    setPeople([])
    setUid(1)
    deleteAllPeople()
  }

  const updateConnections : Function = (allPeople: Array<Person>) : void => {
    const connectionsArray : Array<string> = []
    allPeople.forEach(person => {
      person.connections.forEach(connection => {
        const connectionName : string = getPerson(allPeople, connection).name
          if(!connectionsArray.includes(`${person.name} and ${connectionName} are friends`) && !connectionsArray.includes(`${connectionName} and ${person.name} are friends`)){
            connectionsArray.push(`${person.name} and ${connectionName} are friends`)
          }
      })
    });
    
    
    setConnections(connectionsArray)
  }

  const getAllPeople : Function = async () => {
    const allPeople : Array<Person> = await getAllPeopleFromServer()
    setPeople(allPeople)
    updateConnections(allPeople)
    setUid(allPeople.length + 1)
  }

  useEffect(() => {
    getAllPeople()
  }, [])

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
