import cors from 'cors';

// CHANGEHERE
const allowedOrigins = '*';

export const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
};
