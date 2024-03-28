import { Component, Input, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

import { IconContact } from '../../../shared/icons/icons/contact';
import { IconBack } from '../../../shared/icons/icons/back';
import { ContactsService } from '../../data-access/contacts.service';
import { ContactForm } from '../../shared/interfaces/contacts.interface';

export interface CreateForm {
  fullName: FormControl<string>;
  email: FormControl<string>;
  phoneNumber: FormControl<string>;
  description?: FormControl<string | undefined>;
}

@Component({
  selector: 'app-contact-create',
  template: `
    <div class="px-4 xl:px-0 w-full max-w-[600px] m-auto">
      <form [formGroup]="form" (ngSubmit)="createContact()">
        <div class="mb-8">
          <label for="first_name" class="block mb-2 text-sm font-medium"
            >Nombre Completo.</label
          >
          <input
            type="text"
            id="first_name"
            class="w-full p-3 rounded-md text-sm bg-transparent border-gray-500 border"
            placeholder="Santiago Beltran"
            formControlName="fullName"
          />
        </div>
        <div class="mb-8">
          <label for="email" class="block mb-2 text-sm font-medium"
            >Correo Electronico.</label
          >
          <input
            type="text"
            id="email"
            class="w-full p-3 rounded-md text-sm bg-transparent border-gray-500 border"
            placeholder="ejemplo@mail.com"
            formControlName="email"
          />
        </div>
        <div class="mb-8">
          <label for="phoneNumber" class="block mb-2 text-sm font-medium"
            >Número.</label
          >
          <input
            type="text"
            id="phoneNumber"
            class="w-full p-3 rounded-md text-sm bg-transparent border-gray-500 border"
            placeholder="+57 3209754566"
            formControlName="phoneNumber"
          />
        </div>
        <div class="mb-8">
          <label for="description" class="block mb-2 text-sm font-medium"
            >Descripción (Opcional).</label
          >
          <textarea
            rows="5"
            type="text"
            id="description"
            class="w-full p-3 rounded-md text-sm bg-transparent border-gray-500 border"
            placeholder="Tú descripción va aquí"
            formControlName="description"
          ></textarea>
        </div>

        <div class="flex justify-between items-center">
          <a
            class="text-sm flex text-nowrap items-center gap-x-2 hover:text-red-500 transition-[color] ease-in-out duration-200 p-4 cursor-pointer"
            routerLink="/dashboard"
          >
            <app-icon-back />
            Volver
          </a>

          <button
            class="text-sm flex text-nowrap items-center gap-x-2 hover:text-green-300 transition-[color] ease-in-out duration-200 p-4 cursor-pointer"
            type="submit"
          >
            <app-icon-contact />
            @if (contactId) {
              Editar Contacto
            } @else {
              Crear Contacto
            }
          </button>
        </div>
      </form>
    </div>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, IconContact, IconBack, RouterLink],
})
export default class ContactCreateComponent {
  private _formBuilder = inject(FormBuilder).nonNullable;

  private _router = inject(Router);

  private _contactsService = inject(ContactsService);

  private _contactId = '';

  get contactId(): string {
    return this._contactId;
  }

  @Input() set contactId(value: string) {
    this._contactId = value;
    this.setFormValues(this._contactId);
  }

  form = this._formBuilder.group<CreateForm>({
    fullName: this._formBuilder.control('', Validators.required),
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    phoneNumber: this._formBuilder.control('', Validators.required),
    description: this._formBuilder.control(''),
  });

  async createContact() {
    if (this.form.invalid) return;

    try {
      const contact = this.form.value as ContactForm;
      !this.contactId
        ? await this._contactsService.createContact(contact)
        : await this._contactsService.updateContact(this.contactId, contact);
      this._router.navigate(['/dashboard']);
    } catch (error) {
      // call some toast service to handle the error
    }
  }

  async setFormValues(id: string) {
    try {
      const contact = await this._contactsService.getContact(id);
      if (!contact) return;
      this.form.setValue({
        fullName: contact.fullName,
        email: contact.email,
        phoneNumber: contact.phoneNumber,
        description: contact.description,
      });
    } catch (error) {}
  }
}