import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageselectorComponent } from './imageselector.component';

describe('ImageselectorComponent', () => {
  let component: ImageselectorComponent;
  let fixture: ComponentFixture<ImageselectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageselectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageselectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
