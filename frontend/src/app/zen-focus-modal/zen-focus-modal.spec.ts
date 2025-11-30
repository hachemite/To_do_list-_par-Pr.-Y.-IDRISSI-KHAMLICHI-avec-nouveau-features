import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZenFocusModal } from './zen-focus-modal';

describe('ZenFocusModal', () => {
  let component: ZenFocusModal;
  let fixture: ComponentFixture<ZenFocusModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenFocusModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZenFocusModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
