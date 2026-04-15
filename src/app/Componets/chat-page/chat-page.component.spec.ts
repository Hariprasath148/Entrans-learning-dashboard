import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatPageComponent } from './chat-page.component';

describe('ChatPageComponent', () => {
  let component: ChatPageComponent;
  let fixture: ComponentFixture<ChatPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select a user', () => {
    const user = component.users[0];
    component.selectUser(user);
    expect(component.selectedUser).toEqual(user);
  });

  it('should filter users based on search text', () => {
    component.searchText = 'john';
    const filtered = component.filteredUsers;
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered[0].name.toLowerCase()).toContain('john');
  });

  it('should send a message', () => {
    component.selectedUser = component.users[0];
    component.messageInput = 'Test message';
    const initialLength = component.messages.length;
    component.sendMessage();
    expect(component.messages.length).toBeGreaterThan(initialLength);
    expect(component.messageInput).toBe('');
  });

  it('should toggle sidebar', () => {
    const initialState = component.isSidebarOpen;
    component.toggleSidebar();
    expect(component.isSidebarOpen).toBe(!initialState);
  });

  it('should clear search', () => {
    component.searchText = 'test';
    component.clearSearch();
    expect(component.searchText).toBe('');
  });
});