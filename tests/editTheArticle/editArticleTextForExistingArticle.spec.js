import { test } from '../_fixtures/fixtures';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.beforeEach(
  async ({ page, viewArticlePage, articleWithOneTag, logger }) => {
    const user = generateNewUserData(logger);

    await signUpUser(page, user);
    await createNewArticle(page, articleWithOneTag);
    await viewArticlePage.assertArticleTitleIsVisible(articleWithOneTag.title);
  },
);

test('Edit the article text for the existing article', async ({
  page,
  viewArticlePage,
  editArticlePage,
  articleWithOneTag,
}) => {
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.editArticleTextField(articleWithOneTag.text);
  await editArticlePage.clickUpdateArticleButton();

  await page.waitForURL('**/article/**');
  await page.reload();

  await viewArticlePage.assertArticleTextIsVisible(articleWithOneTag.text);
});
