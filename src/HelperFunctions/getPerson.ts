import { Person } from "../App";

export const getPerson : Function = (people: Array<Person>, id: number) => {
    for(let i = 0; i < people.length; i++){
        if(people[i].id === id){
            return people[i]
        }
    }
}