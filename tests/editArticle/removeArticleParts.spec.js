import { test } from '../../tests/_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser'
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle'
import { articleFieldName } from '../../src/common/enums/articleFields'
import {
  TITLE_CANNOT_EMPTY,
  BODY_CANNOT_EMPTY,
  DESCRIPTION_CANNOT_EMPTY,
} from '../../src/ui/constants/articleEditErrorMessages';


test.describe('Remove article parts in existing article', () => {

  test.beforeEach(async ({page, homePage, user}) => {
    await signUpUser(page, user);
    await homePage.clickNewArticleLink();
  });

  test('Remove an article tag for the existing article with tag', async ({
    page,
    articleWithOneTag,
    editArticlePage,
    viewArticlePage
  }) => {
    const removeTag = articleWithOneTag.tags[0];

    await createNewArticle(page, articleWithOneTag, true);
    await viewArticlePage.clickEditArticle();
    await editArticlePage.removeArticleTag(removeTag);
    await editArticlePage.clickUpdateArticleButton();
    await viewArticlePage.refreshPageForUpdateArticlePage();

    await viewArticlePage.assertArticleTagIsHidden(removeTag);
  });

  test('Remove an article title for the existing article', async ({
    page,
    articleWithOneTag,
    editArticlePage,
    viewArticlePage
   }) => {

    await createNewArticle(page, articleWithOneTag, true);
    await viewArticlePage.clickEditArticle();
    await editArticlePage.removeArticleChoiceField(articleFieldName.title);
    await editArticlePage.clickUpdateArticleButton();

    await editArticlePage.assertArticleFieldValidationError(TITLE_CANNOT_EMPTY);
  });

  test('Remove an article description for the existing article', async ({
    page,
    articleWithOneTag,
    editArticlePage,
    viewArticlePage
  }) => {

    await createNewArticle(page, articleWithOneTag, true);
    await viewArticlePage.clickEditArticle();
    await editArticlePage.removeArticleChoiceField(
      articleFieldName
      .description,
    );
    await editArticlePage.clickUpdateArticleButton();

    await editArticlePage.assertArticleFieldValidationError(
      DESCRIPTION_CANNOT_EMPTY,
    );
  });

  test('Remove the article text for the existing article', async ({
    page,
    articleWithOneTag,
    editArticlePage,
    viewArticlePage
  }) => {

    await createNewArticle(page, articleWithOneTag, true);
    await viewArticlePage.clickEditArticle();
    await editArticlePage.removeArticleChoiceField(articleFieldName.body);
    await editArticlePage.clickUpdateArticleButton();
    
    await editArticlePage.assertArticleFieldValidationError(BODY_CANNOT_EMPTY);
  });
});
