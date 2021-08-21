import { InjectionToken } from '@angular/core';
import { EMessage } from '../enums/message.enum';

// DI Token for message text
export const MESSAGE_TEXT = new InjectionToken<string>('Message_Text');
// DI Token for message type
export const MESSAGE_TYPE = new InjectionToken<EMessage>('Message_Type');
