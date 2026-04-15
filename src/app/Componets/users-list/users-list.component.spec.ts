import { ComponentFixture, TestBed } from '@angular/core/testing';
import { spyOn } from 'vitest';
import { UsersListComponent } from './users-list.component';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit userSelected event', () => {
    spyOn(component.userSelected, 'emit');
    const user = { id: 1, name: 'Test', avatar: '👨', lastMessage: 'Hi', lastMessageTime: 'Now', status: 'online' as const };
    component.onUserClick(user);
    expect(component.userSelected.emit).toHaveBeenCalledWith(user);
  });

  it('should check if user is selected', () => {
    const user = { id: 1, name: 'Test', avatar: '👨', lastMessage: 'Hi', lastMessageTime: 'Now', status: 'online' as const };
    component.selectedUser = user;
    expect(component.isUserSelected(user)).toBe(true);
  });
});