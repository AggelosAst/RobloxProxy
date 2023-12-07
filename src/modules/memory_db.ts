import {MemoryOptions} from "../types/memoryOptions";
import {memoryStructure, methods} from "../types/memoryStructure";
import {databaseResult} from "../types/databaseResult";
import {result} from "../types/result";
import {ulid} from "ulid";
import {MemoryData} from "./memoryData";


export class Memory_db {
    private readonly option : MemoryOptions;
    private memory_db : memoryStructure[] = [];
     public constructor(options : MemoryOptions) {
        this.option = options;
    }
    public async getAllServers() : Promise<result> {
         return new Promise(async (resolve, reject) => {
             const servers : string[] = this.memory_db.map((item : memoryStructure) => item.id);
             resolve({
                 result : servers
             })
         })
    }
    public async removeData(id: string | undefined, reqId?: string) : Promise<databaseResult<result>> {
         return new Promise(async (resolve, reject) => {
             if (id) {
                 try {
                     await this.getData(id)
                 } catch (e : any) {
                     reject({
                         error: "Cant remove data that doesnt exist"
                     })
                 }
                 const index : number = this.memory_db.findIndex((item : memoryStructure) => item.id.includes(id));
                 const data : memoryStructure[] = this.memory_db.splice(index, 1);
                 resolve({
                     result : {
                         result: "Success",
                         data : data
                     }
                 })
             } else if (reqId) {
                 try {
                     await this.getData(undefined, reqId);
                 } catch (e : any) {
                     reject({
                         error: "Cant remove data that doesnt exist"
                     })
                 }
                 const index : number = this.memory_db.findIndex((item : memoryStructure) => item.reqId.includes(reqId));
                 const data : memoryStructure[] = this.memory_db.splice(index, 1);
                 resolve({
                     result : {
                         result: "Success",
                         data : data
                     }
                 })
             }
         })
    }
    public async getData(id: string | undefined, requestId?: string) : Promise<databaseResult<MemoryData[]>> {
         return new Promise((resolve, reject) => {
             if (id && requestId) {
                 return reject({
                     error: "Cannot use both requestId of indexing"
                 })
             }
             if (id) {
                 const result: memoryStructure[] | undefined = this.memory_db.filter((item: memoryStructure) => item.id.includes(id));
                 if (result.length > 0) {
                     const data : MemoryData[] = result.map((item : memoryStructure) => {
                         return new MemoryData({
                             reqId : item.reqId,
                             id: item.id,
                             data: {
                                 uri: item.data.uri,
                                 method: item.data.method,
                                 requester: item.data.requester
                             }
                         })})
                     resolve({
                         result : data
                     })
                 } else {
                     reject({
                         error: "Item could not be found"
                     })
                 }
             } else if(requestId) {
                 const result : memoryStructure[] | undefined = this.memory_db.filter(item => item.reqId == requestId);
                 if (result.length > 0) {
                     const data : MemoryData[] = result.map((item : memoryStructure) => {
                         return new MemoryData({
                             reqId : item.reqId,
                             id: item.id,
                             data: {
                                 uri: item.data.uri,
                                 method: item.data.method,
                                 requester: item.data.requester
                             }
                         })})
                     resolve({
                         result : data
                     })
                 } else {
                     reject({
                         error: "Item could not be found"
                     })
                 }
             }

         })
    }
    public async appendData(uri : string, method: methods, requester: string, id : string, reqId : string, payload? : any) : Promise<databaseResult<result>> {
         return new Promise<databaseResult<result>>((resolve, reject) => {
             try {
                 this.memory_db.push({
                     reqId : reqId,
                     id : id,
                     data : {
                         uri : uri,
                         method : method,
                         requester : requester
                     }
                 })
             } catch (e : any) {
                 console.log(`⚠️ Error while::Appending`);
                 console.log(e);
                  reject({
                     error: e
                 })
             }
             resolve({
                 result : {
                     result : "Success"
                 }
             })
         })
    }
}