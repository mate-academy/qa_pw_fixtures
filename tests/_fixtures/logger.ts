import { test as base } from '@playwright/test';
import pino from 'pino';

export const test = base.extend({
  logger: async ({}, use) => {
    const logger = pino({
      level: process.env.LOG_LEVEL || 'error', // change this dynamically
      transport: {
        target: 'pino-pretty',
        options: { colorize: true },
      },
    });
    await use(logger);
  },
});
