import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import {
  TITLE_CANNOT_BE_EMPTY,
  DESCRIPTION_CANNOT_BE_EMPTY,
  BODY_CANNOT_BE_EMPTY,
} from '../../src/ui/constants/articleErrorMessages';

test.beforeEach(
  async ({
    page,
    user,
    homePage,
    createArticlePage,
    editArticlePage,
    viewArticlePage,
    articleWithOneTag,
  }) => {
    await signUpUser(page, user);
    await homePage.clickNewArticleLink();
    //  await createNewArticle(page, articleWithOneTag);
    await createNewArticle({
      article: articleWithOneTag,
      createArticlePage,
      viewArticlePage,
    });
    await editArticlePage.clickEditArticle();
  },
);

test.describe('Remove fields of the existing article', () => {
  test('Remove the tag for the existing article', async ({
    editArticlePage,
    viewArticlePage,
  }) => {
    await editArticlePage.removeTags();
    await editArticlePage.clickUpdateArticleButton();
    await viewArticlePage.assertRemovedTag();
  });

  test('Remove an article title for the existing article', async ({
    editArticlePage,
  }) => {
    await editArticlePage.clearInput('titleField');
    await editArticlePage.clickUpdateArticleButton();
    await editArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
  });

  test('Remove an article description for the existing article', async ({
    editArticlePage,
  }) => {
    await editArticlePage.clearInput('descriptionField');
    await editArticlePage.clickUpdateArticleButton();
    await editArticlePage.assertErrorMessageContainsText(
      DESCRIPTION_CANNOT_BE_EMPTY,
    );
  });

  test('Remove the article text for the existing article', async ({
    editArticlePage,
  }) => {
    await editArticlePage.clearInput('textField');
    await editArticlePage.clickUpdateArticleButton();
    await editArticlePage.assertErrorMessageContainsText(BODY_CANNOT_BE_EMPTY);
  });
});
