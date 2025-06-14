import express from "express";
import {createUser} from "../controllers/auth.user.controller.ts"

const router = express.Router();

router.post("/create" ,createUser);

export default router;