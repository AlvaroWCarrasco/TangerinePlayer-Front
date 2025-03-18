import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { FormsModule } from '@angular/forms';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, FormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty search query', () => {
    expect(component.searchQuery).toBe('');
    expect(component.searchResults).toEqual([]);
  });

  it('should handle search', () => {
    spyOn(console, 'log');
    component.searchQuery = 'test';
    component.onSearch();
    expect(console.log).toHaveBeenCalledWith('Searching for:', 'test');
  });
});