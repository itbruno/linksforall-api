import {describe, expect, it } from 'vitest';

describe('Initial tests', () => {
  it('should be able to test', () => {
    const doesBeAbleToTest = (enabled: boolean) => {
      if (enabled) {
        return true;
      }
      return false;
    };

    expect(doesBeAbleToTest(true)).toBeTruthy();
  });

  it('should not be able to test', () => {
    const doesBeAbleToTest = (enabled: boolean) => {
      if (enabled) {
        return true;
      }
      return false;
    };

    expect(doesBeAbleToTest(false)).toBeFalsy();
  });
});
