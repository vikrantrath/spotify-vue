import { VueWrapper } from '@vue/test-utils';
import { expect, it } from 'vitest';

export const testSnapShot = (wrapperGetter: () => VueWrapper) => {
  it('Matches the snapshot', () => {
    expect(wrapperGetter().html()).toMatchSnapshot();
  });
};
