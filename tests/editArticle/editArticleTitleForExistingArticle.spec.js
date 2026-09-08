import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { faker } from '@faker-js/faker';
test.beforeEach(async ({ page, user, articleWithoutTags }) => {

  await signUpUser(page, user);
  await createNewArticle(page, articleWithoutTags);
});

test('Edit the title of an existing article', async ({ 
  createArticlePage, 
  editArticlePage, 
  viewArticlePage 
}) => {
  const newTitle = faker.lorem.words(3);  

  await viewArticlePage.clickEditArticleButton();
  await createArticlePage.fillTitleField(newTitle);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTitleIsVisible(newTitle);
});