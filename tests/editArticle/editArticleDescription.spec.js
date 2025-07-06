import { expect } from '@playwright/test';
import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';

test('Edit the article description for the existing article', 
  async ({ page, user, logger, editArticlePage }) => {
    
  const updatedDescription = 'Updated article description for testing.';
  const article = generateNewArticleData(logger, 1); // article with 1 tag

  await signUpUser(page, user);
  const articleSlug = await createNewArticle(page, article);

  await editArticlePage.open(articleSlug);
  await editArticlePage.fillDescriptionField(updatedDescription);

  await Promise.all([
    page.waitForURL('**/article/**'),
    editArticlePage.clickUpdateArticleButton(),
  ]);

  await editArticlePage.open(articleSlug);
  await expect(editArticlePage.descriptionField)
  .toHaveValue(updatedDescription);
});
