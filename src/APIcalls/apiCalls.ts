export const addPersonToServer : Function = async (uid: Number, personName: String) => {
    await fetch("http://localhost:3001/api/createPerson", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:  JSON.stringify({
            uid, personName
        }),
    })
}

export const addConnectionToServer : Function = async (uidOne: Number, uidTwo: Number) => {
    await fetch("http://localhost:3001/api/addConnection", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:  JSON.stringify({
            uidOne, uidTwo
        }),
    })
}

export const deleteAllPeople : Function = async () => {
    await fetch("http://localhost:3001/api/deleteAllPeople", {
        method: "DELETE",
    })
}

export const getAllPeopleFromServer : Function = async () => {
    let response = await fetch("http://localhost:3001/api/getAllPeople", {
        method: "GET",
    })
    const allPeople = await response.json()
    return allPeople.allPeople
}

