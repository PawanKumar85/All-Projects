import express from "express";
import { deviceInfo, Home } from "../controller/api.controller.js";

const routes = express.Router();

routes.get("/", Home).get("/info", deviceInfo);

export default routes;
