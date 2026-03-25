import { mergeTests } from '@playwright/test';
import { test as authTest } from './fixturesAuth';
import { test as genericTest } from './fixturesGeneric';
import { test as articlesTest } from './fixturesArticles';
export { expect } from '@playwright/test';

export const test = mergeTests(genericTest, authTest, articlesTest);
