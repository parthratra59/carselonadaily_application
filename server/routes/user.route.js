import express from 'express';
const router = express.Router();
import {createFAQ} from '../controllers/user.js';
import { getfaQid } from '../controllers/user.js';
import { getAllData } from '../controllers/user.js';
import {categorylisting} from '../controllers/category.js';
import {categories} from '../controllers/category.js'
import searchFAQs from "../controllers/Regex.js"
router.post("/createFAQ",createFAQ)
router.get("/getFAQ/:id",getfaQid)
router.get("/getAllFAQ",getAllData)
router.get("/categories",categories)
router.get("/categorylisting",categorylisting)
router.get("/searching",searchFAQs)

export default router;

