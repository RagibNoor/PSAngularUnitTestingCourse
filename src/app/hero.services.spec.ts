import {inject, TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HeroService} from "./hero.service";
import {MessageService} from "./message.service";

describe('Hero Service test', () =>{
  let mockMessageService;
  let httpClientController;
  beforeEach(() =>{
    mockMessageService = jasmine.createSpyObj(['add'])
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[
        HeroService,
        {provide: MessageService,useValue:mockMessageService}
      ]
    });
    httpClientController = TestBed.inject(HttpTestingController);
  })

  describe('test Get method', () =>{
    it('should call get with proper url', inject([HeroService],(service: HeroService) => {
      //call get hero
      service.getHero(4).subscribe();
      //test the url
      let req = httpClientController.expectOne('api/heroes/4')
      //send back result
      req.flush({id:  4, name: 'Thor', strength: 15});
      httpClientController.verify();
      expect(req.request.method).toBe('GET');
    }));
  })
})
