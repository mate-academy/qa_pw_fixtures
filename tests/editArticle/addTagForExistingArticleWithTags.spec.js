import { test } from '../_fixtures/fixtures';
import { faker } from '@faker-js/faker';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.beforeEach(async ({ page, user, articleWithOneTag }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithOneTag);
});

test('Add the tag for the existing article with tags', async ({
  viewArticlePage,
  createArticlePage,
  articleWithOneTag,
}) => {
  const tag = faker.lorem.word();

  await viewArticlePage.clickEditArticleButton();

  await createArticlePage.fillTagsField(tag);
  await createArticlePage.clickUpdateArticleButton();

  await viewArticlePage.waitFor();
  await viewArticlePage.reload();
  await viewArticlePage.assertArticleTitleIsVisible(articleWithOneTag.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithOneTag.text);
  await viewArticlePage.assertArticleTagListIsVisible(tag);
});
