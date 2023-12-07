import {Server} from "./modules/server";
import {Memory_db} from "./modules/memory_db";
import {methods} from "./types/memoryStructure";
const serverInstance : Server = new Server({
    port: 80
});

const memoryInstance : Memory_db = new Memory_db({
    prevent_garbage_collection : true
})

serverInstance.initialize(memoryInstance).then(r => {
    console.log("Server Initialized. ✅")
})


/*
    Endpoints:
    [POST] /register_server -> {}
    [GET] /server_data -> {"jobid" : "jobId"}
    [GET] /available_servers
    [DELETE] /register_server -> {"reqId" : "ulid"}
*/