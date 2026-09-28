import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test('Edit the article description for the existing article', async ({
  page,
  user,
  viewArticlePage,
  editArticlePage,
  articleWithoutTags,
  articleWithOneTag,
}) => {

  const newDescription = articleWithOneTag.description;

  await signUpUser(page, user);
  await createNewArticle(page, articleWithoutTags);

  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillDescriptionField(newDescription);
  await editArticlePage.clickUpdateArticleButton();

  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.assertDescriptionFieldHasValue(newDescription);
});
