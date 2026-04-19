import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';


test.beforeEach(async ({ page, user, articleWithOneTag }) => {

  await signUpUser(page, user);
  await createNewArticle(page, articleWithOneTag);
});

test('Remove the tag for the existing article with tags', async ({
  viewArticlePage, editArticlePage, articleWithOneTag
}) => {
  await viewArticlePage.assertArticleTitleIsVisible(articleWithOneTag.title);
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.removeTag(articleWithOneTag.tags[0]);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTitleIsVisible(articleWithOneTag.title);
  await viewArticlePage.assertArticleRemovedTagIsNotVisible(
    articleWithOneTag.tags[0]);
}); 