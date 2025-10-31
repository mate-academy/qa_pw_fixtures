import { test } from "../_fixtures/fixtures";
import { signUpUser } from "../../src/ui/actions/auth/signUpUser";
import { BODY_TEXT_CANNOT_BE_EMPTY, DESCRIPTION_CANNOT_BE_EMPTY, TITLE_CANNOT_BE_EMPTY } from "../../src/ui/constants/articleErrorMessages";

test.beforeEach(async ({ page, user, homePage, createArticlePage, viewArticlePage, articleWithTwoTags }) => {
  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
  await createArticlePage.createArticleWithInfo(articleWithTwoTags);
  await viewArticlePage.assertArticleTitleIsVisible(articleWithTwoTags.title);
});

test('Edit the article title for the existing article', async ({ createArticlePage, viewArticlePage, articleWithOneTag }) => {
  await viewArticlePage.clickEditArticle();
  
  await createArticlePage.fillTitleField(articleWithOneTag.title);
  await createArticlePage.assertTitleInputContainsText(articleWithOneTag.title);
  await createArticlePage.clickUpdateArticleButton();

  await viewArticlePage.clickEditArticle();
  await createArticlePage.assertTitleInputContainsText(articleWithOneTag.title);
});

test('Edit the article description for the existing article', async ({ createArticlePage, viewArticlePage, articleWithOneTag }) => {
  await viewArticlePage.clickEditArticle();

  await createArticlePage.fillDescriptionField(articleWithOneTag.description);
  await createArticlePage.clickUpdateArticleButton();

  await viewArticlePage.clickEditArticle();
  await createArticlePage.assertDescriptionInputContainsText(articleWithOneTag.description);
});

test('Edit the article text for the existing article', async ({ createArticlePage, viewArticlePage, articleWithOneTag }) => {
  await viewArticlePage.clickEditArticle();
  
  await createArticlePage.fillTextField(articleWithOneTag.text);
  await createArticlePage.clickUpdateArticleButton();

  await viewArticlePage.clickEditArticle();
  await createArticlePage.assertTextInputContainsText(articleWithOneTag.text);
});

test('Add the tag for the existing article with tags', async ({ createArticlePage, viewArticlePage, articleWithTwoTags, articleWithOneTag }) => {
  
  await viewArticlePage.clickEditArticle();
  
  await createArticlePage.addArticleTags(articleWithOneTag.tags);
  await createArticlePage.clickUpdateArticleButton();

  await viewArticlePage.clickEditArticle();
  const allExpectedTags = [...articleWithTwoTags.tags, ...articleWithOneTag.tags];
  await createArticlePage.assertTagsListContainsTags(allExpectedTags);
});

test('Remove an article tag for the existing article with tag', async ({ createArticlePage, viewArticlePage, articleWithTwoTags }) => {
  await viewArticlePage.clickEditArticle();

  await createArticlePage.removeFirstTag();
  await createArticlePage.clickUpdateArticleButton();

  await viewArticlePage.clickEditArticle();
  await createArticlePage.assertTagsListCount(articleWithTwoTags.tags.length - 1);
});

test('Remove an article title for the existing article', async ({ createArticlePage, viewArticlePage }) => {
  await viewArticlePage.clickEditArticle();
  
  await createArticlePage.fillTitleField('');
  await createArticlePage.assertTitleInputContainsText('');
  await createArticlePage.clickUpdateArticleButton();
  await createArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});

test('Remove an article description for the existing article', async ({ createArticlePage, viewArticlePage }) => {
  await viewArticlePage.clickEditArticle();
  
  await createArticlePage.fillDescriptionField('');
  await createArticlePage.clickUpdateArticleButton();
  await createArticlePage.assertErrorMessageContainsText(DESCRIPTION_CANNOT_BE_EMPTY);
});

test('Remove the article text for the existing article', async ({ createArticlePage, viewArticlePage }) => {
  await viewArticlePage.clickEditArticle();
  
  await createArticlePage.fillTextField('');
  await createArticlePage.clickUpdateArticleButton();
  await createArticlePage.assertErrorMessageContainsText(BODY_TEXT_CANNOT_BE_EMPTY);
});