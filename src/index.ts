import {Server} from "./modules/server";
import {Memory_db} from "./modules/memory_db";
import {methods} from "./types/memoryStructure";
const serverInstance : Server = new Server({
    port: 80
});

const memoryInstance : Memory_db = new Memory_db({
    prevent_garbage_collection : true
})

serverInstance.initialize().then(r => {
    console.log("Server Initialized. ✅")
    memoryInstance.appendData("http", methods.GET, "Aggelos", {});
})