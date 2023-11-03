import { Router } from "express";
import authRoutes from "./authRoutes";
let router = Router();

export default (): Router => {
  authRoutes(router); 
  customElements(router)
  return router;
};
