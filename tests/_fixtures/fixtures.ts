import { mergeTests } from '@playwright/test';
import { test as authTest } from './fixturesAuth';
import { test as genericTest } from './fixturesGeneric';
import { test as createArticlePage } from './fixturesArticles';
import { test as viewArticlePage } from './fixturesArticles';
import { test as editArticlePage } from './fixturesArticles';
import { test as articleWithoutTags } from './fixturesArticles';
import { test as articleWithOneTag } from './fixturesArticles';
import { test as articleWithTwoTags } from './fixturesArticles';

export const test = mergeTests(
  authTest,
  genericTest,
  createArticlePage,
  viewArticlePage,
  editArticlePage,
  articleWithoutTags,
  articleWithOneTag,
  articleWithTwoTags,
);
