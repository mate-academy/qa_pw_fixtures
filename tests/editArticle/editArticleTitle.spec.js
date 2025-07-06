import { expect } from '@playwright/test';
import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';

test('Edit the article title for the existing article', 
  async ({ page, user, logger, editArticlePage }) => {
  
  const article = generateNewArticleData(logger, 1);
  const updatedTitle = 'Updated Article Title';

  await signUpUser(page, user);
  const articleSlug = await createNewArticle(page, article);

  await editArticlePage.open(articleSlug);
  await editArticlePage.fillTitleField(updatedTitle);
  await editArticlePage.clickUpdateArticleButton();

  await expect(page.locator('h1')).toHaveText(updatedTitle);
});