import { test } from "../_fixtures/fixtures";
import { signUpUser } from "../../src/ui/actions/auth/signUpUser";

test.beforeEach(async ({ page, user, articleWithoutTags, homePage, createArticlePage, viewArticlePage }) => {
  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
  await createArticlePage.createArticleWithInfo(articleWithoutTags);
  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
});
test('Add the tag for the existing article without tags', async ({createArticlePage, viewArticlePage, articleWithTwoTags }) => {
  await viewArticlePage.clickEditArticle();
  
  await createArticlePage.addArticleTags(articleWithTwoTags.tags);
  await createArticlePage.clickUpdateArticleButton();

  await viewArticlePage.clickEditArticle();
  await createArticlePage.assertTagsListContainsTags(articleWithTwoTags.tags);
});