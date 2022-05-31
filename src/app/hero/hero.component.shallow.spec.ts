import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HeroComponent} from "./hero.component";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('hero component shallow testing', () => {
  let fixer: ComponentFixture<HeroComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas:[NO_ERRORS_SCHEMA]
    });
    fixer = TestBed.createComponent(HeroComponent);
  })
  it('should have correct hero ', () => {
    fixer.componentInstance.hero ={id:  2, name: 'batman', strength: 10};

    expect(fixer.componentInstance.hero.name).toEqual('batman');
  });

  it('should have correct property on dom', function () {
    fixer.componentInstance.hero ={id:  2, name: 'batman', strength: 10};
    fixer.detectChanges();

    expect(fixer.debugElement.query(By.css('a')).nativeElement.textContent).toContain('batman');
    expect(fixer.nativeElement.querySelector('a').textContent).toContain('batman');
  });
})
