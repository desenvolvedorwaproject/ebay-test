import { OnApplicationShutdown } from '@nestjs/common';
import * as amqplib from 'amqplib';
import { logException } from 'log';
import { RABBIT_DSN, RABBIT_EXCHANGE, RABBIT_QUEUE } from 'settings';
import { ConsumeMessage, Channel } from 'amqplib';

export class QueueService implements OnApplicationShutdown {
  public connection: amqplib.Connection;
  public channel: amqplib.Channel;

  public async listen(handler: (msg: ConsumeMessage, channel: Channel) => Promise<void>): Promise<void> {
    const channel = await this.getChannel();
    channel.assertExchange(RABBIT_EXCHANGE, 'topic', { durable: true });
    channel.prefetch(1);

    await channel.assertQueue(RABBIT_QUEUE + '.nack', { durable: true });

    const assertQueue = await channel.assertQueue(RABBIT_QUEUE, {
      durable: true,
      arguments: {
        'x-dead-letter-routing-key': RABBIT_QUEUE + '.nack',
        'x-dead-letter-exchange': '',
      }
    });

    channel.bindQueue(assertQueue.queue, RABBIT_EXCHANGE, RABBIT_QUEUE);

    await channel.consume(assertQueue.queue, async message => {
      try {
        await handler(message, channel);
        return channel.ack(message);
      } catch (err) {
        console.error(err);
        logException(err);
        return channel.nack(message, false, false);
      }
    }, { noAck: false });
  }

  public async  onApplicationShutdown(): Promise<void> {
    if (this.channel) await this.channel.close();
    if (this.connection) await this.connection.close();
  }

  private async  getChannel(): Promise<amqplib.Channel> {
    if (!this.channel) {
      this.connection = await amqplib.connect(RABBIT_DSN);
      this.channel = await this.connection.createChannel();
    }

    return this.channel;
  }
}