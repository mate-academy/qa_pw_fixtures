import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { TITLE_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

test.beforeEach(
  async ({ page, user, logger, homePage, createArticlePage, article }) => {
    await signUpUser(page, user, logger);

    await homePage.clickNewArticleLink();
    await createArticlePage.fillTitleField(article.title);
    await createArticlePage.fillDescriptionField(article.description);
    await createArticlePage.fillTextField(article.text);
    await createArticlePage.clickPublishArticleButton();
  },
);

test('Remove an article title for the existing article', async ({
  viewArticlePage,
  createArticlePage,
  editArticlePage,
}) => {
  await viewArticlePage.clickEditArticleButton();
  await createArticlePage.fillTitleField('');
  await editArticlePage.clickEditArticleButton();

  await createArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});
