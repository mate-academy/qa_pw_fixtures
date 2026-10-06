import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { ARTICLE_TITLE_REQUIRED } from '../../src/ui/constants/articleErrorMessages';

test(
  'Remove an article title for the existing article',
  async ({
    page,
    user,
    articleWithoutTags,
    viewArticlePage,
    editArticlePage,
  }) => {
    await signUpUser(page, user);
    await createNewArticle(page, articleWithoutTags);

    await viewArticlePage.clickEditArticleButton();

    await editArticlePage.clearTitleField();

    await editArticlePage.clickUpdateArticleButtonWithoutNavigation();

    await editArticlePage.assertErrorMessageContainsText(
      ARTICLE_TITLE_REQUIRED,
    );
  },
);
