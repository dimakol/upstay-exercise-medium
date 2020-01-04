import express from 'express';
import api from './api';

const router = express.Router();

// http://localhost:9999/api route
router.use('/api', api);

export default router;
