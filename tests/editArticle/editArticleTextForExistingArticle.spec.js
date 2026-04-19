import { test } from '../_fixtures/fixtures';
import { faker } from '@faker-js/faker';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

let newText = faker.lorem.words();

test.beforeEach(async ({ page, user, articleWithoutTags }) => {

  await signUpUser(page, user);
  await createNewArticle(page, articleWithoutTags);
});

test('Edit the article text for the existing article', async ({
  viewArticlePage, editArticlePage, articleWithoutTags
}) => {
  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.clickEditArticleButton();  
  await editArticlePage.fillArticleTextWithNewData(newText);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTextIsVisible(newText);
}); 