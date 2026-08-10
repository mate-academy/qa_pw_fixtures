import { mergeTests } from '@playwright/test';
import { test as authTest } from './fixturesAuth';
import { test as articlesTest } from './fixturesArticles';

export const test = mergeTests(authTest, articlesTest);

