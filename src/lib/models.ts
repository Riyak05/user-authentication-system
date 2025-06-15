// This file re-exports the User model from db.ts
import { User as UserModel } from "./db";

export const User = UserModel;
