import { fileNames } from '@/maps';

describe('map/index.ts', () => {
  it('has correct cover files', () => {
    fileNames.forEach((item) => {
      expect(item).toMatch(/^[A-Za-z0-9]+_/);
    });
  });
});