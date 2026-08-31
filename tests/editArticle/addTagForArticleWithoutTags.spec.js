import { test } from '../_fixtures/fixtures';
import { signUpUser } from "../../src/ui/actions/auth/signUpUser";
import { createNewArticle } from "../../src/ui/actions/article/createNewArticle";
import { faker } from "@faker-js/faker";

test.beforeEach(async ({page, user, articleWithoutTags}) =>{
  await signUpUser(page, user)
  await createNewArticle(page, articleWithoutTags)
})

test('Add the tag for the existing article without tags', async ({viewArticlePage, createArticlePage}) => {
  let newTag = faker.lorem.word();

  await viewArticlePage.clickOnEditArticleButton();
  
  await createArticlePage.addArticleTag(newTag);
  await createArticlePage.clickUpdateArticleButton();
  
  await viewArticlePage.page.waitForURL('**/article/**');
  await viewArticlePage.page.reload();
  await viewArticlePage.assertArticleTagIsVisible(newTag);
})