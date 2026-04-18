import { mergeTests } from '@playwright/test';
import { test as authTest } from './fixturesAuth';
import { test as genericTest } from './fixturesGeneric';
import { test as articleTest } from './ArticleFixtures';

export const test = mergeTests(authTest, genericTest, articleTest);
