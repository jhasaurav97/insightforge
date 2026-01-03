import { Router } from "express";
import {  deleteUser, getUserById, getUsers, updateUser } from "../controllers/users.controller.js";
import { validate } from "../middlewares/validate.js";
import { deleteUserSchema, getUserByIdSchema, getUsersSchema, updateUserSchema } from "../validators/user.validator.js";

const router = Router();

router.get("/", validate(getUsersSchema), getUsers);
router.get("/:id", validate(getUserByIdSchema), getUserById);
router.put("/:id", validate(updateUserSchema), updateUser);
router.delete("/:id", validate(deleteUserSchema), deleteUser);

export default router;