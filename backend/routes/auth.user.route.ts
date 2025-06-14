import express from "express";
import {userSignup,userLogin,userLogout} from "../controllers/auth.user.controller.ts"

const router = express.Router();

router.post("/signup" ,userSignup);
router.post("/login" ,userLogin);
router.get("/logout", userLogout);

export default router;