// - *Edit the article title for the existing article*
// - *Edit the article description for the existing article*
// - *Edit the article text for the existing article*
// - *Add the tag for the existing article without tags*
// - *Add the tag for the existing article with tags*
// - *Remove an article tag for the existing article with tag*
// - *Remove an article title for the existing article*
// - *Remove an article description for the existing article*
// - *Remove the article text for the existing article*

import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { faker } from '@faker-js/faker';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import {
  TITLE_CANNOT_BE_EMPTY,
  DESCRIPTION_CANNOT_BE_EMPTY,
  BODY_CANNOT_BE_EMPTY,
} from '../../src/ui/constants/articleErrorMessages.js';

test.describe('Edit article with tags', () => {
  test.beforeEach(
    async ({ page, viewArticlePage, articleWithOneTag, user }) => {
      await signUpUser(page, user);
      await createNewArticle(page, articleWithOneTag);

      await viewArticlePage.clickEditArticleButton();
    },
  );

  test('Edit the article title for the existing article', async ({
    page,
    editArticlePage,
    viewArticlePage,
  }) => {
    const articleTitle = faker.lorem.words();

    await editArticlePage.fillTitleField(articleTitle);
    await editArticlePage.clickUpdateArticleButton();
    // Conduit serves stale article data after redirect — force a refresh
    await page.waitForURL(/\/article\//);
    await page.reload();

    await viewArticlePage.assertArticleTitleIsVisible(articleTitle);
  });

  test('Edit the article description for the existing article', async ({
    editArticlePage,
  }) => {
    const articleDescription = faker.lorem.sentence(4);

    await editArticlePage.fillDescriptionField(articleDescription);
    await editArticlePage.clickUpdateArticleButton();
  });

  test('Edit the article text for the existing article', async ({
    editArticlePage,
    viewArticlePage,
  }) => {
    const articleText = faker.lorem.sentences(2);

    await editArticlePage.fillTextField(articleText);
    await editArticlePage.clickUpdateArticleButton();

    await viewArticlePage.assertArticleTextIsVisible(articleText);
  });

  test('Add the tag for the existing article with tags', async ({
    page,
    editArticlePage,
    viewArticlePage,
    articleWithOneTag,
  }) => {
    const newArticleTags = [faker.lorem.word()];

    await editArticlePage.fillTagsField(newArticleTags);
    await editArticlePage.clickUpdateArticleButton();
    // Conduit serves stale article data after redirect — force a refresh
    await page.waitForURL(/\/article\//);
    await page.reload();

    const combinedTags = [...articleWithOneTag.tags, ...newArticleTags];

    await viewArticlePage.assertArticleTagsAreVisible(combinedTags);
  });

  test('Remove an article tag for the existing article with tag', async ({
    editArticlePage,
    viewArticlePage,
    articleWithOneTag,
  }) => {
    const firstTag = articleWithOneTag.tags[0];

    await editArticlePage.clickRemoveTag(firstTag);
    await editArticlePage.clickUpdateArticleButton();

    await viewArticlePage.assertArticleTagIsNotVisible(firstTag);
  });

  test('Remove an article title for the existing article', async ({
    editArticlePage,
  }) => {
    await editArticlePage.fillTitleField('');
    await editArticlePage.clickUpdateArticleButton();

    await editArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
  });

  test('Remove an article description for the existing article', async ({
    editArticlePage,
  }) => {
    await editArticlePage.fillDescriptionField('');
    await editArticlePage.clickUpdateArticleButton();

    await editArticlePage.assertErrorMessageContainsText(
      DESCRIPTION_CANNOT_BE_EMPTY,
    );
  });

  test('Remove the article text for the existing article', async ({
    editArticlePage,
  }) => {
    await editArticlePage.fillTextField('');
    await editArticlePage.clickUpdateArticleButton();

    await editArticlePage.assertErrorMessageContainsText(BODY_CANNOT_BE_EMPTY);
  });
});

test.describe('Edit article without tags', () => {
  test.beforeEach(
    async ({ page, viewArticlePage, articleWithoutTags, user }) => {
      await signUpUser(page, user);
      await createNewArticle(page, articleWithoutTags);

      await viewArticlePage.clickEditArticleButton();
    },
  );

  test('Add the tag for the existing article without tags', async ({
    page,
    editArticlePage,
    viewArticlePage,
  }) => {
    const articleTags = [faker.lorem.word()];

    await editArticlePage.fillTagsField(articleTags);
    await editArticlePage.clickUpdateArticleButton();
    // Conduit serves stale article data after redirect — force a refresh
    await page.waitForURL(/\/article\//);
    await page.reload();

    await viewArticlePage.assertArticleTagsAreVisible(articleTags);
  });
});
