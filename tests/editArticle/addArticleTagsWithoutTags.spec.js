import { expect } from '@playwright/test';
import { test } from '../_fixtures/fixtures';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test('Add a tag for the existing article without tags', async ({
  page,
  user,
  viewArticlePage,
  editArticlePage,
  articleWithoutTags,
  articleWithOneTag,
}) => {
  const newTag = articleWithOneTag.tags[0];

  await signUpUser(page, user);
  await createNewArticle(page, articleWithoutTags);

  await expect(viewArticlePage.tagPills).toHaveCount(0);

  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.fillTagsField(newTag);
  await editArticlePage.clickUpdateArticleButton();

  await viewArticlePage.assertTagIsVisible(newTag);
});