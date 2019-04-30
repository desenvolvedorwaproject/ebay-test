import { OnApplicationShutdown } from '@nestjs/common';
import * as amqplib from 'amqplib';
import { RABBIT_DSN, RABBIT_QUEUE } from 'settings';

export class QueueService implements OnApplicationShutdown {
  public connection: amqplib.Connection;
  public channel: amqplib.Channel;

  public async sendToQueue(message: any): Promise<boolean> {
    const channel = await this.getChannel();
    return channel.sendToQueue(RABBIT_QUEUE, Buffer.from(JSON.stringify(message)));
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