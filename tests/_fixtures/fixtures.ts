import { mergeTests } from '@playwright/test';
import { test as authTest } from './fixturesAuth';
import { test as genericTest } from './fixturesGeneric';
import { testExtended as articlesFixtures } from './fixturesArticles';
import { test as loggerTest } from './fixturesLogger'; // ✅ include logger fixture

// ✅ Merge all fixture groups, including logger
export const test = mergeTests(authTest, genericTest, articlesFixtures, loggerTest);
export const expect = articlesFixtures.expect;
