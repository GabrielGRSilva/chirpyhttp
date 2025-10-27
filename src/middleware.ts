import {RequestHandler} from "express"

export const middlewareFinish: RequestHandler = (req,res,next) => {
    res.on("finish", () => { //Listens for finish events to check their status and log if failed
    const status = res.statusCode;

    if (status < 200 || status > 299){
        console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${status}`);
            };
        });
    next();
};

export const middlewareHealthzCheck: RequestHandler = (req, res) => {
    res.set("Content-Type", "text/plain; charset=utf-8");
    res.send("OK");
    };