import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { DESCRIPTION_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Remove article description', async ({
  createArticlePage,
  viewArticlePage,
  editArticlePage,
  articleWithoutTags,
  homePage
}) => {
  await homePage.clickNewArticleLink();

  await createNewArticle(createArticlePage, articleWithoutTags);
  await createArticlePage.clickPublishArticleButton();

  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);

  await viewArticlePage.editArticleButtonClick();

  await editArticlePage.fillDescriptionField('');
  await editArticlePage.clickUpdateArticleButton();

  await editArticlePage.
  assertErrorMessageContainsText(DESCRIPTION_CANNOT_BE_EMPTY);
});