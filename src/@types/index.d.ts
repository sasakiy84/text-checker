import { Connection } from 'mongoose';

declare global {
  namespace NodeJS {
    interface Global {
      mongoose: {
        connection: typeof import('mongoose') | Connection | null;
        promise: Promise<Connection | typeof import('mongoose')> | null;
      };
    }
  }
}
