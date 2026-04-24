import { Router } from 'express';
import appointmentsRouter from './appointments.js';
import authRouter from './auth.js';
import barbershopsRouter from './barbershops.js';
import couponsRouter from './coupons.js';
import galleryPhotosRouter from './gallery-photos.js';
import reviewsRouter from './reviews.js';
import servicesRouter from './services.js';
import uploadsRouter from './uploads.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/uploads', uploadsRouter);
router.use('/barbershops', barbershopsRouter);
router.use('/services', servicesRouter);
router.use('/appointments', appointmentsRouter);
router.use('/reviews', reviewsRouter);
router.use('/gallery-photos', galleryPhotosRouter);
router.use('/coupons', couponsRouter);

export default router;
