import { test } from '../_fixtures/fixtures';
import { faker } from '@faker-js/faker';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

let newDescription = faker.lorem.words();

test.beforeEach(async ({ page, user, articleWithoutTags}) => {

  await signUpUser(page, user);
  await createNewArticle(page, articleWithoutTags);
});

test('Edit the article description for the existing article', async ({
  viewArticlePage, editArticlePage, articleWithoutTags
}) => {
  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.clickEditArticleButton();  
  await editArticlePage.fillArticleDescriptionWithNewData(newDescription);
  await editArticlePage.clickUpdateArticleButton();
}); 