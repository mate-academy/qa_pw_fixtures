import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import {
  TITLE_CANNOT_BE_EMPTY,
  DESCRIPTION_CANNOT_BE_EMPTY,
  TEXT_CANNOT_BE_EMPTY,
} from '../../src/ui/constants/articleErrorMessages';

test.beforeEach(
  async ({ page, user, homePage, createArticlePage, articleWithoutTags }) => {
    await signUpUser(page, user);

    await homePage.clickNewArticleLink();
    await test.step('Create a new article without tags', async () => {
      await createNewArticle(createArticlePage, articleWithoutTags);
    });
  },
);

test('Edit an article title for the existing article', async ({
  viewArticlePage,
  editArticlePage,
  articleWithoutTags,
}) => {
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.assertFormIsPrefilled(articleWithoutTags);
  await editArticlePage.fillTitleField(`${articleWithoutTags.title} edited`);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.waitForViewArticlePageToBeVisible();
  await viewArticlePage.assertArticleTitleIsVisible(
    `${articleWithoutTags.title} edited`,
  );
});

test('Keep the article description and text when editing the title', async ({
  viewArticlePage,
  editArticlePage,
  articleWithoutTags,
}) => {
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.assertFormIsPrefilled(articleWithoutTags);
  await editArticlePage.fillTitleField(`${articleWithoutTags.title} edited`);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.waitForViewArticlePageToBeVisible();
  await viewArticlePage.assertArticleTitleIsVisible(
    `${articleWithoutTags.title} edited`,
  );
  await viewArticlePage.assertArticleDescriptionIsVisible(
    articleWithoutTags.description,
  );
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
});

test('Edit an article description for the existing article', async ({
  viewArticlePage,
  editArticlePage,
  articleWithoutTags,
}) => {
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.assertFormIsPrefilled(articleWithoutTags);
  await editArticlePage.fillDescriptionField(
    `${articleWithoutTags.description} edited`,
  );
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.waitForViewArticlePageToBeVisible();
  await viewArticlePage.assertArticleDescriptionIsVisible(
    `${articleWithoutTags.description} edited`,
  );
});

test('Edit an article text for the existing article', async ({
  viewArticlePage,
  editArticlePage,
  articleWithoutTags,
}) => {
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.assertFormIsPrefilled(articleWithoutTags);
  await editArticlePage.fillTextField(`${articleWithoutTags.text} edited`);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.waitForViewArticlePageToBeVisible();
  await viewArticlePage.assertArticleTextIsVisible(
    `${articleWithoutTags.text} edited`,
  );
});

test('Add the tag for the existing article without tags', async ({
  viewArticlePage,
  editArticlePage,
  articleWithoutTags,
}) => {
  const tags = ['tag1'];

  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.assertFormIsPrefilled(articleWithoutTags);
  await editArticlePage.fillTagsField(tags);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.waitForViewArticlePageToBeVisible();
  await viewArticlePage.assertArticleTagsAreVisible(tags);
});

test('Remove an article title for the existing article', async ({
  viewArticlePage,
  editArticlePage,
  articleWithoutTags,
}) => {
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.assertFormIsPrefilled(articleWithoutTags);
  await editArticlePage.fillTitleField('');
  await editArticlePage.clickUpdateArticleButton();
  await editArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});

test('Remove an article description for the existing article', async ({
  viewArticlePage,
  editArticlePage,
  articleWithoutTags,
}) => {
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.assertFormIsPrefilled(articleWithoutTags);
  await editArticlePage.fillDescriptionField('');
  await editArticlePage.clickUpdateArticleButton();
  await editArticlePage.assertErrorMessageContainsText(
    DESCRIPTION_CANNOT_BE_EMPTY,
  );
});

test('Remove an article text for the existing article', async ({
  viewArticlePage,
  editArticlePage,
  articleWithoutTags,
}) => {
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.assertFormIsPrefilled(articleWithoutTags);
  await editArticlePage.fillTextField('');
  await editArticlePage.clickUpdateArticleButton();
  await editArticlePage.assertErrorMessageContainsText(TEXT_CANNOT_BE_EMPTY);
});
