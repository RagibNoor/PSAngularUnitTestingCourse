import {StrengthPipe} from "./strength.pipe";

describe('Strength pipe', () => {
  let strengthPipe: StrengthPipe;

  beforeEach(() =>{
    strengthPipe = new StrengthPipe()
  })

  it('should return strength weak if value is 5', function () {

    expect(strengthPipe.transform(5)).toBe("5 (weak)")
  });

  it('should return strength strong if value is 10', function () {

    expect(strengthPipe.transform(10)).toBe("10 (strong)")
  });
})
