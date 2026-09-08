import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { faker } from '@faker-js/faker';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';

test.beforeEach(async ({ page, user, articleWithoutTags }) => {

  await signUpUser(page, user);
  await createNewArticle(page, articleWithoutTags);
});

test('Edit the text of an existing article', async ({
  createArticlePage,
  editArticlePage,
  viewArticlePage,
}) => {
  const newText = faker.lorem.sentences(2);
 
  await viewArticlePage.clickEditArticleButton();
  await createArticlePage.fillTextField(newText);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTextIsVisible(newText);
});