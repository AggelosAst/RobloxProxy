export type memoryStructure = {
    id : string;
    reqId : string;
    data : {
        uri : string;
        method : methods, //TODO: Support for other HTTP methods.
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