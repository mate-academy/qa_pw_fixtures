import { test } from '../_fixtures/fixtures';
import { faker } from '@faker-js/faker';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.beforeEach(async ({ page, user, articleWithoutTags }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithoutTags);
});

test('Edit the article text for the existing article', async ({
  viewArticlePage,
  editArticlePage,
  articleWithoutTags,
}) => {
  const updatedText = faker.lorem.sentences();

  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.fillTextField(updatedText);
  await editArticlePage.clickUpdateArticleButton();

  await viewArticlePage.waitFor();
  await viewArticlePage.reload();
  await viewArticlePage.assertArticleTextIsVisible(updatedText);
  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
});
