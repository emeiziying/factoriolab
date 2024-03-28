import { TestBed } from '@angular/core/testing';

import { Mocks, RecipeId, TestModule } from 'src/tests';
import { Rational, Step } from '~/models';
import { StepHrefPipe } from './step-href.pipe';

describe('StepHrefPipe', () => {
  let pipe: StepHrefPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [StepHrefPipe],
    });
    pipe = TestBed.inject(StepHrefPipe);
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    it('should adjust recipes where necessary', () => {
      spyOn(pipe.routerSvc, 'stepHref');
      const step: Step = {
        id: '0',
        items: Rational.one,
        recipeId: RecipeId.ArtilleryShellRange,
      };
      expect(pipe.transform(step, { bare: '', hash: '' }, Mocks.Dataset));
      expect(pipe.routerSvc.stepHref).toHaveBeenCalled();
      expect(pipe.routerSvc.stepHref).not.toHaveBeenCalledWith(
        Mocks.Step1,
        { bare: '', hash: '' },
        '' as any,
      );
    });
  });
});
