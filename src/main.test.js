const sample = require('./main')

test('sample test', () => {
    expect(sample.add(1,2)).toBe(3);
  });