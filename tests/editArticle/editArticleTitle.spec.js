import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test(
  'Edit the article title for the existing article',
  async ({
    page,
    user,
    articleWithOneTag,
    viewArticlePage,
    editArticlePage,
  }) => {
    const updatedTitle = 'Updated article title';

    await signUpUser(page, user);
    await createNewArticle(page, articleWithOneTag);

    await viewArticlePage.clickEditArticleButton();

    await editArticlePage.clearTitleField();
    await editArticlePage.fillTitleField(updatedTitle);

    await editArticlePage.assertTitleFieldContainsText(updatedTitle);

    await editArticlePage.clickUpdateArticleButton();

    await viewArticlePage.assertArticleTitleIsVisible(updatedTitle);
  },
);
