import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test('Remove an article tag for the existing article with tag', async ({
   page,
  user,
  viewArticlePage,
  editArticlePage,
  articleWithOneTag,
}) => {
  
  await signUpUser(page, user);
  await createNewArticle(page, articleWithOneTag);

  await viewArticlePage.assertTagIsVisible(articleWithOneTag.tags[0]);

  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.removeTag(articleWithOneTag.tags[0]);
  await editArticlePage.clickUpdateArticleButton();

  await viewArticlePage.assertTagIsNotVisible(articleWithOneTag.tags[0]);
});
