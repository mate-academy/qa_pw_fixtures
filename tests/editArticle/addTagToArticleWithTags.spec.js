import { expect } from '@playwright/test';
import { test } from '../_fixtures/fixtures'; // uses logger, user, editArticlePage
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test('Add a tag to the existing article with tags', async ({
  page,
  user,
  editArticlePage,
  logger,
}) => {
  const article = generateNewArticleData(logger, 1); 
  const initialTag = article.tags[0];
  const newTag = 'added-tag';

  // Arrange: Sign up and create the article
  await signUpUser(page, user);
  const articleSlug = await createNewArticle(page, article);

  // Act: Open edit page, add new tag, update
  await editArticlePage.open(articleSlug);
  await editArticlePage.fillTag(newTag);
  await editArticlePage.clickUpdateArticleButton();

  // Assert: Both original and new tags should be visible
  const tagLocator = page.locator('ul.tag-list');
  await expect(tagLocator).toContainText(initialTag);
  await expect(tagLocator).toContainText(newTag);
});
