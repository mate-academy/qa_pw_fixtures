import { mergeTests } from '@playwright/test';
import { test as authTest } from './fixturesAuth';
import { test as genericTest } from './fixturesGeneric';
import { test as article } from '../../tests/_fixtures/fixturesArticles'

export const test = mergeTests(authTest, genericTest, article);
