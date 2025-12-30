import { Router } from "express";
import { createUser, getUserById, getUsers, updateUser } from "../controllers/users.controller.js";
import { validate } from "../middlewares/validate.js";
import { getUserByIdSchema, getUsersSchema, updateUserSchema } from "../validators/user.validator.js";

const router = Router();

router.post("/", createUser);
router.get("/", validate(getUsersSchema), getUsers);
router.get("/:id", validate(getUserByIdSchema), getUserById);
router.put("/:id", validate(updateUserSchema), updateUser);

export default router;