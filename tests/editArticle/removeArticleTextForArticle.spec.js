import {test} from '../_fixtures/fixtures'
import { signUpUser } from "../../src/ui/actions/auth/signUpUser"
import { createNewArticle } from "../../src/ui/actions/article/createNewArticle"
import { BODY_CANNOT_BE_EMPTY } from "../../src/ui/constants/articleErrorMessages"

test.beforeEach(async ({page, user, articleWithoutTags}) =>{
  await signUpUser(page, user)
  await createNewArticle(page, articleWithoutTags)
})

test('Remove the article text for the existing article', async ({viewArticlePage, createArticlePage}) => {
  let emptyText = '';

  await viewArticlePage.clickOnEditArticleButton();
  
  await createArticlePage.fillTextField(emptyText);
  await createArticlePage.clickUpdateArticleButton();
  await createArticlePage.assertErrorMessageContainsText(BODY_CANNOT_BE_EMPTY);
})