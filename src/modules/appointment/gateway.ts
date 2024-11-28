import { Injectable } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ResponseCustomizer } from 'src/helpers/response-customizer.response';

@WebSocketGateway()
@Injectable()
export default class MyGateWay
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('sendMessage')
  handleSendMessage(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ): void {
    console.log(typeof message);
    console.log(JSON.parse(message));

    console.log(
      `${JSON.parse(message).user} sent: ${JSON.parse(message).text}`,
    );
    console.log(client.id);
  }

  sendNotifyPayment(response: ResponseCustomizer) {
    if (response.data) {
      this.server.emit('notify-payment', {
        message: 'success',
        data: response.data,
      });
    } else {
      this.server.emit('notify-payment', {
        message: 'failure',
        error: response.error,
      });
    }
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
}
