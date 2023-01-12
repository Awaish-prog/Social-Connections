
import React, { useState } from "react";
import { Person } from "../App";
import { getSeparation } from "../HelperFunctions/getSeparationArray";

type PeopleArray = {
    people: Array<Person>,
}

const DegreeOfSeparation: React.FC<PeopleArray> = ({people} : PeopleArray) : JSX.Element => {
    const [personOne, setPersonOne] = useState<string>("")
    const [personTwo, setPersonTwo] = useState<string>("")
    const [displayMessage, setDisplayMessage] = useState<Array<string>>(["Write two names to find degree of separation"])
    const [separationArray, setSeparationArray] = useState<Array<Person>>([])
    
    const checkDegreeOfSeparation : Function = () => {
        if(personOne === personTwo){
            setPersonOne("")
            setPersonTwo("")
            setDisplayMessage(["Both names cannot be same"])
            return
        }
        setSeparationArray(getSeparation(people, personOne, personTwo));
        setDisplayMessage(["Result cannot be displayed because of one of these two reasons", "1. Atleast one entered name is not present in the list of people", "2. There is no connection between the two"])
        setPersonOne("")
        setPersonTwo("")
    }
    return (
    <>
        {
            separationArray.length === 0 ?
        
            displayMessage.map(message => {
                return <p key={0}>{message}</p>
            })
         :
        
            separationArray.map(person => {
                return <p key={person.id}>{person.name}</p>
            })
        
        }
        <form onSubmit={(e) => {
            e.preventDefault()
            checkDegreeOfSeparation()
        }}>
            <input type="text" value={personOne} onChange={(e) => setPersonOne(e.target.value)} placeholder="Name" required />
            <input type="text" value={personTwo} onChange={(e) => setPersonTwo(e.target.value)} placeholder="Name" required />
            <input type="submit" />
        </form>
        
    </>
    )
}

export default DegreeOfSeparation