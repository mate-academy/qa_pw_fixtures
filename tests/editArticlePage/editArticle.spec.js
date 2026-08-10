import { test } from '../_fixtures/fixtures';
import { faker } from '@faker-js/faker';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { editArticle } from '../../src/ui/actions/article/editArticle.js';
import { ARTICLE_ERROR_MESSAGES } from '../../src/ui/constants/articleErrorMessages';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test.describe('Edit Article Tests', () => {
  test('Edit the article title for the existing article', async ({
    page,
    homePage,
    viewArticlePage,
    articleWithoutTags,
  }) => {
    await homePage.clickNewArticleLink();
    await createNewArticle(page, articleWithoutTags);

    const newTitle = faker.lorem.words();

    await viewArticlePage.clickEditArticleButton();
    await editArticle(page, { title: newTitle });

    await viewArticlePage.assertArticleTitleIsVisible(newTitle);
  });

  test('Edit the article description for the existing article', async ({
    page,
    homePage,
    viewArticlePage,
    articleWithoutTags,
  }) => {
    await homePage.clickNewArticleLink();
    await createNewArticle(page, articleWithoutTags);

    const newDescription = faker.lorem.sentence(6);

    await viewArticlePage.clickEditArticleButton();
    await editArticle(page, { description: newDescription });

    await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  });

  test('Edit the article text for the existing article', async ({
    page,
    homePage,
    viewArticlePage,
    articleWithoutTags,
  }) => {
    await homePage.clickNewArticleLink();
    await createNewArticle(page, articleWithoutTags);

    const newText = faker.lorem.paragraphs(2);

    await viewArticlePage.clickEditArticleButton();
    await editArticle(page, { text: newText });

    await viewArticlePage.assertArticleTextIsVisible(newText);
  });

  test('Add a tag for the existing article without tags', async ({
    page,
    homePage,
    viewArticlePage,
    articleWithoutTags,
  }) => {
    await homePage.clickNewArticleLink();
    await createNewArticle(page, articleWithoutTags);

    const newTag = faker.lorem.word();

    await viewArticlePage.clickEditArticleButton();
    await editArticle(page, { addTag: newTag });

    await viewArticlePage.assertArticleHasTag(newTag);
  });

  test('Add the tag for the existing article with tags', async ({
    page,
    homePage,
    viewArticlePage,
    articleWithTwoTags,
  }) => {
    await homePage.clickNewArticleLink();
    await createNewArticle(page, articleWithTwoTags);

    const additionalTag = faker.lorem.word();

    await viewArticlePage.clickEditArticleButton();
    await editArticle(page, { addTag: additionalTag });

    await viewArticlePage.assertArticleHasTag(additionalTag);
    // бонус: перевірити, що старі теги нікуди не зникли
    await viewArticlePage.assertArticleHasTag(articleWithTwoTags.tags[0]);
  });

  test('Remove an article tag for the existing article with tag', async ({
    page,
    homePage,
    viewArticlePage,
    articleWithTwoTags,
  }) => {
    const tagToRemove = articleWithTwoTags.tags[0];

    await homePage.clickNewArticleLink();
    await createNewArticle(page, articleWithTwoTags);

    await viewArticlePage.clickEditArticleButton();
    await editArticle(page, { removeTag: tagToRemove });

    await viewArticlePage.assertArticleDoesNotHaveTag(tagToRemove);
  });

  test('Remove an article title for the existing article', async ({
    page,
    homePage,
    viewArticlePage,
    editArticlePage,
    articleWithoutTags,
  }) => {
    await homePage.clickNewArticleLink();
    await createNewArticle(page, articleWithoutTags);

    await viewArticlePage.clickEditArticleButton();
    await editArticle(page, { title: '' });

    await editArticlePage.assertErrorMessageContainsText(
      ARTICLE_ERROR_MESSAGES.TITLE_CANNOT_BE_EMPTY
    );
  });

  test('Remove an article description for the existing article', async ({
    page,
    homePage,
    viewArticlePage,
    editArticlePage,
    articleWithoutTags,
  }) => {
    await homePage.clickNewArticleLink();
    await createNewArticle(page, articleWithoutTags);

    await viewArticlePage.clickEditArticleButton();
    await editArticle(page, { description: '' });

    await editArticlePage.assertErrorMessageContainsText(
      ARTICLE_ERROR_MESSAGES.DESCRIPTION_CANNOT_BE_EMPTY
    );
  });

  test('Remove the article text for the existing article', async ({
    page,
    homePage,
    viewArticlePage,
    editArticlePage,
    articleWithoutTags,
  }) => {
    await homePage.clickNewArticleLink();
    await createNewArticle(page, articleWithoutTags);

    await viewArticlePage.clickEditArticleButton();
    await editArticle(page, { text: '' });

    await editArticlePage.assertErrorMessageContainsText(
      ARTICLE_ERROR_MESSAGES.BODY_CANNOT_BE_EMPTY
    );
  });

  test('Edit article without making any changes', async ({
    page,
    homePage,
    viewArticlePage,
    articleWithoutTags,
  }) => {
    await homePage.clickNewArticleLink();
    await createNewArticle(page, articleWithoutTags);

    await viewArticlePage.clickEditArticleButton();
    await editArticle(page, {});

    await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  });
});
