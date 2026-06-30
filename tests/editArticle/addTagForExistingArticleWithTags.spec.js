import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Add tag for an article with tag', async ({
  page,
  createArticlePage,
  viewArticlePage,
  editArticlePage,
  articleWithTwoTags,
  articleWithOneTag,
  homePage
}) => {
  await homePage.clickNewArticleLink();

  await createNewArticle(createArticlePage, articleWithOneTag);
  await createArticlePage.clickPublishArticleButton();

  await viewArticlePage.assertArticleTitleIsVisible(articleWithOneTag.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithOneTag.text);

  await viewArticlePage.editArticleButtonClick();

  await editArticlePage.fillTagField(articleWithTwoTags.tags[0]);
  await page.keyboard.press('Enter');
  await editArticlePage.clickUpdateArticleButton();

  await viewArticlePage.editArticleButtonClick();

  await editArticlePage.assertArticleTagsIsVisible(articleWithTwoTags.tags[0]);
});