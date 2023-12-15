import express from "express";

export const server = express();
const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server Running at port ${port}.`)
})