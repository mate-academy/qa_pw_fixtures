import { test } from '../_fixtures/fixtures';
import { faker } from '@faker-js/faker';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ARTICLE_ERROR_MESSAGES } from '../../src/ui/constants/articleErrorMessages';

test.describe('Edit article tests', () => {
  test.beforeEach(async ({ page, user }) => {
    await signUpUser(page, user);
  });

  async function createArticle(homePage, createArticlePage, article) {
    await homePage.clickNewArticleLink();
    await createArticlePage.fillTitleField(article.title);
    await createArticlePage.fillDescriptionField(article.description);
    await createArticlePage.fillTextField(article.text);

    if (article.tags && article.tags.length > 0) {
      for (const tag of article.tags) {
        await createArticlePage.fillTagsField(tag);
      }
    }

    await createArticlePage.clickPublishArticleButton();
  }

  test('Edit the article title for the existing article', async ({
    homePage,
    createArticlePage,
    viewArticlePage,
    articleWithoutTags,
  }) => {
    const article = structuredClone(articleWithoutTags);
    const updatedTitle = `Updated ${faker.lorem.words(2)} ${Date.now()}`;

    await createArticle(homePage, createArticlePage, article);
    await viewArticlePage.clickEditArticleButton();
    await createArticlePage.fillTitleField(updatedTitle);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertArticleTitleIsVisible(updatedTitle);
  });

  test('Edit the article description for the existing article', async ({
    homePage,
    createArticlePage,
    viewArticlePage,
    articleWithoutTags,
  }) => {
    const article = structuredClone(articleWithoutTags);
    const updatedDescription = `${faker.lorem.sentence()} ${Date.now()}`;

    await createArticle(homePage, createArticlePage, article);
    await viewArticlePage.clickEditArticleButton();
    await createArticlePage.fillDescriptionField(updatedDescription);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertArticleDescriptionIsVisible(updatedDescription);
  });

  test('Edit the article text for the existing article', async ({
    homePage,
    createArticlePage,
    viewArticlePage,
    articleWithoutTags,
  }) => {
    const article = structuredClone(articleWithoutTags);
    const updatedText = `${faker.lorem.sentences(2)} ${Date.now()}`;

    await createArticle(homePage, createArticlePage, article);
    await viewArticlePage.clickEditArticleButton();
    await createArticlePage.fillTextField(updatedText);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertArticleTextIsVisible(updatedText);
  });

  test('Add a tag to an article without tags', async ({
    homePage,
    createArticlePage,
    viewArticlePage,
    articleWithoutTags,
  }) => {
    const article = structuredClone(articleWithoutTags);
    const newTag = `new-tag-${Date.now()}`;

    await createArticle(homePage, createArticlePage, article);
    await viewArticlePage.clickEditArticleButton();
    await createArticlePage.fillTagsField(newTag);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertArticleTagIsVisible(newTag);
  });

  test('Add a tag to an article that already has a tag', async ({
    homePage,
    createArticlePage,
    viewArticlePage,
    articleWithOneTag,
  }) => {
    const article = structuredClone(articleWithOneTag);
    const extraTag = `added-tag-${Date.now()}`;

    await createArticle(homePage, createArticlePage, article);
    await viewArticlePage.clickEditArticleButton();
    await createArticlePage.fillTagsField(extraTag);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertArticleTagIsVisible(article.tags[0]);
    await viewArticlePage.assertArticleTagIsVisible(extraTag);
  });

  test('Remove a tag from an article', async ({
    homePage,
    createArticlePage,
    viewArticlePage,
    articleWithOneTag,
  }) => {
    const article = structuredClone(articleWithOneTag);
    const tagToRemove = article.tags[0];

    await createArticle(homePage, createArticlePage, article);
    await viewArticlePage.clickEditArticleButton();
    await createArticlePage.removeTag(tagToRemove);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertArticleTagIsNotVisible(tagToRemove);
  });

  test('Show an error when the article title is empty', async ({
    homePage,
    createArticlePage,
    viewArticlePage,
    articleWithoutTags,
  }) => {
    const article = structuredClone(articleWithoutTags);

    await createArticle(homePage, createArticlePage, article);
    await viewArticlePage.clickEditArticleButton();
    await createArticlePage.clearTitleField();
    await createArticlePage.clickPublishArticleButtonForValidation();

    await createArticlePage.assertErrorMessageContainsText(
      ARTICLE_ERROR_MESSAGES.TITLE_EMPTY,
    );
  });

  test('Show an error when the article description is empty', async ({
    homePage,
    createArticlePage,
    viewArticlePage,
    articleWithoutTags,
  }) => {
    const article = structuredClone(articleWithoutTags);

    await createArticle(homePage, createArticlePage, article);
    await viewArticlePage.clickEditArticleButton();
    await createArticlePage.clearDescriptionField();
    await createArticlePage.clickPublishArticleButtonForValidation();

    await createArticlePage.assertErrorMessageContainsText(
      ARTICLE_ERROR_MESSAGES.DESCRIPTION_EMPTY,
    );
  });

  test('Show an error when the article text is empty', async ({
    homePage,
    createArticlePage,
    viewArticlePage,
    articleWithoutTags,
  }) => {
    const article = structuredClone(articleWithoutTags);

    await createArticle(homePage, createArticlePage, article);
    await viewArticlePage.clickEditArticleButton();
    await createArticlePage.clearTextField();
    await createArticlePage.clickPublishArticleButtonForValidation();

    await createArticlePage.assertErrorMessageContainsText(
      ARTICLE_ERROR_MESSAGES.BODY_EMPTY,
    );
  });

  test('Edit all article fields', async ({
    homePage,
    createArticlePage,
    viewArticlePage,
    articleWithOneTag,
  }) => {
    const article = structuredClone(articleWithOneTag);
    const updatedArticle = {
      title: `Fully Updated ${faker.lorem.words(2)} ${Date.now()}`,
      description: `${faker.lorem.sentence()} ${Date.now()}`,
      text: `${faker.lorem.sentences(2)} ${Date.now()}`,
    };
    const extraTag = `fully-updated-tag-${Date.now()}`;

    await createArticle(homePage, createArticlePage, article);
    await viewArticlePage.clickEditArticleButton();
    await createArticlePage.fillTitleField(updatedArticle.title);
    await createArticlePage.fillDescriptionField(updatedArticle.description);
    await createArticlePage.fillTextField(updatedArticle.text);
    await createArticlePage.fillTagsField(extraTag);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertArticleTitleIsVisible(updatedArticle.title);
    await viewArticlePage.assertArticleTextIsVisible(updatedArticle.text);
    await viewArticlePage.assertArticleTagIsVisible(article.tags[0]);
    await viewArticlePage.assertArticleTagIsVisible(extraTag);
    await viewArticlePage.assertArticleDescriptionIsVisible(
      updatedArticle.description,
    );
  });
});