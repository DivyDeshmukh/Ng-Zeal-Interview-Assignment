import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { provideMockStore } from '@ngrx/store/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

@Pipe({ name: 'money' })
class MockMoneyPipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule], // 👈 Fix routerLink issue
      declarations: [DashboardComponent, MockMoneyPipe],
      providers: [
        provideMockStore({
          initialState: {
            contracts: { list: [], total: 0, loading: false, cache: {}, summary: null }
          }
        })
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
// If I try to load the DashboardComponent, does Angular throw an error or not?