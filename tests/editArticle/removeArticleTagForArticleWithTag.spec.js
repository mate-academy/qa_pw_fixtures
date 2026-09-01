import {test} from '../_fixtures/fixtures'
import { signUpUser } from "../../src/ui/actions/auth/signUpUser"
import { createNewArticle } from "../../src/ui/actions/article/createNewArticle"


test.beforeEach(async ({page, user, articleWithTwoTags}) =>{
  await signUpUser(page, user)
  await createNewArticle(page, articleWithTwoTags)
})

test('Remove an article tag for the existing article with tag', async ({viewArticlePage, createArticlePage, articleWithTwoTags}) => {
  await viewArticlePage.clickOnEditArticleButton();

  let deleteTag = articleWithTwoTags.tags[1];

  await createArticlePage.deleteAddedTag(deleteTag);
  await createArticlePage.clickUpdateArticleButton();
  
  await viewArticlePage.page.waitForURL('**/article/**');
  await viewArticlePage.page.reload();
  await viewArticlePage.assertArticleTagIsVisible(articleWithTwoTags.tags[0]);
  await viewArticlePage.assertArticleHasNotTag(deleteTag);

})