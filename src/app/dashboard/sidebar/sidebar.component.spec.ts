import { ComponentFixture, TestBed, flushMicrotasks, waitForAsync } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { ToggleDirective } from './toggle.directive';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarComponent, ToggleDirective ],
      imports: [ MatIconModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Toggle sub menu', () => {
    const compiled = fixture.debugElement.nativeElement;
    // expect(compiled.querySelectorAll('.c-sidebar-nav-dropdown-items .c-sidebar-nav-item').length).toBe(0);

    compiled.querySelector('.c-sidebar-nav-dropdown-toggle').click();

    // expect(element('li.nav-item.nav-dropdown').getAttribute('class')).toMatch('open');
    expect(fixture.debugElement.query(By.css('.c-sidebar-nav-dropdown'))
      .nativeElement.getAttribute('class')).toMatch('c-show');
  });
});
