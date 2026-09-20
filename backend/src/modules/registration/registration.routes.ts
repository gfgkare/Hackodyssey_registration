import { Router } from "express";
import {
  createRegistration,
  getRegistrationStatus,
} from "./registration.controller";

const registrationRouter = Router();

registrationRouter.post("/", createRegistration);
registrationRouter.get("/status", getRegistrationStatus);

export default registrationRouter;