import express from "express";
import { get_all_portfolio_data } from "../controllers/portfolioController.js";

const portfolio = express.Router();

// Route to get portfolio by ID
portfolio.get("/", get_all_portfolio_data);

export default portfolio;
