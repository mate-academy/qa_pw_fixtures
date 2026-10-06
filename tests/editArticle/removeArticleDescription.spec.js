import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { ARTICLE_DESCRIPTION_REQUIRED } from '../../src/ui/constants/articleErrorMessages';

test(
  'Remove an article description for the existing article',
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

    await editArticlePage.clearDescriptionField();

    await editArticlePage.clickUpdateArticleButtonWithoutNavigation();

    await editArticlePage.assertErrorMessageContainsText(
      ARTICLE_DESCRIPTION_REQUIRED,
    );
  },
);
