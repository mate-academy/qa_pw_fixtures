import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Edit description for an article', async ({
  createArticlePage,
  viewArticlePage,
  editArticlePage,
  articleWithoutTags,
  articleWithOneTag,
  homePage
}) => {
  await homePage.clickNewArticleLink();

  await createNewArticle(createArticlePage, articleWithoutTags);
  await createArticlePage.clickPublishArticleButton();

  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);

  await viewArticlePage.editArticleButtonClick();

  await editArticlePage.fillDescriptionField(articleWithOneTag.description);
  await editArticlePage.clickUpdateArticleButton();

  await viewArticlePage.editArticleButtonClick();

  await editArticlePage.
  assertArticleDescriptionIsVisible(articleWithOneTag.description);
});