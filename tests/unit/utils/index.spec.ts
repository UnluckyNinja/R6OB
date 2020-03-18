import { getFileName } from '@/utils';

describe('utils/index.ts', () => {
  it('get file name should work', () => {
    expect(getFileName('./abc.ext')).toBe('abc');
    expect(getFileName('defghi.ext')).toBe('defghi');
    expect(getFileName('/./../folder/j.ext')).toBe('j');
    expect(getFileName('klmn')).toBe('klmn');
    expect(getFileName('./../opq')).toBe('opq');
    expect(getFileName('/z')).toBe('z');
  });
});