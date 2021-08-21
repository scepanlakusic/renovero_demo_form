import { EMessage } from '../enums/message.enum';

/**
 * Message interface
 */
export interface IMessage {
  text: string;
  type: EMessage;
}
