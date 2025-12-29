import { Router } from "express";
import { createUser, getUsers } from "../controllers/users.controller.js";
import { validate } from "../middlewares/validate.js";
import { getUsersSchema } from "../validators/user.validator.js";

const router = Router();

router.post("/", createUser);
router.get("/", validate(getUsersSchema) , getUsers);

export default router;