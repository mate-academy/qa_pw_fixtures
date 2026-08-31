import {test} from '../_fixtures/fixtures'
import { signUpUser } from "../../src/ui/actions/auth/signUpUser"
import { createNewArticle } from "../../src/ui/actions/article/createNewArticle"
import { TITLE_CANNOT_BE_EMPTY } from "../../src/ui/constants/articleErrorMessages"

test.beforeEach(async ({page, user, articleWithoutTags}) =>{
  await signUpUser(page, user)
  await createNewArticle(page, articleWithoutTags)
})

test('Remove an article title for the existing article', async ({viewArticlePage, createArticlePage}) => {
  let emptyTitle = '';

  await viewArticlePage.clickOnEditArticleButton();
  
  await createArticlePage.fillTitleField(emptyTitle);
  await createArticlePage.clickUpdateArticleButton();
  await createArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
})