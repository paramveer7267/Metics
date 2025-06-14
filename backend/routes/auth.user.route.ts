import express from "express";
import {userSignup,userLogin} from "../controllers/auth.user.controller.ts"

const router = express.Router();

router.post("/signup" ,userSignup);
router.post("/login" ,userLogin);

export default router;