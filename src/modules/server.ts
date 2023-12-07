import {proxyOptions} from "../types/proxyOptions";
import express, {Express, Response, Request, NextFunction} from "express";
import {result} from "../types/result";
import {Memory_db} from "./memory_db";
import {MemoryOptions} from "../types/memoryOptions";
import {databaseResult} from "../types/databaseResult";
import {MemoryData} from "./memoryData";
import {methods} from "../types/memoryStructure";
import {ulid} from "ulid";
export class Server {
    private readonly options : proxyOptions;
    private router!: express.Router;
    private app!: Express;
    private  memoryInstance! : Memory_db;
    public constructor(options : proxyOptions) {
        this.options = options;
    }
    public async initialize(memoryInstance : Memory_db) : Promise<result> {
        return new Promise<result>(async (resolve, reject) => {
            this.memoryInstance = memoryInstance;
            this.app = express();
            this.router = express.Router({
                caseSensitive: true,
                strict: true
            })
            this.router.use("/host", express.static("./src/Host"));
            this.app.use(express.json());
            this.app.disable("x-powered-by");
            this.app.use(this.router);
            try {
                await this.registerAPIS();
                this.app.listen(this.options.port);
            } catch (e : any) {
                reject({
                    error : e.message
                })
            }
            resolve({
                result : "Set"
            })
        })
    }
    private async registerAPIS() : Promise<void> {
        this.router.delete("/register_server", async (req: Request, res: Response, next: NextFunction) => {
            const reqId: string = req.body["reqId"];
            if (!reqId) {
                return res.status(400).json({
                    error: "Missing reqId"
                })
            }
            try {
                const result: databaseResult<MemoryData[]> = await this.memoryInstance.getData(undefined, reqId);
                const deleteres : databaseResult<result> = await this.memoryInstance.removeData(undefined, reqId);
                return res.status(200).json({
                    message: "Removed",
                    data: deleteres.result.data
                })
            } catch (e: any) {
                return res.status(500).json({
                    error: "Doesnt exist"
                })
            }
        })
        this.router.post("/register_server", async (req: Request, res: Response, next: NextFunction) => {
            const jobId: string = req.body["jobId"];
            const uri: string = req.body["uri"];
            const method: methods = req.body["method"]; //TODO: Make it check if its a valid enum
            const requester: string = req.body["requester"];
            if (!jobId) {
                return res.status(400).json({
                    error: "Missing JobId"
                })
            }
            if (!methods[method]) {
                return res.status(400).json({
                    error: `Invalid method ${method}. Method must be of ${methods}`
                })
            }
            try {
                const result: databaseResult<MemoryData[]> = await this.memoryInstance.getData(undefined, ulid()); //TODO: Fix this code
                return res.status(500).json({
                    error: "Already exists"
                })
            } catch (e: any) {
                try {
                    await this.memoryInstance.appendData(uri, method, requester, jobId, ulid())
                    return res.status(200).json({
                        message: "Success"
                    })
                } catch (e: any) {
                    console.log(`Couldnt appendData ⚠️`)
                    return res.status(500).json({
                        error: e.error
                    })
                }
            }
        })
        this.router.get("/available_servers", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const servers : result = await this.memoryInstance.getAllServers();
                return res.status(200).json({
                    data: servers.result
                })
            } catch (e : any) {
                console.log("Error occured while fetchign all servers");
                return res.status(500).json({
                    error: e
                })
            }
        })
            this.router.get("/server_data", async (req: Request, res: Response, next: NextFunction) => {
            const jobId: string = req.body["jobId"];
            if (!jobId) {
                return res.status(400).json({
                    error: "Missing JobId"
                })
            }
            try {
                const result: databaseResult<MemoryData[]> = await this.memoryInstance.getData(jobId);
                return res.status(200).json({
                    data: result.result
                })
            } catch (e: any) {
                return res.status(500).json({
                    error: e.error
                })
            }
        })
        this.router.get("/test", async (req: Request, res: Response, next: NextFunction) => {
            return res.status(200).sendFile("test.html", {
                root : "./src/Host/Websites"
            })
        })
    }
}