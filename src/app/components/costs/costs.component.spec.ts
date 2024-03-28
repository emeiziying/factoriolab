import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from 'src/tests';
import { Rational } from '~/models';
import { Settings } from '~/store';
import { CostsComponent } from './costs.component';

describe('CostsComponent', () => {
  let component: CostsComponent;
  let fixture: ComponentFixture<CostsComponent>;
  let markForCheck: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CostsComponent],
      imports: [TestModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CostsComponent);
    const ref = fixture.debugElement.injector.get(ChangeDetectorRef);
    markForCheck = spyOn(ref.constructor.prototype, 'markForCheck');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('modified', () => {
    it('should determine whether the value matches the initial state', () => {
      component.reset();
      expect(component.modified).toBeFalse();
      component.editValue['surplus'] = Rational.one;
      expect(component.modified).toBeTrue();
    });
  });

  describe('ngOnInit', () => {
    it('should watch subject to show dialog', () => {
      component.contentSvc.showCosts$.next();
      expect(component.visible).toBeTrue();
      expect(markForCheck).toHaveBeenCalled();
    });
  });

  describe('reset', () => {
    it('should set the value back to the initial state', () => {
      component.editValue = null as any;
      component.reset();
      expect(component.editValue).toEqual(Settings.initialSettingsState.costs);
    });
  });

  describe('save', () => {
    it('should dispatch the action', () => {
      spyOn(component.store, 'dispatch');
      component.save();
      expect(component.store.dispatch).toHaveBeenCalledWith(
        new Settings.SetCostsAction(component.editValue as any),
      );
    });
  });
});
