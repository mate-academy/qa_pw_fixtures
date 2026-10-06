import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test(
  'Edit the article description for the existing article',
  async ({
    page,
    user,
    articleWithOneTag,
    viewArticlePage,
    editArticlePage,
  }) => {
    const updatedDescription = 'New description';

    await signUpUser(page, user);
    await createNewArticle(page, articleWithOneTag);

    await viewArticlePage.clickEditArticleButton();

    await editArticlePage.fillDescriptionField(updatedDescription);

    await editArticlePage.assertDescriptionFieldContainsText(
      updatedDescription,
    );

    await editArticlePage.clickUpdateArticleButton();

    await viewArticlePage.assertArticleDescriptionIsVisible(
      updatedDescription,
    );
  },
);
