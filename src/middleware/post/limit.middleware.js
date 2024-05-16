import { rateLimit } from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutos en milisegundos
  max: 2, // 2 peticiones por ventana
  message: "Demasiadas peticiones, por favor intenta de nuevo más tarde.",
  headers: true,
});
