import { mergeTests } from '@playwright/test';
import { test as authTest } from './fixturesAuth';
import { test as genericTest } from './fixturesGeneric';
import { test as articleFixtures } from './fixturesArticles';

export const test = mergeTests(authTest, genericTest, articleFixtures);
