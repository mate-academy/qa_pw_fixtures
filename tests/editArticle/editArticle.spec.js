import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import {
    BODY_CANNOT_BE_EMPTY,
    DESCRIPTION_CANNOT_BE_EMPTY,
    TITLE_CANNOT_BE_EMPTY,
} from '../../src/ui/constants/articleErrorMessages';

const UPDATED_TITLE = 'Updated Article Title';
const UPDATED_DESCRIPTION = 'Updated article description';
const UPDATED_TEXT = 'Updated article body text';
const NEW_TAG = 'newtag';
const ADDED_TAG = 'addedtag';
const MULTI_TITLE = 'Multi-field Updated Title';
const MULTI_DESCRIPTION = 'Updated description';
const MULTI_TEXT = 'Updated body text';

test.beforeEach(async ({ page, user }) => {
    await signUpUser(page, user);
});

test('Edit the article title for the existing article', async ({
    homePage,
    createArticlePage,
    articleWithoutTags,
    viewArticlePage,
    editArticlePage,
}) => {
    await homePage.clickNewArticleLink();
    await createArticlePage.fillTitleField(articleWithoutTags.title);
    await createArticlePage
      .fillDescriptionField(articleWithoutTags.description);
    await createArticlePage.fillTextField(articleWithoutTags.text);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.clickEditArticleLink();
    await editArticlePage.fillTitleField(UPDATED_TITLE);
    await editArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertArticleTitleIsVisible(UPDATED_TITLE);
});

test('Edit the article description for the existing article', async ({
    homePage,
    createArticlePage,
    articleWithoutTags,
    viewArticlePage,
    editArticlePage,
}) => {
    await homePage.clickNewArticleLink();
    await createArticlePage.fillTitleField(articleWithoutTags.title);
    await createArticlePage
      .fillDescriptionField(articleWithoutTags.description);
    await createArticlePage.fillTextField(articleWithoutTags.text);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.clickEditArticleLink();
    await editArticlePage.fillDescriptionField(UPDATED_DESCRIPTION);
    await editArticlePage.clickPublishArticleButton();

    await viewArticlePage
      .assertArticleDescriptionIsVisible(UPDATED_DESCRIPTION);
});

test('Edit the article text for the existing article', async ({
    homePage,
    createArticlePage,
    articleWithoutTags,
    viewArticlePage,
    editArticlePage,
}) => {
    await homePage.clickNewArticleLink();
    await createArticlePage.fillTitleField(articleWithoutTags.title);
    await createArticlePage
      .fillDescriptionField(articleWithoutTags.description);
    await createArticlePage.fillTextField(articleWithoutTags.text);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.clickEditArticleLink();
    await editArticlePage.fillTextField(UPDATED_TEXT);
    await editArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertArticleTextIsVisible(UPDATED_TEXT);
});

test('Add the tag for the existing article without tags', async ({
    homePage,
    createArticlePage,
    articleWithoutTags,
    viewArticlePage,
    editArticlePage,
}) => {
    await homePage.clickNewArticleLink();
    await createArticlePage.fillTitleField(articleWithoutTags.title);
    await createArticlePage
      .fillDescriptionField(articleWithoutTags.description);
    await createArticlePage.fillTextField(articleWithoutTags.text);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.clickEditArticleLink();
    await editArticlePage.addTag(NEW_TAG);
    await editArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertTagIsVisible(NEW_TAG);
});

test('Add the tag for the existing article with tags', async ({
    homePage,
    createArticlePage,
    articleWithOneTag,
    viewArticlePage,
    editArticlePage,
}) => {
    await homePage.clickNewArticleLink();
    await createArticlePage.fillTitleField(articleWithOneTag.title);
    await createArticlePage.fillDescriptionField(articleWithOneTag.description);
    await createArticlePage.fillTextField(articleWithOneTag.text);
    await createArticlePage.fillTagsField(articleWithOneTag.tags);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.clickEditArticleLink();
    await editArticlePage.addTag(ADDED_TAG);
    await editArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertTagIsVisible(articleWithOneTag.tags[0]);
    await viewArticlePage.assertTagIsVisible(ADDED_TAG);
});

