import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { MatIconModule } from '@angular/material/icon';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent, MatIconModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user data', () => {
    expect(component.user.name).toBeTruthy();
    expect(component.user.profilePic).toBeTruthy();
  });

  it('should load playlists', () => {
    expect(component.playlists.length).toBeGreaterThan(0);
  });

  it('should toggle sidebar', () => {
    expect(component.isSidebarOpen).toBeFalse();
    component.toggleSidebar();
    expect(component.isSidebarOpen).toBeTrue();
    component.toggleSidebar();
    expect(component.isSidebarOpen).toBeFalse();
  });
});