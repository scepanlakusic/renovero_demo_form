import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Renderer2,
} from '@angular/core';
import { EMessage } from 'src/app/enums/message.enum';
import { MESSAGE_TEXT, MESSAGE_TYPE } from 'src/app/tokens/message.tokens';

const MESSAGE_SUCCESS_CLASS = 'message-success';
const MESSAGE_ERROR_CLASS = 'message-error';

/**
 * Simple message component
 */
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
  public get messageTypes(): typeof EMessage {
    return EMessage;
  }

  constructor(
    @Inject(MESSAGE_TEXT) public messageText: string,
    @Inject(MESSAGE_TYPE) public messageType: EMessage,
    private _renderer: Renderer2,
    private _elRef: ElementRef,
    public changeDetector: ChangeDetectorRef
  ) {
    switch (messageType) {
      case EMessage.SUCCESS:
        this._renderer.addClass(
          this._elRef.nativeElement,
          MESSAGE_SUCCESS_CLASS
        );
        break;
      case EMessage.ERROR:
        this._renderer.addClass(this._elRef.nativeElement, MESSAGE_ERROR_CLASS);
        break;
    }
  }
}
