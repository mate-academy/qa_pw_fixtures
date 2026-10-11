import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Add the tag for the existing article with tags', async ({
  homePage,
  createArticlePage,
  viewArticlePage,
  editArticlePage,
  articleWithOneTag,
}) => {
  await homePage.clickNewArticleLink();
  await test.step('Create a new article with tags', async () => {
    await createNewArticle(createArticlePage, articleWithOneTag);
  });

  const tags = ['tag1'];

  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.assertFormIsPrefilled(articleWithOneTag);
  await editArticlePage.fillTagsField(tags);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTagsAreVisible(tags);
  await viewArticlePage.assertArticleTagsAreVisible(articleWithOneTag.tags);
});

test('Remove an article tag for the existing article with tag', async ({
  homePage,
  createArticlePage,
  viewArticlePage,
  editArticlePage,
  articleWithTwoTags,
}) => {
  await homePage.clickNewArticleLink();
  await test.step('Create a new article with tags', async () => {
    await createNewArticle(createArticlePage, articleWithTwoTags);
  });

  const removedTag = articleWithTwoTags.tags[0];
  const remainingTags = articleWithTwoTags.tags.slice(1);

  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.assertFormIsPrefilled(articleWithTwoTags);
  await editArticlePage.clickTagDeleteButton(removedTag);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.waitForViewArticlePageToBeVisible();
  await viewArticlePage.assertArticleTagsAreVisible(remainingTags);
  await viewArticlePage.assertArticleTagIsNotVisible(removedTag);
});
