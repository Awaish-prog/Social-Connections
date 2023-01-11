import React, { useState } from "react";
import { Person } from "../App";

type PeopleArray = {
    people: Array<Person>,
    addPerson: Function
}

const People : React.FC<PeopleArray> = ({ people, addPerson } : PeopleArray) => {
    const [personName, setPersonName] = useState<string>("")

    const submitPersonName : Function = () => {
        addPerson(personName)
        setPersonName("")
    }

    return (
        <section>
            {
                people.map(person => {
                    return <p>{person.name}</p>
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