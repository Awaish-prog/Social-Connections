import React, { useState } from "react";
import { Person } from "../App";

type PeopleArray = {
    people: Array<Person>
}

const People : React.FC<PeopleArray> = ({ people } : PeopleArray) => {

    return (
        <section>
            {
                people.map(person => {
                    return <p>{person.name}</p>
                })
            }
        </section>
    )
}

export default People;