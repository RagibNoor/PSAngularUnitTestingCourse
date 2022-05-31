import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HeroesComponent} from "./heroes.component";
import {Component, EventEmitter, Input, NO_ERRORS_SCHEMA, Output} from "@angular/core";
import {HeroService} from "../hero.service";
import {of} from "rxjs";
import {Hero} from "../hero";
import {By} from "@angular/platform-browser";

describe('heroes component shallow Test ', () => {
  let mockHeroService;
  let heroes;
  let mockComponent:  ComponentFixture<HeroesComponent>;
  // mock child component

  @Component({
    selector: 'app-hero',
    template: '<div>{{hero.name}}</div>',
  })
  class MockHeroComponent {
    @Input() hero: Hero;
  }
  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(['getHeroes','addHero','deleteHero'])
    heroes = [
      {id:  1, name: 'spider', strength: 5},
      {id:  2, name: 'batman', strength: 10},
      {id:  3, name: 'Thor', strength: 15}
    ]
    TestBed.configureTestingModule({
      declarations:[
        HeroesComponent,
        MockHeroComponent],
      providers:[{
        provide:HeroService, useValue: mockHeroService
      }]
    });
    mockComponent =  TestBed.createComponent(HeroesComponent);
  })

  it('should set values to the heroes property', () => {
    mockHeroService.getHeroes.and.returnValue(of(heroes))
    mockComponent.detectChanges();

    expect(mockComponent.componentInstance.heroes.length).toBe(3);
  });

  it('should set values in dom li', function () {
    mockHeroService.getHeroes.and.returnValue(of(heroes))
    mockComponent.detectChanges();

    expect(mockComponent.debugElement.queryAll(By.css('li')).length).toBe(3)
  });
})
