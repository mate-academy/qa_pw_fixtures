import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page, user }) => {
    await signUpUser(page, user);
});

test('Create article without tags', async ({
    homePage,
    createArticlePage,
    viewArticlePage,
    articleWithoutTags
}) => {
    await homePage.clickNewArticleLink();

    await createArticlePage.fillTitleField(articleWithoutTags.title);
    await createArticlePage.fillDescriptionField(
        articleWithoutTags.description);
    await createArticlePage.fillTextField(articleWithoutTags.text);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
    await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
});

test('Create article with one tag', async ({
    homePage,
    createArticlePage,
    viewArticlePage,
    articleWithOneTag
}) => {
    await homePage.clickNewArticleLink();

    await createArticlePage.fillTitleField(articleWithOneTag.title);
    await createArticlePage.fillDescriptionField(articleWithOneTag.description);
    await createArticlePage.fillTextField(articleWithOneTag.text);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertArticleTitleIsVisible(articleWithOneTag.title);
    await viewArticlePage.assertArticleTextIsVisible(articleWithOneTag.text);
});

test('Create article with two tags', async ({
    homePage,
    createArticlePage,
    viewArticlePage,
    articleWithTwoTags
}) => {
    await homePage.clickNewArticleLink();

    await createArticlePage.fillTitleField(articleWithTwoTags.title);
    await createArticlePage.fillDescriptionField(
        articleWithTwoTags.description);
    await createArticlePage.fillTextField(articleWithTwoTags.text);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertArticleTitleIsVisible(articleWithTwoTags.title);
    await viewArticlePage.assertArticleTextIsVisible(articleWithTwoTags.text);
});