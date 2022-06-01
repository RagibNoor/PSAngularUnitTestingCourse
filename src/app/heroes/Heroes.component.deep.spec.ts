import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HeroesComponent} from "./heroes.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import {HeroService} from "../hero.service";
import {of} from "rxjs";
import {By} from "@angular/platform-browser";
import {HeroComponent} from "../hero/hero.component";

describe('heroes component deep Test ', () => {
  let mockHeroService;
  let heroes;
  let mockComponent:  ComponentFixture<HeroesComponent>;

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
        HeroComponent],
      providers:[{
        provide:HeroService, useValue: mockHeroService
      }],
      schemas:[NO_ERRORS_SCHEMA]
    });
    mockComponent =  TestBed.createComponent(HeroesComponent);
  })

  it('should set values in hero component ', function () {
    mockHeroService.getHeroes.and.returnValue(of(heroes))
    mockComponent.detectChanges();
    let mockChildComponents = mockComponent.debugElement.queryAll(By.directive(HeroComponent))

    for(let i = 0; i <mockChildComponents.length; i++){
      expect(mockChildComponents[i].componentInstance.hero).toBe(heroes[i])
    }
  });
  it(`Should call hero service delete method when trigger the delete btn from hero component`,  () => {
    //find the delete method and watch it , watch to see if it is invoked
    spyOn(mockComponent.componentInstance, 'delete')
    mockHeroService.getHeroes.and.returnValue(of(heroes))
    mockComponent.detectChanges();

    let childComponents = mockComponent.debugElement.queryAll(By.directive(HeroComponent))
    // trigger btn click from child component
    childComponents[1].query(By.css('button')).triggerEventHandler('click',{stopPropagation: ()=>{}})
    // manually emit the delete event
    childComponents[1].componentInstance.delete.emit(undefined);
    //trigger child component delete event 
    childComponents[1].triggerEventHandler('delete',{stopPropagation: ()=>{}})
    expect(mockComponent.componentInstance.delete).toHaveBeenCalledWith(heroes[1]);
  });
})
