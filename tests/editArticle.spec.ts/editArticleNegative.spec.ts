import { test } from '../_fixtures/fixturesArticles';
import {
  TITLE_CANNOT_BE_EMPTY,
  DESCRIPTION_CANNOT_BE_EMPTY,
  TEXT_CANNOT_BE_EMPTY,
} from '../../src/ui/constants/articleErrorMessages';
import createNewArticle, {
  ArticleData,
} from '../../src/ui/actions/article/createNewArticle';

test.describe('Edit Article Negative Tests', () => {
  test('Remove title', async ({
    createArticlePage,
    viewArticlePage,
    editArticlePage,
    articleWithTwoTags,
  }) => {
    await createNewArticle(
      createArticlePage,
      viewArticlePage,
      articleWithTwoTags,
    );
    await viewArticlePage.clickEditArticleButton();

    await editArticlePage.fillTitleField('');
    await editArticlePage.clickUpdateArticleButton();
    await editArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
  });

  test('Remove description', async ({
    createArticlePage,
    viewArticlePage,
    editArticlePage,
    articleWithTwoTags,
  }) => {
    await createNewArticle(
      createArticlePage,
      viewArticlePage,
      articleWithTwoTags,
    );
    await viewArticlePage.clickEditArticleButton();

    await editArticlePage.fillDescriptionField('');
    await editArticlePage.clickUpdateArticleButton();
    await editArticlePage.assertErrorMessageContainsText(
      DESCRIPTION_CANNOT_BE_EMPTY,
    );
  });

  test('Remove text', async ({
    createArticlePage,
    viewArticlePage,
    editArticlePage,
    articleWithTwoTags,
  }) => {
    await createNewArticle(
      createArticlePage,
      viewArticlePage,
      articleWithTwoTags,
    );
    await viewArticlePage.clickEditArticleButton();

    await editArticlePage.fillTextField('');
    await editArticlePage.clickUpdateArticleButton();
    await editArticlePage.assertErrorMessageContainsText(TEXT_CANNOT_BE_EMPTY);
  });
});
