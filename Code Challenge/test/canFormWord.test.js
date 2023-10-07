const { canFormWord } = require('../main');
const chai = require('chai');
const expect = chai.expect;

describe('canFormWord', () => {
  it('should return true for a valid word', () => {
    const word = 'example';
    const letters = ['e', 'x', 'a', 'm', 'p', 'l', 'e'];

    const result = canFormWord(word, letters);

    expect(result).to.be.true;
  });

  it('should return true for an invalid word', () => {
    const word = 'invalid';
    const letters = ['i', 'n', 'v', 'a', 'l', 'i', 'd'];

    const result = canFormWord(word, letters);

    expect(result).to.be.true;
  });

  describe('canFormWord', () => {
    it('should return true for a valid word', () => {
      const result = canFormWord('cat', ['c', 'a', 't']);
      expect(result).to.be.true;
    });
  
    it('should return true for a valid word with repeated letters', () => {
      const result = canFormWord('banana', ['b', 'a', 'n', 'a', 'n', 'a']);
      expect(result).to.be.true;
    });
  
    it('should return true for an empty word', () => {
      const result = canFormWord('', []);
      expect(result).to.be.true;
    });
  
    it('should return false for a word with missing letters', () => {
      const result = canFormWord('apple', ['a', 'p', 'p', 'l']);
      expect(result).to.be.false;
    });
  
    it('should return false for a word with no available letters', () => {
      const result = canFormWord('dog', []);
      expect(result).to.be.false;
    });
  });
});
