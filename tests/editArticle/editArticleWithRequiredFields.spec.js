import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Edit the article title for the existing article', async ({
  page,
  articleWithoutTags,
  createArticlePage,
  viewArticlePage,
  articleWithOneTag,
}) => {
  await createNewArticle(page, articleWithoutTags);
  await viewArticlePage.articleEditClick();
  await createArticlePage.fillTitleField(articleWithOneTag.title);
  await createArticlePage.clickUpdateButton();
  await viewArticlePage.assertArticleHasUpdatedTitle(articleWithOneTag.title);
});

test('Edit the article description for the existing article', async ({
  page,
  articleWithoutTags,
  createArticlePage,
  viewArticlePage,
  articleWithOneTag,
}) => {
  await createNewArticle(page, articleWithoutTags);
  await viewArticlePage.articleEditClick();
  await createArticlePage.fillDescriptionField(articleWithOneTag.description);
  await createArticlePage.clickUpdateButton();
  await viewArticlePage.articleEditClick();
  await createArticlePage.assertArticleHasCorrectDescription(
    articleWithOneTag.description,
  );
});

test('Edit the article text for the existing article', async ({
  page,
  articleWithoutTags,
  createArticlePage,
  viewArticlePage,
  articleWithOneTag,
}) => {
  await createNewArticle(page, articleWithoutTags);
  await viewArticlePage.articleEditClick();
  await createArticlePage.fillTextField(articleWithOneTag.text);
  await createArticlePage.clickUpdateButton();
  await viewArticlePage.assertArticleHasUpdatedText(articleWithOneTag.text);
});

test('Add the tag for the existing article without tags', async ({
  page,
  articleWithoutTags,
  createArticlePage,
  viewArticlePage,
  articleWithOneTag,
}) => {
  await createNewArticle(page, articleWithoutTags);
  await viewArticlePage.articleEditClick();
  await createArticlePage.fillTagsField(articleWithOneTag.tags);
  await createArticlePage.clickUpdateButton();
  await viewArticlePage.assertArticleHasTags(articleWithOneTag.tags);
});

test('Add the tag for the existing article with tags', async ({
  page,
  articleWithOneTag,
  createArticlePage,
  viewArticlePage,
  articleWithTwoTags,
}) => {
  await createNewArticle(page, articleWithOneTag);
  await viewArticlePage.articleEditClick();
  await createArticlePage.fillTagsField(articleWithTwoTags.tags);
  await createArticlePage.clickUpdateButton();
  await viewArticlePage.assertArticleHasTags(articleWithTwoTags.tags);
});
