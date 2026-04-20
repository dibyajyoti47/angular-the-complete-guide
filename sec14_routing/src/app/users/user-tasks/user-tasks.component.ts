import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterState, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent {
  userId = input.required<string>();
  message = input.required<string>();
  private userService = inject(UsersService);
  userName = computed(() => this.userService.users.find((u) => u.id === this.userId())?.name);
  userNameObservable = '';
  userNameResolved = input.required<string>();
}

export const resolveUserName: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
  const userService = inject(UsersService);
  const userName = userService.users.find((u) => u.id === activatedRoute.paramMap.get("userId"))?.name || ""; 
  return userName;
}

export const resolveTitle: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
  return `${resolveUserName(activatedRoute, routerState)}'s Tasks`
}
