
import React, { useState } from "react";
import { Person } from "../App";
import { getSeparation } from "../HelperFunctions/getSeparationArray";

type PeopleArray = {
    people: Array<Person>,
}

const DegreeOfSeparation: React.FC<PeopleArray> = ({people} : PeopleArray) : JSX.Element => {
    const [personOne, setPersonOne] = useState<string>("")
    const [personTwo, setPersonTwo] = useState<string>("")
    
    const [separationArrayCollection, setSeparationArrayCollection] = useState<Array<Array<Person>>>([])
    
    const checkDegreeOfSeparation : Function = () => {
        if(personOne === personTwo){
            setPersonOne("")
            setPersonTwo("")
            return
        }
        setSeparationArrayCollection(getSeparation(people, personOne, personTwo));
        
        setPersonOne("")
        setPersonTwo("")
    }
    return (
    <section className="degreeOfSeparation">
        <h1 className="separationHeading">Degrees of Separation</h1>
        <>
        
        {
           
            separationArrayCollection.length === 0 ? <p className="enterNames">Please enter names of 2 distinct people who are connected either directy or indirectly</p> :
        separationArrayCollection.map(separationArray => {
            return <div className="separationsDiv">{
            separationArray.map((person, index) => {
                return (
                <div key={person.id}>
                    <span className="separation">{person.name}</span>
                    {index === separationArray.length - 1 ? null :<span className="symbol">&gt;</span>}
                </div>
                )
            })
            }</div>
        })    
        }
        <form className="seperationForm" onSubmit={(e) => {
            e.preventDefault()
            checkDegreeOfSeparation()
        }}>
            <input type="text" className="separationInput" value={personOne} onChange={(e) => setPersonOne(e.target.value)} placeholder="Name" required />
            <input type="text" className="separationInput" value={personTwo} onChange={(e) => setPersonTwo(e.target.value)} placeholder="Name" required />
            <input className="separationSubmit" type="submit" />
        </form>
        </>
    </section>

    )
}

export default DegreeOfSeparation