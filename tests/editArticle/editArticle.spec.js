import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../src/ui/actions/article/createArticle';

test.beforeEach(async ({ page, user }) => {
    await signUpUser(page, user);
});

test('Edit article title', async ({
    homePage,
    createArticlePage,
    viewArticlePage,
    editArticlePage,
    articleWithoutTags,
    articleWithOneTag
}) => {
    await createArticle(homePage, createArticlePage, articleWithoutTags);

    await editArticlePage.clickEditArticleButton();
    await editArticlePage.fillTitleField(articleWithOneTag.title);
    await editArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertArticleTitleIsVisible(articleWithOneTag.title);
    await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
});

test('Edit article description', async ({
    homePage,
    createArticlePage,
    viewArticlePage,
    editArticlePage,
    articleWithoutTags,
    articleWithOneTag
}) => {
    await createArticle(homePage, createArticlePage, articleWithoutTags);

    await editArticlePage.clickEditArticleButton();
    await editArticlePage.fillDescriptionField(articleWithOneTag.description);
    await editArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
    await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
});

test('Edit article text', async ({
    homePage,
    createArticlePage,
    viewArticlePage,
    editArticlePage,
    articleWithoutTags,
    articleWithOneTag
}) => {
    await createArticle(homePage, createArticlePage, articleWithoutTags);

    await editArticlePage.clickEditArticleButton();
    await editArticlePage.fillTextField(articleWithOneTag.text);
    await editArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
    await viewArticlePage.assertArticleTextIsVisible(articleWithOneTag.text);
});

test('Edit all article fields', async ({
    homePage,
    createArticlePage,
    viewArticlePage,
    editArticlePage,
    articleWithoutTags,
    articleWithTwoTags
}) => {
    await createArticle(homePage, createArticlePage, articleWithoutTags);

    await editArticlePage.clickEditArticleButton();
    await editArticlePage.fillTitleField(articleWithTwoTags.title);
    await editArticlePage.fillDescriptionField(articleWithTwoTags.description);
    await editArticlePage.fillTextField(articleWithTwoTags.text);
    await editArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertArticleTitleIsVisible(articleWithTwoTags.title);
    await viewArticlePage.assertArticleTextIsVisible(articleWithTwoTags.text);
});