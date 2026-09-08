import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { faker } from '@faker-js/faker';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';

test.beforeEach(async ({ page, user, articleWithoutTags }) => {

  await signUpUser(page, user);
  await createNewArticle(page, articleWithoutTags);
});

test('Edit the Description of an existing article', async ({
  page,
  createArticlePage,
  editArticlePage,
  articleWithoutTags,
}) => {
  const newDescription = faker.lorem.words(3);
  const viewArticlePage = new ViewArticlePage(page);    
 
  await viewArticlePage.clickEditArticleButton();
  await createArticlePage.fillDescriptionField(newDescription); 
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
});