import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {

  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule, ReactiveFormsModule],
      providers: [AppComponent],
    })
    component = TestBed.get(AppComponent);
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'ContactEngineApp'`, () => {
    expect(component.title).toEqual('ContactEngineApp');
  });
});
