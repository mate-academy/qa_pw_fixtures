import { test } from '../_fixtures/fixtures'
import { signUpUser } from "../../src/ui/actions/auth/signUpUser"
import { createNewArticle } from "../../src/ui/actions/article/createNewArticle"
import { faker } from "@faker-js/faker"


test.beforeEach(async ({page, user, articleWithoutTags}) =>{
  await signUpUser(page, user)
  await createNewArticle(page, articleWithoutTags)
})

test('Edit article text', async ({viewArticlePage, createArticlePage}) => {
  let newText = faker.lorem.paragraphs(4);

  await viewArticlePage.clickOnEditArticleButton();
  
  await createArticlePage.fillTextField(newText);
  await createArticlePage.clickUpdateArticleButton();

  await viewArticlePage.assertArticleTextIsVisible(newText);
})