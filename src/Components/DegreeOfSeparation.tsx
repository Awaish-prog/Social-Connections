
import React, { useState } from "react";
import { Person } from "../App";
import { getSeparation } from "../HelperFunctions/getSeparationArray";

type PeopleArray = {
    people: Array<Person>,
}

const DegreeOfSeparation: React.FC<PeopleArray> = ({people} : PeopleArray) : JSX.Element => {
    const [personOne, setPersonOne] = useState<string>("")
    const [personTwo, setPersonTwo] = useState<string>("")
    const [separationArray, setSeparationArray] = useState<Array<Person>>([])

    const checkDegreeOfSeparation : Function = () => {
        setSeparationArray(getSeparation(people, personOne, personTwo));
        setPersonOne("")
        setPersonTwo("")
    }
    return (
    <>
        <form onSubmit={(e) => {
            e.preventDefault()
            checkDegreeOfSeparation()
        }}>
            <input type="text" value={personOne} onChange={(e) => setPersonOne(e.target.value)} placeholder="Name" required />
            <input type="text" value={personTwo} onChange={(e) => setPersonTwo(e.target.value)} placeholder="Name" required />
            <input type="submit" />
        </form>
        {
            separationArray.map(person => {
                return <p key={person.id}>{person.name}</p>
            })
        }
    </>
    )
}

export default DegreeOfSeparation