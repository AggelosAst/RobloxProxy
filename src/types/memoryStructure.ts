export type memoryStructure = {
    id : string;
    data : {
        uri : string;
        method : "GET" | "POST", //TODO: Support for other HTTP methods.
        data? : Object | Array<any> | string;
        requester: string;
    };
    proxy? : { //TODO: Possibly mark this as deprecated?
      host : string;
      port : string;
    };
}

export enum methods {
    GET = 0,
    POST = 1
}