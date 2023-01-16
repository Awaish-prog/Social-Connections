const url = "https://social-connections-server.vercel.app"


export const addPersonToServer : Function = async (uid: Number, personName: String) => {
    await fetch(`${url}/api/createPerson`, {
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
    await fetch(`${url}/api/addConnection`, {
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
    await fetch(`${url}/api/deleteAllPeople`, {
        method: "DELETE",
    })
}

export const getAllPeopleFromServer : Function = async () => {
    let response = await fetch(`${url}/api/getAllPeople`, {
        method: "GET",
    })
    const allPeople = await response.json()
    return allPeople.allPeople
}

