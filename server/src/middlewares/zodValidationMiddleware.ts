import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";

export const inputValidator = <T>(schema : ZodType<T>) => {
    return (req:Request,res:Response,next:NextFunction) => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (error) {
            if(error instanceof ZodError){
                return res.status(400).json({
                    success : false,
                    message : "Validation failed!",
                    errors : error.issues.map(e => ({
                        field : e.path.join('.'),
                        message : e.message
                    }))
                });
            };
            //forward errors other than zoderror to error middleware
            next(error);
        };
    };
};