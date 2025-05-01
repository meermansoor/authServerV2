import { Router } from "express";
import { signUp, signIn, signOut } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/signup", (req, res) => res.send({signUp}));
authRouter.post("/signin", (req, res) => res.send({signIn}));
authRouter.post("/signout", (req, res) => res.send({signOut}));

export default authRouter;
