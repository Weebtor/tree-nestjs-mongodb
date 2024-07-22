import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { ClientSession } from 'mongodb';
import { Connection } from 'mongoose';

@Injectable()
export class TransactionManager {
  private readonly connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  async start<T>(cb: (session: ClientSession) => Promise<T>): Promise<T> {
    console.log('start transaction');
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const result = await cb(session);
      await session.commitTransaction();
      return result;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
      console.log('end transaction');
    }
  }
}

export default TransactionManager;
