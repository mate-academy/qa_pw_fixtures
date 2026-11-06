import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { TEXT_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

test.beforeEach(
  async ({ page, user, homePage, viewArticlePage, articleWithoutTags }) => {
    await signUpUser(page, user);

    await homePage.clickNewArticleLink();
    await createNewArticle(page, articleWithoutTags);
    await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  },
);

test('Remove the article text for the existing article', async ({
  viewArticlePage,
  createArticlePage,
  articleWithoutTags,
}) => {
  await viewArticlePage.clickEditArticleLink();
  await createArticlePage.assertTextFieldHasValue(articleWithoutTags.text);

  await createArticlePage.fillTextField('');
  await createArticlePage.clickUpdateArticleButtonWithoutWaiting();

  await createArticlePage.assertErrorMessageContainsText(TEXT_CANNOT_BE_EMPTY);
});
