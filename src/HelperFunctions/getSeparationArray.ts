import { Person } from "../App";
import { getPerson } from "./getPerson";


const getSeparationHelper : Function = (seperationArray: Array<Person>, id: number, targetId: number, visitedIds: Array<number>, people: Array<Person>) : void => {
    if(id === targetId){
        seperationArray.push(getPerson(people, id))
        visitedIds.push(id)
        return
    }
    if(visitedIds[visitedIds.length - 1] === targetId){
        return
    }
    visitedIds.push(id)
    seperationArray.push(getPerson(people, id))
    getPerson(people, id).connections.forEach((connection : number) => {
        if(!visitedIds.includes(connection)){
            getSeparationHelper(seperationArray, connection, targetId, visitedIds, people)
        }
    })
}

export const getSeparation : Function = (people : Array<Person>, personOne: string, personTwo: string) : Array<Person> => {
    let personOneId : number = 0;
    let personTwoId : number = 0;
    let seperationArray : Array<Person> = []
    let visitedIds : Array<number> = []
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
      getSeparationHelper(seperationArray, personOneId, personTwoId, visitedIds, people)
      if(seperationArray[seperationArray.length - 1].id !== personTwoId){
        seperationArray = []
      }
      return seperationArray
}