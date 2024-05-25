import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAdvacedComponent } from './search-advaced.component';

describe('SearchAdvacedComponent', () => {
  let component: SearchAdvacedComponent;
  let fixture: ComponentFixture<SearchAdvacedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchAdvacedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchAdvacedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
