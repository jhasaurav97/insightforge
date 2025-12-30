import { Router } from "express";
import { createUser, getUserById, getUsers } from "../controllers/users.controller.js";
import { validate } from "../middlewares/validate.js";
import { getUserByIdSchema, getUsersSchema } from "../validators/user.validator.js";

const router = Router();

router.post("/", createUser);
router.get("/", validate(getUsersSchema), getUsers);
router.get("/:id", validate(getUserByIdSchema), getUserById);

export default router;