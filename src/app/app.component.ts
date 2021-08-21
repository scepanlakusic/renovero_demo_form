import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {
  @ViewChild('messageContainer', { read: ViewContainerRef })
  private _messageContainer: ViewContainerRef | undefined;

  constructor(private _messageService: MessageService) {}

  public ngAfterViewInit(): void {
    this._messageService.setContainer(this._messageContainer);
  }
}
