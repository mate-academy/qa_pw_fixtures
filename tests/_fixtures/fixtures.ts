import { mergeTests, expect as playwrightExpect } from '@playwright/test';
import { test as authTest } from './fixturesAuth';
import { test as genericTest } from './fixturesGeneric';
import { testExtended as articlesFixtures } from './fixturesArticles';
import { test as loggerTest } from './logger';

// Merge all fixture groups
export const test = mergeTests(authTest, genericTest, articlesFixtures, loggerTest);

// Correct expect export
export const expect = playwrightExpect;
