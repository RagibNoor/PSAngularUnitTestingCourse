import {HeroesComponent} from "./heroes.component";
import {Hero} from "../hero";
import {HeroService} from "../hero.service";
import {of} from "rxjs";

describe('heroes component', () => {
  let component: HeroesComponent;
  let heroService;

  beforeEach(() => {
    heroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    component =  new HeroesComponent(heroService);
    component.heroes = [
      {id:  1, name: 'spider', strength: 5},
      {id:  2, name: 'batman', strength: 10},
      {id:  3, name: 'Thor', strength: 15}
    ]
  })
  it('should call delete method from hero service and delete the specified hero ', function () {
    heroService.deleteHero.and.returnValue(of(true));
    let hero = component.heroes[1];
    component.delete(hero);

    expect(component.heroes.every(x => x.id != hero.id)).toBe(true);
    expect(heroService.deleteHero).toHaveBeenCalledWith(hero);
  });
})
