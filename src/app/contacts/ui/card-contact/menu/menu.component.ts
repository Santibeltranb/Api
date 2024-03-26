import { Component, EventEmitter, Output } from '@angular/core';
import { IconSettings } from '../../../../shared/icons/icons/settings';
import { IconEdit } from '../../../../shared/icons/icons/edit';
import { IconDelete } from '../../../../shared/icons/icons/delete';

@Component({
  selector: 'app-menu',
  template: `
    <button class="relative" type="button" (click)="openMenu()">
      <app-icon-settings />

      @if (isOpen) {
        <!-- Dropdown menu -->
        <div
          class="z-10 absolute right-0 top-7 p-1 min-w-24 bg-black rounded-md border border-gray-500/50 shadow overflow-hidden"
        >
          <ul
            class="text-sm text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li class="mb-1">
              <button
                class="w-full flex flex-row gap-x-2 items-center p-1 text-xs rounded-sm hover:bg-green-900"
                (click)="onEditContact.emit()"
              >
                <app-icon-edit /> Editar
              </button>
            </li>
            <li>
              <button
                (click)="onDeleteContact.emit()"
                class="w-full flex flex-row gap-x-2 items-center p-1 text-xs rounded-sm hover:bg-red-900"
              >
                <app-icon-delete /> Eliminar
              </button>
            </li>
          </ul>
        </div>
      }
    </button>
  `,
  standalone: true,
  imports: [IconSettings, IconDelete, IconEdit],
})
export class MenuComponent {
  @Output() onEditContact = new EventEmitter<void>();

  @Output() onDeleteContact = new EventEmitter<void>();

  isOpen = false;

  openMenu() {
    this.isOpen = !this.isOpen;
  }
}