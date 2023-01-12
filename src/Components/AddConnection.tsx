import React, { useState } from "react";

type AddConnectionFunction = {
    addConnection: Function,
    connections: Array<string>
}

const AddConnection : React.FC<AddConnectionFunction> = ({addConnection, connections} : AddConnectionFunction) : JSX.Element => {
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
        <section className="addConnection">
        <h1 className="connectionHeading">Connections</h1>
            <div className="connectionsDiv">
            {
                connections.length === 0 ? <p className="emptyMessage">There are no connections between an Person</p> :
                connections.map((connection, index) => {
                    return <p className="connection" key={index}>{connection}</p>
                })
            }
            </div>
        <form className="connectionForm" onSubmit={(e) => {
            e.preventDefault()
            submitConnection()
        }}>
            <input className="connectionInput" type="text" value={personOne} onChange={(e) => setPersonOne(e.target.value)} placeholder="Name" required />
            <input className="connectionInput" type="text" value={personTwo} onChange={(e) => setPersonTwo(e.target.value)} placeholder="Name" required />
            <input className="connectionSubmit" type="submit" value="Add Connection" />
        </form>
        <p className="connectionMessage">{connectionMessage}</p>
        </section>
    )
}

export default AddConnection