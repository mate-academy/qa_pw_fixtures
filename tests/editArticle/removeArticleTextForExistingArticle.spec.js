import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { TEXT_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

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

test('Remove the article text for the existing article', async ({
  viewArticlePage,
  createArticlePage,
  editArticlePage,
}) => {
  await viewArticlePage.clickEditArticleButton();
  await createArticlePage.fillTextField('');
  await editArticlePage.clickEditArticleButton();

  await createArticlePage.assertErrorMessageContainsText(TEXT_CANNOT_BE_EMPTY);
});
