import { mergeTests } from '@playwright/test';
import { test as authTest } from './fixturesAuth';
import { test as articleTest } from './fixturesArticle';
import { test as genericTest } from './fixturesGeneric';

export const test = mergeTests(authTest, articleTest, genericTest);
