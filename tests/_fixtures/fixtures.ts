import { mergeTests } from '@playwright/test';
import { test as authTest } from './fixturesAuth';
import { test as genericTest } from './fixturesGeneric';
import { test as articlesFixtures } from './fixturesArticles';

// Merge all fixture groups into one
export const test = mergeTests(authTest, genericTest, articlesFixtures);
export const expect = articlesFixtures.expect;
