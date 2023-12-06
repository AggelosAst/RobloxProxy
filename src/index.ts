import {Server} from "./modules/server";

const serverInstance :Server = new Server({
    port: 80
});

serverInstance.initialize().then(r => {
    console.log("Server Initialized. ✅")
})