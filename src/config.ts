import {middlewareMetricsInc} from "./middleware";

type APIConfig = { //Number of received requests
  fileServerHits: number;
};

export const config: APIConfig = { //Obj to hold stateful data
    fileServerHits: 0,
};