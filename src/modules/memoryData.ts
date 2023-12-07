import {memoryStructure, methods} from "../types/memoryStructure";

export class MemoryData {
    public readonly id : string;
    public readonly uri : string;
    public readonly method : methods
    public readonly requester: string;
    public readonly reqId : string;
    constructor(options : memoryStructure) {
        this.id = options.id
        this.uri = options.data.uri
        this.method = options.data.method
        this.requester = options.data.requester
        this.reqId = options.reqId
    }
    public getId() {
        return this.id;
    }
}