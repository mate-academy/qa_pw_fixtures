import { test } from '../_fixtures/fixtures';

import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

import {
  TITLE_CANNOT_BE_EMPTY,
  DESCRIPTION_CANNOT_BE_EMPTY,
  TEXT_CANNOT_BE_EMPTY,
} from '../../src/ui/constants/articleErrorMessages';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Remove an article title for the existing article', async ({ page,
  articleWithoutTags,
  viewArticlePage,
  editArticlePage,
  createArticlePage
}) => {
  await createNewArticle(page, articleWithoutTags);

  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.fillTitleField('');

  await editArticlePage.clickUpdateArticleButton();

  await createArticlePage.assertErrorMessageContainsText(
    TITLE_CANNOT_BE_EMPTY
  );
});

test('Remove an article description for the existing article', async ({
  page,
  articleWithoutTags,
  viewArticlePage,
  editArticlePage,
  createArticlePage
}) => {
  await createNewArticle(page, articleWithoutTags);

  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.fillDescriptionField('');

  await editArticlePage.clickUpdateArticleButton();

  await createArticlePage.assertErrorMessageContainsText(
    DESCRIPTION_CANNOT_BE_EMPTY
  );
});

test('Remove the article text for the existing article', async ({ page,
  articleWithoutTags,
  viewArticlePage,
  editArticlePage,
  createArticlePage
}) => {
  await createNewArticle(page, articleWithoutTags);

  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.fillTextField('');

  await editArticlePage.clickUpdateArticleButton();

  await createArticlePage.assertErrorMessageContainsText(
    TEXT_CANNOT_BE_EMPTY
  );
});
