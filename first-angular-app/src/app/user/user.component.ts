import { Component, computed, EventEmitter, Input, input, Output } from '@angular/core';
import { DUMMY_USERS } from '../dummy-users';
import { type User } from './user.model';
import { CardComponent } from "../shared/card/card.component";

const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  standalone: true,
  imports: [CardComponent]
})
export class UserComponent {

  @Input ({required: true}) user!: User;
  @Input ({required: true}) selected!: boolean;
  @Output() select = new EventEmitter();

  // avatar = input.required<string>();
  // name = input.required<string>();

  // imagePath = computed (() => {
  //   return "assets/users/" + this.avatar();
  // });

  get imagePath() {
    return "assets/users/" + this.user.avatar;
  }

  onSelectUser () {
    this.select.emit(this.user.id);
  }
}
