import { Person } from "../App";
import { getPerson } from "./getPerson";


const getSeparationHelper : Function = (seperationArray: Array<Person>, id: number, targetId: number, visitedIds: Array<number>, people: Array<Person>, seperationArrayCollection: Array<Array<Person>>) : void => {
    const currentPerson = getPerson(people, id)
    if(id === targetId){
        seperationArray.push(currentPerson)
        visitedIds.push(id)
        seperationArrayCollection.push([...seperationArray])
        return
    }
    visitedIds.push(id)
    seperationArray.push(currentPerson)
    for(let i = 0; i < currentPerson.connections.length; i++){
        if(!visitedIds.includes(currentPerson.connections[i])){
            getSeparationHelper(seperationArray, currentPerson.connections[i], targetId, visitedIds, people, seperationArrayCollection)
            seperationArray.pop()
            visitedIds.pop()
            if(targetId === currentPerson.connections[i]){
                return
            }
        }
    }
   
}

export const getSeparation : Function = (people : Array<Person>, personOne: string, personTwo: string) : Array<Person> => {
    let personOneId : number = 0;
    let personTwoId : number = 0;
    let seperationArray : Array<Person> = []
    let visitedIds : Array<number> = []
    let seperationArrayCollection : Array<Array<Person>> = []
    people.forEach(person => {
        if(person.name === personOne){
          personOneId = person.id;
        }
      })
      if(personOneId === 0){
        return seperationArray
      }
      
      people.forEach(person => {
        if(person.name === personTwo){
          personTwoId = person.id;
        }
      })
      if(personTwoId === 0){
        return seperationArray
      }
      getSeparationHelper(seperationArray, personOneId, personTwoId, visitedIds, people, seperationArrayCollection)
      if(seperationArrayCollection.length === 0){
        return []
      }
      seperationArray = seperationArrayCollection[0]
      seperationArrayCollection.forEach(collection => {
        if(collection.length < seperationArray.length){
            seperationArray = collection
        }
      })
      
      return seperationArray
}