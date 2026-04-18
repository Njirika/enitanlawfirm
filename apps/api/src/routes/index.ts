import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import contactRouter from "./contact.js";
import careersRouter from "./careers.js";
import blogRouter from "./blog.js";
import adminRouter from "./admin.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/contact", contactRouter);
router.use("/careers", careersRouter);
router.use("/blog", blogRouter);
router.use("/admin", adminRouter);

export default router;
