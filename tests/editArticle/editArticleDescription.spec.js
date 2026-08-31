import { test }  from '../_fixtures/fixtures'
import { signUpUser } from "../../src/ui/actions/auth/signUpUser"
import { createNewArticle } from "../../src/ui/actions/article/createNewArticle"
import { faker } from "@faker-js/faker"

test.beforeEach(async ({page, user, articleWithoutTags}) =>{
  await signUpUser(page, user)
  await createNewArticle(page, articleWithoutTags)
})

test('Edit article description', async ({viewArticlePage, createArticlePage, homePage, profilePage}) => {
  let newDescription = faker.lorem.sentence();

  await viewArticlePage.clickOnEditArticleButton();
  
  await createArticlePage.fillDescriptionField(newDescription);
  await createArticlePage.clickUpdateArticleButton();

  await homePage.clickOnYourProfileLink();

  await profilePage.page.reload();
  await profilePage.assertArticleDescriptionIsVisible(newDescription)

})