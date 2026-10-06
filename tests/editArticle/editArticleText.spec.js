import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test(
  'Edit the article text for the existing article',
  async ({
    page,
    user,
    articleWithOneTag,
    viewArticlePage,
    editArticlePage,
  }) => {
    const updatedText = 'Updated article text';

    await signUpUser(page, user);
    await createNewArticle(page, articleWithOneTag);

    await viewArticlePage.clickEditArticleButton();

    await editArticlePage.fillTextField(updatedText);
    await editArticlePage.clickUpdateArticleButton();

    await viewArticlePage.assertArticleTextIsVisible(updatedText);
  },
);
