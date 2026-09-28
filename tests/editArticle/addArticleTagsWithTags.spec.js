import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test('Add a tag for the existing article with tags', async ({ 
  page,
  user,
  viewArticlePage,
  editArticlePage,
  articleWithOneTag,
}) => {
  const newTag = 'playwright';

  await signUpUser(page, user);
  await createNewArticle(page, articleWithOneTag);

  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.fillTagsField(newTag);
  await editArticlePage.clickUpdateArticleButton();

  await viewArticlePage.assertTagIsVisible(newTag);
  for (const existingTag of articleWithOneTag.tags) {
    await viewArticlePage.assertTagIsVisible(existingTag);
  }
});
