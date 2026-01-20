import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedRecipe } from './saved-recipe';

describe('SavedRecipe', () => {
  let component: SavedRecipe;
  let fixture: ComponentFixture<SavedRecipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedRecipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedRecipe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
