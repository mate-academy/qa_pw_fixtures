import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Add tag for an article without tags', async ({
  page,
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

  await editArticlePage.fillTagField(articleWithOneTag.tags[0]);
  await page.keyboard.press('Enter');
  await editArticlePage.clickUpdateArticleButton();

  await viewArticlePage.editArticleButtonClick();

  await editArticlePage.assertArticleTagsIsVisible(articleWithOneTag.tags[0]);
});
