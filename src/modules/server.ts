import {proxyOptions} from "../types/proxyOptions";
import express, {Express, Response, Request, NextFunction} from "express";
import {result} from "../types/result";
export class Server {
    private readonly options : proxyOptions;
    private router!: express.Router;
    private app!: Express;
    public constructor(options : proxyOptions) {
        this.options = options;
    }
    public async initialize() : Promise<result> {
        return new Promise<result>(async (resolve, reject) => {
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
                response: "Success"
            })
        })
    }
    private async registerAPIS() : Promise<void> {
        this.router.get("/register_server", async (req : Request, res : Response, next : NextFunction) => {
            return res.status(200).json({
                message: "Hi"
            })
        })

    }
}