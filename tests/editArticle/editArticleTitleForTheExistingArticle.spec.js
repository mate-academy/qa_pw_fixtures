import { test } from '../_fixtures/fixtures';
import { faker } from '@faker-js/faker';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.beforeEach(async ({ page, user, articleWithoutTags }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithoutTags);
});

test('Edit the article title for the existing article', async ({
  viewArticlePage,
  createArticlePage,
  articleWithoutTags,
}) => {
  const updatedTitle = faker.lorem.word();

  await viewArticlePage.clickEditArticleButton();

  await createArticlePage.fillTitleField(updatedTitle);
  await createArticlePage.clickUpdateArticleButton();

  await viewArticlePage.waitFor();
  await viewArticlePage.reload();
  await viewArticlePage.assertArticleTitleIsVisible(updatedTitle);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
});
