import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import {
  TITLE_CANNOT_BE_EMPTY,
  DESCRIPTION_CANNOT_BE_EMPTY,
  BODY_CANNOT_BE_EMPTY,
} from '../../src/ui/constants/articleErrorMessages';

test.beforeEach(async ({ page, user, homePage }) => {
  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
});

test('Create an article with empty title', async ({
  createArticlePage,
  articleWithoutTags,
}) => {
  await createArticlePage.fillDescriptionField(articleWithoutTags.description);
  await createArticlePage.fillTextField(articleWithoutTags.text);
  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});

test('Create an article with empty description', async ({
  createArticlePage,
  articleWithoutTags,
}) => {
  await createArticlePage.fillTitleField(articleWithoutTags.title);
  await createArticlePage.fillTextField(articleWithoutTags.text);
  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    DESCRIPTION_CANNOT_BE_EMPTY,
  );
});

test('Create an article with empty text', async ({
  createArticlePage,
  articleWithoutTags,
}) => {
  await createArticlePage.fillTitleField(articleWithoutTags.title);
  await createArticlePage.fillDescriptionField(articleWithoutTags.description);
  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(BODY_CANNOT_BE_EMPTY);
});
