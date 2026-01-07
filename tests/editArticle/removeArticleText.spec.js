import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { TEXT_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

test.beforeEach(async ({ page, user, homePage, articleWithoutTags }) => {
  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
  await createNewArticle(page, articleWithoutTags);
});

test('Remove the article text for the existing article', async ({ viewArticlePage, editArticlePage }) => {
  await viewArticlePage.clickEditArticleLink();
  await editArticlePage.clearTextField();
  await editArticlePage.clickUpdateArticleButton();

  await editArticlePage.assertErrorMessageContainsText(TEXT_CANNOT_BE_EMPTY);
});
