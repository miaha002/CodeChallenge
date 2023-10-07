const { getRandomWord } = require('../main');
const chai = require('chai');
const expect = chai.expect;

describe('getRandomWord', () => {
  it('should return a valid word', () => {
    const length = 4;
    const letters = ['w', 'o', 'r', 'd'];

    const result = getRandomWord(length, letters);

    expect(result).to.be.a('string');
  });

  it('should return null for no valid word', () => {
    const length = 6;
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

    const result = getRandomWord(length, letters);

    expect(result).to.be.null;
  });

  it('should return a valid word even if given extra letters', () => {
    const length = 5;
    const letters = ['h', 'e', 'l', 'l', 'o', 'f'];

    const result = getRandomWord(length, letters);

    expect(result).to.be.a('string');
  });

    it('should return a valid word for a valid length and letters', () => {
      const result = getRandomWord(3, ['c', 'a', 't', 'r', 'e', 'e']);
      expect(result).to.not.be.null;
      expect(result.length).to.equal(3);
    });
  
    it('should return null for an invalid length', () => {
      const result = getRandomWord(0, ['c', 'a', 't', 'r', 'e', 'e']);
      expect(result).to.be.null;
    });
  
    it('should return null for no matching words', () => {
      const result = getRandomWord(5, ['a', 'b', 'c', 'd', 'e']);
      expect(result).to.be.null;
    });
  
    it('should return null for no available letters', () => {
      const result = getRandomWord(4, []);
      expect(result).to.be.null;
    });
  
    it('should return a valid word for a valid length and repeated letters', () => {
      const result = getRandomWord(3, ['b', 'a', 'n', 'a', 'n', 'a']);
      expect(result).to.not.be.null;
      expect(result.length).to.equal(3);
    });
  });