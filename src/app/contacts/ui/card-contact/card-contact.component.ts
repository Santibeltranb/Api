import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../../shared/interfaces/contacts.interface';
import { MenuComponent } from '../card-contact/menu/menu.component';

@Component({
  selector: 'app-card-contact',
  template: `
    <div class="border border-gray-500/50 rounded-md p-4 flex flex-row gap-x-4">
      <div class="flex-1">
        <h4 class="text-black mb-2 font-bold">{{ contact.fullName }}</h4>
        <small class="text-black-300 mb-2 font-bold">{{ contact.phoneNumber }}</small>
        <p class="text-black-300 mb-2">{{ contact.email }}</p>
        <p class="text-black-400 text-sm">
          {{
            !contact.description ? 'No hay descripción.' : contact.description
          }}
        </p>
      </div>
      <div>
        <app-menu
          (onEditContact)="onEditContact(contact)"
          (onDeleteContact)="onDeleteContact(contact)"
        />
      </div>
    </div>
  `,
  standalone: true,
  imports: [MenuComponent],
})
export class CardContactComponent {
  @Input({ required: true }) contact!: Contact;

  @Output() editContact = new EventEmitter<Contact>();

  @Output() deleteContact = new EventEmitter<string>();

  onEditContact(contact: Contact) {
    this.editContact.emit(contact);
  }

  onDeleteContact(contact: Contact) {
    this.deleteContact.emit(contact.id);
  }
}