test('Remove an article tag for the existing article with tag', async ({
    homePage,
    createArticlePage,
    articleWithOneTag,
    viewArticlePage,
    editArticlePage,
}) => {
    await homePage.clickNewArticleLink();
    await createArticlePage.fillTitleField(articleWithOneTag.title);
    await createArticlePage.fillDescriptionField(articleWithOneTag.description);
    await createArticlePage.fillTextField(articleWithOneTag.text);
    await createArticlePage.fillTagsField(articleWithOneTag.tags);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.clickEditArticleLink();
    await editArticlePage.removeTag(articleWithOneTag.tags[0]);
    await editArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertTagIsNotVisible(articleWithOneTag.tags[0]);
});

test('Remove an article title for the existing article', async ({
    homePage,
    createArticlePage,
    articleWithoutTags,
    viewArticlePage,
    editArticlePage,
}) => {
    await homePage.clickNewArticleLink();
    await createArticlePage.fillTitleField(articleWithoutTags.title);
    await createArticlePage
      .fillDescriptionField(articleWithoutTags.description);
    await createArticlePage.fillTextField(articleWithoutTags.text);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.clickEditArticleLink();
    await editArticlePage.clearTitleField();
    await editArticlePage.clickPublishArticleButton();

    await editArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});

test('Remove an article description for the existing article', async ({
    homePage,
    createArticlePage,
    articleWithoutTags,
    viewArticlePage,
    editArticlePage,
}) => {
    await homePage.clickNewArticleLink();
    await createArticlePage.fillTitleField(articleWithoutTags.title);
    await createArticlePage
      .fillDescriptionField(articleWithoutTags.description);
    await createArticlePage.fillTextField(articleWithoutTags.text);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.clickEditArticleLink();
    await editArticlePage.clearDescriptionField();
    await editArticlePage.clickPublishArticleButton();

    await editArticlePage.assertErrorMessageContainsText(
        DESCRIPTION_CANNOT_BE_EMPTY
    );
});

test('Remove the article text for the existing article', async ({
    homePage,
    createArticlePage,
    articleWithoutTags,
    viewArticlePage,
    editArticlePage,
}) => {
    await homePage.clickNewArticleLink();
    await createArticlePage.fillTitleField(articleWithoutTags.title);
    await createArticlePage
      .fillDescriptionField(articleWithoutTags.description);
    await createArticlePage.fillTextField(articleWithoutTags.text);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.clickEditArticleLink();
    await editArticlePage.clearTextField();
    await editArticlePage.clickPublishArticleButton();

    await editArticlePage.assertErrorMessageContainsText(BODY_CANNOT_BE_EMPTY);
});

test('Edit multiple fields at once for the existing article', async ({
    homePage,
    createArticlePage,
    articleWithoutTags,
    viewArticlePage,
    editArticlePage,
}) => {
    await homePage.clickNewArticleLink();
    await createArticlePage.fillTitleField(articleWithoutTags.title);
    await createArticlePage
      .fillDescriptionField(articleWithoutTags.description);
    await createArticlePage.fillTextField(articleWithoutTags.text);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.clickEditArticleLink();
    await editArticlePage.fillTitleField(MULTI_TITLE);
    await editArticlePage.fillDescriptionField(MULTI_DESCRIPTION);
    await editArticlePage.fillTextField(MULTI_TEXT);
    await editArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertArticleTitleIsVisible(MULTI_TITLE);
    await viewArticlePage.assertArticleDescriptionIsVisible(MULTI_DESCRIPTION);
    await viewArticlePage.assertArticleTextIsVisible(MULTI_TEXT);
});
