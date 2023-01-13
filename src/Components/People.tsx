import React, { useState } from "react";
import { Person } from "../App";
import "../CSS/global.css"

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
        <section className="people">
            <h1 className="peopleHeading">List of Added People</h1>
            <div className="personNames">
            {
                people.length === 0 ? <p className="emptyMessage">There are no people added in the list.</p> :
                people.map((person, index) => {
                    return <p className="personName" key={index}>{person.name}</p>
                })
            }
            </div>
            <form className="peopleForm" onSubmit={(e) => {
                e.preventDefault()
                submitPersonName()
            }}>
                <input className="nameInput" value={personName} onChange={(e) => setPersonName(e.target.value)} type="text" placeholder="Name" required />
                <input className="submitButton" type="submit" value="Add Person" />
            </form>
            <p className="personMessage">Add a person to list of people</p>
        </section>
    )
}

export default People;