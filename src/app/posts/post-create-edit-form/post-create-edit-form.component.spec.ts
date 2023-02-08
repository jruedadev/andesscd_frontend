import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCreateEditFormComponent } from './post-create-edit-form.component';

describe('PostCreateEditFormComponent', () => {
  let component: PostCreateEditFormComponent;
  let fixture: ComponentFixture<PostCreateEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCreateEditFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCreateEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
