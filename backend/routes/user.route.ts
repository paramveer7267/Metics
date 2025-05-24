import express from "express";
import {createUser} from "../controllers/user.ts"

const router = express.Router();

router.post("/create" ,createUser);

export default router;