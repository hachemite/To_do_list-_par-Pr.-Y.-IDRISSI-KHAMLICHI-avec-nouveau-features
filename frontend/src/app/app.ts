import {Component, signal, effect, computed} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TodoService } from './services/todo.service';
import { Todo } from './models/todo.model';
import { MatButtonModule } from '@angular/material/button';
import {ZenFocusModal} from './zen-focus-modal/zen-focus-modal';

@Component({
  selector: 'app-root',
  imports: [CommonModule, MatIconModule, MatButtonModule, ZenFocusModal],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  todos = signal<Todo[]>([]);
  isLoading = signal(true);
  isDark = signal(window.matchMedia('(prefers-color-scheme: dark)').matches);
  //
  focusedTodo = signal<Todo | null>(null);


  constructor(private todoService: TodoService) {
    this.loadTodos();

    // Auto dark mode
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', e => this.isDark.set(e.matches));
    effect(() => document.documentElement.dataset['theme'] = this.isDark() ? 'dark' : 'light');
  }

  loadTodos() {
    this.todoService.getTodos().subscribe({
      next: (data) => {
        this.todos.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  addTodo(title: string) {
    if (!title.trim()) return;
    this.todoService.addTodo({ title, completed: false }).subscribe(todo => {
      this.todos.update(t => [...t, todo]);
    });
  }

  toggle(todo: Todo) {
    this.todoService.updateTodo({ ...todo, completed: !todo.completed }).subscribe(() => {
      this.todos.update(t => t.map(x => x.id === todo.id ? { ...x, completed: !x.completed } : x));
    });
  }

  delete(id?: number) {
    if (!id) return;
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todos.update(t => t.filter(x => x.id !== id));
    });
  }

  toggleTheme() {
    this.isDark.set(!this.isDark());
  }


  // new zenmode
  hasPending = computed(() => this.todos().some(t => !t.completed));
  spinTheWheel() {
    const pending = this.todos().filter(t => !t.completed);
    if (pending.length === 0) return;

    const randomIndex = Math.floor(Math.random() * pending.length);
    this.focusedTodo.set(pending[randomIndex]);
  }

  // 4. Handle events from the Child Component
  onZenClose() {
    this.focusedTodo.set(null);
  }

  onZenComplete(todo: Todo) {
    this.toggle(todo); // Reuse your existing toggle method
    this.focusedTodo.set(null);
  }
}
