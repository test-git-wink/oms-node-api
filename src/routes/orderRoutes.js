import express from "express";

const orderRoutes = express.Router();

orderRoutes.get("/", (req, res) => {
  res.status(200).json({ message: "Connected!" });
});

export default orderRoutes;
