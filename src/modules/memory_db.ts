import {MemoryOptions} from "../types/memoryOptions";
import {memoryStructure} from "../types/memoryStructure";

export class Memory_db {
    private readonly option : MemoryOptions;
    private memory_db : memoryStructure[] = [];
     public constructor(options : MemoryOptions) {
        this.option = options;
    }
}