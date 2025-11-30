import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Todo} from '../models/todo.model';

@Component({
  selector: 'app-zen-focus',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './zen-focus-modal.html',
  styleUrl: './zen-focus-modal.scss'
})
export class ZenFocusModal {
  @Input({ required: true }) todo!: Todo;
  @Output() close = new EventEmitter<void>();
  @Output() complete = new EventEmitter<Todo>();

  onClose() {
    this.close.emit();
  }

  onComplete() {
    this.complete.emit(this.todo);
  }
}
