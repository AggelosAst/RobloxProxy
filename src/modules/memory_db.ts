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
    public async getData(id: string, method?: methods) : Promise<databaseResult<MemoryData>> {
         return new Promise((resolve, reject) => {
             if (id && method) {
                 return reject({
                     error: "Cannot use both methods of indexing"
                 })
             }
             if (id) {
                 const result: memoryStructure | undefined = this.memory_db.find((item: memoryStructure) => item.id.includes(id));
                 if (result) {
                      resolve({
                          result : new MemoryData({
                              id: result.id,
                              data: {
                                  uri: result.data.uri,
                                  method: result.data.method,
                                  requester: result.data.requester
                              }
                          })
                      })
                 } else {
                     reject({
                         error: "Item could not be found"
                     })
                 }
             } else if(method) {
                 const result : memoryStructure[] | undefined = this.memory_db.filter(item => item.data.method == method);
                 if (result){
                     console.log(result);
                     return result.map((item : memoryStructure) => {
                         new MemoryData({
                             id: item.id,
                             data: {
                                 uri: item.data.uri,
                                 method: item.data.method,
                                 requester: item.data.requester
                             }
                         })
                     })
                 }
             }

         })
    }
    public async appendData(uri : string, method: methods, requester: string, id : string, payload? : any) : Promise<databaseResult<result>> {
         return new Promise<databaseResult<result>>((resolve, reject) => {
             try {
                 this.memory_db.push({
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