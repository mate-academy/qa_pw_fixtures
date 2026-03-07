import { mergeTests } from '@playwright/test';
import { test as authTest } from './fixturesAuth';
import { test as genericTest } from './fixturesGeneric';
import { test as articlePages } from './fixturesArticlePages';
import { test as articleWithOneTag } from './fixturesArticleWithOneTag';
import { test as articleWithTwoTags } from './fixturesArticleWithTwoTags';
import { test as articleWithoutTags } from './fixturesArticleWithoutTags';

export const test = mergeTests(
  authTest, 
  genericTest, 
  articlePages,
  articleWithOneTag,
  articleWithTwoTags,
  articleWithoutTags
);
