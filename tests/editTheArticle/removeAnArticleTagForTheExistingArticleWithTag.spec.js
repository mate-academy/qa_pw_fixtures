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

test('Remove an article tag for the existing article with tag', async ({
  page,
  viewArticlePage,
  editArticlePage,
}) => {
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.removeArticleTag();
  await editArticlePage.clickUpdateArticleButton();

  await page.waitForURL('**/article/**');
  await page.reload();
});
