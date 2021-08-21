import {
  ChangeDetectorRef,
  ComponentFactoryResolver,
  Injectable,
  Injector,
  ViewContainerRef,
} from '@angular/core';
import { MessageComponent } from '../components/message/message.component';
import { IMessage } from '../interfaces/message.interface';
import { MESSAGE_TEXT, MESSAGE_TYPE } from '../tokens/message.tokens';

/**
 * Dummy message service
 */
@Injectable({
  // Provide service in root
  providedIn: 'root',
})
export class MessageService {
  // View container ref, within it we create a component
  private _messageContainer: ViewContainerRef | undefined;

  constructor(private _resolver: ComponentFactoryResolver) {}

  /**
   * A simple method for displaying a message
   * @param message object with message type and text
   */
  public add(message: IMessage): void {
    this._createMessageComponent(message);
  }

  public setContainer(container: ViewContainerRef | undefined): void {
    if (!container) {
      console.error('Missing view container');
    } else {
      this._messageContainer = container;
    }
  }

  private _createMessageComponent(message: IMessage): void {
    if (!this._messageContainer) {
      return;
    }
    // Creates component factory
    const factory = this._resolver.resolveComponentFactory(MessageComponent);
    // Creates component injectors
    const injectors = Injector.create({
      providers: [
        { provide: MESSAGE_TEXT, useValue: message.text },
        { provide: MESSAGE_TYPE, useValue: message.type },
      ],
    });
    // Creates a component within the viewContainerRef and sets the providers
    const componentRef = this._messageContainer.createComponent(
      factory,
      undefined,
      injectors
    );
    componentRef.instance.changeDetector.markForCheck();
    setTimeout(() => {
      // Destroy the component after 5 seconds
      componentRef.destroy();
    }, 5000);
  }
}
