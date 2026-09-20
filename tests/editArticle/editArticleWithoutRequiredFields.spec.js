import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import {
  TITLE_CANNOT_BE_EMPTY,
  DESCRIPTION_CANNOT_BE_EMPTY,
  BODY_CANNOT_BE_EMPTY,
} from '../../src/ui/constants/articleErrorMessages';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Remove an article tag for the existing article with tag', async ({
  page,
  createArticlePage,
  viewArticlePage,
  articleWithOneTag,
}) => {
  await createNewArticle(page, articleWithOneTag);
  await viewArticlePage.articleEditClick();
  const tagRemove = articleWithOneTag.tags[0];
  await createArticlePage.removeTag(tagRemove);
  await createArticlePage.clickUpdateButton();
  await viewArticlePage.assertTagIsNotVisible(tagRemove);
});

test('Remove an article title for the existing article', async ({
  page,
  createArticlePage,
  viewArticlePage,
  articleWithoutTags,
}) => {
  await createNewArticle(page, articleWithoutTags);
  await viewArticlePage.articleEditClick();
  await createArticlePage.fillTitleField('');
  await createArticlePage.clickUpdateButton();
  await createArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});

test('Remove an article description for the existing article', async ({
  page,
  createArticlePage,
  viewArticlePage,
  articleWithoutTags,
}) => {
  await createNewArticle(page, articleWithoutTags);
  await viewArticlePage.articleEditClick();
  await createArticlePage.fillDescriptionField('');
  await createArticlePage.clickUpdateButton();
  await createArticlePage.assertErrorMessageContainsText(
    DESCRIPTION_CANNOT_BE_EMPTY,
  );
});

test('Remove the article text for the existing article', async ({
  page,
  createArticlePage,
  viewArticlePage,
  articleWithoutTags,
}) => {
  await createNewArticle(page, articleWithoutTags);
  await viewArticlePage.articleEditClick();
  await createArticlePage.fillTextField('');
  await createArticlePage.clickUpdateButton();
  await createArticlePage.assertErrorMessageContainsText(BODY_CANNOT_BE_EMPTY);
});
