import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { TEXT_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

test.beforeEach(async ({ page, user, articleWithTwoTags }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithTwoTags);
});

test('Remove an article text for existing article', 
  async ({ viewArticlePage, editArticlePage }) => {
  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.clearArticleText();
  await editArticlePage.clickUpdateArticleButton();

  await editArticlePage
    .assertErrorMessageContainsText(TEXT_CANNOT_BE_EMPTY);
});
