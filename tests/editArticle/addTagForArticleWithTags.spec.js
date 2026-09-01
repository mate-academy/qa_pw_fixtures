import { test } from '../_fixtures/fixtures';
import { signUpUser } from "../../src/ui/actions/auth/signUpUser"
import { createNewArticle } from "../../src/ui/actions/article/createNewArticle"
import { faker } from "@faker-js/faker"

test.beforeEach(async ({page, user, articleWithTwoTags}) =>{
  await signUpUser(page, user)
  await createNewArticle(page, articleWithTwoTags)
})

test('Add the tag for the existing article with tags', async ({viewArticlePage, createArticlePage, articleWithTwoTags}) => {
  let newTag = faker.lorem.word();

  await viewArticlePage.clickOnEditArticleButton();
  
  await createArticlePage.addArticleTag(newTag);
  await createArticlePage.clickUpdateArticleButton();
  
  await viewArticlePage.page.waitForURL('**/article/**');
  await viewArticlePage.page.reload();
  await viewArticlePage.assertArticleTagIsVisible(newTag);

  if (articleWithTwoTags.tags){
      for (let tag of articleWithTwoTags.tags) {
        await viewArticlePage.assertArticleTagIsVisible(tag)
      }
  }
})