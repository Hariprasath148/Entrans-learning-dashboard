import { Component, Input, Output, EventEmitter } from '@angular/core';
//import { User } from '../chat-page/chat-page.component';

@Component({
  selector: 'app-users-list',
  standalone: false,
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent {
  @Input() users: any[] = [];
  @Input() selectedUser: any | null = null;
  @Input() searchText: string = '';
  @Input() isSearch: boolean = false;
  @Input() isSearchAction: string = '';
  @Input() searchedUser: any[] = [];

  @Output() userSelected = new EventEmitter<any>();
  @Output() searchChanged = new EventEmitter<string>();
  @Output() searchCleared = new EventEmitter<void>();

  /**
   * onUserClick - Emit when a user is selected
   * @param user - The selected user
   */
  onUserClick(user: any) {
    this.userSelected.emit(user);
  }

  /**
   * onSearchChange - Emit when search text changes
   * @param event - Input event
   */
  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchChanged.emit(target.value);
  }

  /**
   * onSearchClear - Clear the search
   */
  onSearchClear() {
    this.searchCleared.emit();
  }

  /**
   * isUserSelected - Check if a user is selected
   * @param user - User to check
   */
  isUserSelected(user: any): boolean {
    return this.selectedUser?.id === user.id;
  }
}