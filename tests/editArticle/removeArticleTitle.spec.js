import { expect } from '@playwright/test';
import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { TITLE_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

test('Remove the article title for the existing article', 
  async ({ page, user, logger, editArticlePage }) => {

  const article = generateNewArticleData(logger);
  const articleSlug = await (async () => {
    await signUpUser(page, user);
    return await createNewArticle(page, article);
  })();

  await editArticlePage.open(articleSlug);
  await editArticlePage.fillTitleField('');
  await editArticlePage.clickUpdateArticleButton();

  await expect(page.getByText(TITLE_CANNOT_BE_EMPTY)).toBeVisible();
});