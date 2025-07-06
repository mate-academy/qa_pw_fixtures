import { expect } from '@playwright/test';
import { test } from '../_fixtures/fixtures';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test('Add a tag to the existing article without tags', async ({
  page,
  logger,
  editArticlePage,
  user,
}) => {
  const newTag = 'e2e-test-tag';

  const article = generateNewArticleData(logger, 0);
  await signUpUser(page, user);
  const articleSlug = await createNewArticle(page, article);

  // Act
  await editArticlePage.open(articleSlug);
  await editArticlePage.fillTag(newTag);
  await editArticlePage.clickUpdateArticleButton();

  // Assert
  await expect(editArticlePage.page.locator('.tag-list')).toContainText(newTag);
});