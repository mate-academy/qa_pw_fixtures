import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Remove article tag', async ({
  createArticlePage,
  viewArticlePage,
  editArticlePage,
  articleWithOneTag,
  homePage
}) => {
  await homePage.clickNewArticleLink();

  await createNewArticle(createArticlePage, articleWithOneTag);
  await createArticlePage.clickPublishArticleButton();

  await viewArticlePage.assertArticleTitleIsVisible(articleWithOneTag.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithOneTag.text);

  await viewArticlePage.editArticleButtonClick();

  await editArticlePage.deleteLastTag();
  await editArticlePage.clickUpdateArticleButton();

  await viewArticlePage.editArticleButtonClick();

  await editArticlePage.assertArticleTagsIsNotVisible();
});