import React, { useState } from "react";

type AddConnectionFunction = {
    addConnection: Function
}

const AddConnection : React.FC<AddConnectionFunction> = ({addConnection} : AddConnectionFunction) : JSX.Element => {
    const [personOne, setPersonOne] = useState<string>("")
    const [personTwo, setPersonTwo] = useState<string>("")
    const [connectionMessage, setConnectionMessage] = useState<string>("Add a connection")

    const submitConnection : Function = () : void => {
        if(personOne === personTwo){
            setConnectionMessage("Both persons can't be same");
            return
        }
        const val : string = addConnection(personOne, personTwo)
        setPersonOne("")
        setPersonTwo("")
        setConnectionMessage(val)
    }

    return (
        <section>
        <form onSubmit={(e) => {
            e.preventDefault()
            submitConnection()
        }}>
            <input type="text" value={personOne} onChange={(e) => setPersonOne(e.target.value)} placeholder="Name" required />
            <input type="text" value={personTwo} onChange={(e) => setPersonTwo(e.target.value)} placeholder="Name" required />
            <input type="submit" />
        </form>
        <p>{connectionMessage}</p>
        </section>
    )
}

export default AddConnection