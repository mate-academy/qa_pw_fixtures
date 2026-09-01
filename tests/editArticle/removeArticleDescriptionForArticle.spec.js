import {test} from '../_fixtures/fixtures'
import { signUpUser } from "../../src/ui/actions/auth/signUpUser"
import { createNewArticle } from "../../src/ui/actions/article/createNewArticle"
import { DESCRIPTION_CANNOT_BE_EMPTY } from "../../src/ui/constants/articleErrorMessages"


test.beforeEach(async ({page, user, articleWithoutTags}) =>{
  await signUpUser(page, user)
  await createNewArticle(page, articleWithoutTags)
})

test('Remove an article description for the existing article', async ({viewArticlePage, createArticlePage}) => {
  let emptyDescription = '';
  
  await viewArticlePage.clickOnEditArticleButton();
  
  await createArticlePage.fillDescriptionField(emptyDescription);
  await createArticlePage.clickUpdateArticleButton();
  await createArticlePage.assertErrorMessageContainsText(DESCRIPTION_CANNOT_BE_EMPTY);
})