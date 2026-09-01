import {test} from '../_fixtures/fixtures'
import { signUpUser } from "../../src/ui/actions/auth/signUpUser"
import { createNewArticle } from "../../src/ui/actions/article/createNewArticle"
import { faker } from "@faker-js/faker"

test.beforeEach(async ({page, user, articleWithoutTags}) =>{
  await signUpUser(page, user)
  await createNewArticle(page, articleWithoutTags)
})

test('Edit article title', async ({viewArticlePage, createArticlePage}) => {
  let newTitle = faker.lorem.words();

  await viewArticlePage.clickOnEditArticleButton();
  
  await createArticlePage.fillTitleField(newTitle);
  await createArticlePage.clickUpdateArticleButton();

  await viewArticlePage.page.waitForURL('**/article/**');
  await viewArticlePage.page.reload();
  await viewArticlePage.assertArticleTitleIsVisible(newTitle);
})