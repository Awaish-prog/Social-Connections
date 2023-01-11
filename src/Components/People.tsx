import React, { useState } from "react";
import { Person } from "../App";

type PeopleArray = {
    people: Array<Person>,
    addPerson: Function
}

const People : React.FC<PeopleArray> = ({ people, addPerson } : PeopleArray) : JSX.Element => {
    const [personName, setPersonName] = useState<string>("")

    const submitPersonName : Function = () : void => {
        addPerson(personName)
        setPersonName("")
    }

    return (
        <section>
            {
                people.map(person => {
                    return <p key={person.id}>{person.name}</p>
                })
            }
            <form onSubmit={(e) => {
                e.preventDefault()
                submitPersonName()
            }}>
                <input value={personName} onChange={(e) => setPersonName(e.target.value)} type="text" placeholder="Name" required />
                <input type="submit" />
            </form>
        </section>
    )
}

export default People;