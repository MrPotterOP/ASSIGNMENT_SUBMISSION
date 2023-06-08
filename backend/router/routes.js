import express from "express";

const router = express.Router();

import getContries from "../controllers/getCountries.js";
import postUser from "../controllers/postUsers.js";

router.get("/live", (req, res)=>{
    return res.json({msg: "server is live"})
});

router.get("/countries", getContries);
router.post("/user", postUser);



export default router;