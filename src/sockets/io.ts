import { Socket } from "socket.io";

export const handleSocketConnection = (client:Socket) => {
    console.log(`[socket.io] New Connection ${client.id}`)
    client.on("disconnect", ()=>{
        console.log("Bye bye user")
    })
    client.on("newVote",()=>{
        console.log("[NEW VOTE] has accured in the system")
        // go tell all other connected clients to re-render their data
    })
};
