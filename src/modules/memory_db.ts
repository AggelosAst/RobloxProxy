import {MemoryOptions} from "../types/memoryOptions";
import {memoryStructure} from "../types/memoryStructure";
import {databaseResult} from "../types/databaseResult";
import {result} from "../types/result";
import {methods} from "../types/memoryStructure";
export class Memory_db {
    private readonly option : MemoryOptions;
    private memory_db : memoryStructure[] = [];
     public constructor(options : MemoryOptions) {
        this.option = options;
    }
    public async appendData(uri : string, method: methods, requester: string, payload? : any) : Promise<databaseResult<result>> {
         return new Promise<databaseResult<result>>((resolve, reject) => {

         })
    }
}