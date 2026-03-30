import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.beforeEach(async ({ page, user, articleWithOneTag }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithOneTag);
});

test('Edit article description for existing article', 
  async ({ articleWithOneTag, articleWithoutTags, 
    viewArticlePage, editArticlePage }) => {
  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.fillDescriptionField(articleWithoutTags.description);
  await editArticlePage.clickUpdateArticleButton();

  await viewArticlePage.assertArticleTitleIsVisible(articleWithOneTag.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithOneTag.text);
  await viewArticlePage.assertTagsAreVisible(articleWithOneTag.tags);
});
