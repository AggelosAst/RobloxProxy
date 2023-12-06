export type memoryStructure = {
    id : string;
    data : {
        uri : string;
        method : "GET" | "POST", //TODO: Support for other HTTP methods.
        data? : Object | Array<any> | string;
        requester: string;
    };
    proxy? : {
      host : string;
      port : string;
    };
}