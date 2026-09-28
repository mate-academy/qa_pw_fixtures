import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test('Edit the article text for the existing article', async ({   
  page,
  user,
  viewArticlePage,
  editArticlePage,
  articleWithoutTags,
  articleWithOneTag,
}) => {

  const newText = articleWithOneTag.text;

    await signUpUser(page, user);
    await createNewArticle(page, articleWithoutTags);

    await viewArticlePage.clickEditArticleButton();

    await editArticlePage.fillTextField(newText);
    await editArticlePage.clickUpdateArticleButton();

    await viewArticlePage.assertArticleTextIsVisible(newText);
});
