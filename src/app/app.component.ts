import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FirestoreService } from './contacts/data-access/contacts.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, NavbarComponent]
})
export class AppComponent implements OnInit {
  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.firestoreService.logCollectionData('contacts');
  }

  title = 'contacts-project';
}
