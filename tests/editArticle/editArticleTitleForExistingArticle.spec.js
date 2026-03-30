import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';


test.beforeEach(async ({ page, user, articleWithTwoTags }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithTwoTags);
});

test('Edit article title for existing article', 
  async ({ page, articleWithTwoTags, articleWithoutTags, 
    viewArticlePage, editArticlePage }) => {
  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.fillTitleField(articleWithoutTags.title);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTextIsVisible(articleWithTwoTags.text);
  await viewArticlePage.assertTagsAreVisible(articleWithTwoTags.tags);
  await page.reload({ waitUntil: 'commit' });
  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
});
