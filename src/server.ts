import http from 'http';
import app from '../app';
import { normalizePort, onError, onListening } from './serverHandle';
import logger from '../app/lib/logger';

const normalizedPort = normalizePort(process.env.PORT ?? 3000);

if (normalizedPort === false) {
  logger.error('PORT must be a non-negative number or named pipe.');
}

app.set('port', normalizedPort);
logger.http(`Server is running on port: ${normalizedPort}`);

const server = http.createServer(app);

server.listen(normalizedPort);
server.on('error', (error: NodeJS.ErrnoException) => onError(error, normalizedPort));
server.on('listening', () => onListening(server));
 