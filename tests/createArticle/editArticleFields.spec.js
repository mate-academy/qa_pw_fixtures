import { editArticle } from '../../src/ui/actions/article/editArticle';
import { test } from '../fixtures/fixturesMain';
import { CheckArticleUtil } from '../../src/ui/actions/article/CheckArticleUtil';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.beforeEach(
    async ({ page, user, createArticlePage, homePage, articleWithTwoTags }) => {
        await signUpUser(page, user);

        await createNewArticle({
            createArticlePage,
            homePage,
            articleWithTwoTags,
        });
    },
);

test('edit article with required fields', async ({
    page,
    viewArticlePage,
    articleWithTwoTags,
}) => {
    await editArticle(articleWithTwoTags, page);
    await CheckArticleUtil.checkArticleFields(articleWithTwoTags, viewArticlePage);
});

test('edit article with no title', async ({ page, viewArticlePage, articleWithoutTags }) => {
    const clearTitleData = {
        ...articleWithoutTags,
        title: null,
    };

    await editArticle(clearTitleData, page);
    await CheckArticleUtil.checkErrorMessageVisible(clearTitleData, viewArticlePage);
});

test('edit article with no description', async ({
    page,
    viewArticlePage,
    articleWithoutTags,
}) => {
    const clearDescriptionData = {
        ...articleWithoutTags,
        description: null,
    };

    await editArticle(clearDescriptionData, page);
    await CheckArticleUtil.checkErrorMessageVisible(clearDescriptionData, viewArticlePage);
});

test('edit article with no bodyText', async ({ page, viewArticlePage, articleWithoutTags }) => {
    const clearBodyData = {
        ...articleWithoutTags,
        body: null,
    };

    await editArticle(clearBodyData, page);
    await CheckArticleUtil.checkErrorMessageVisible(clearBodyData, viewArticlePage);
});

test('edit article with no tags', async ({ page, viewArticlePage, articleWithoutTags }) => {
    const clearTagsData = {
        ...articleWithoutTags,
        tags: null,
    };

    await editArticle(clearTagsData, page);
    await CheckArticleUtil.checkArticleFields(articleWithoutTags, viewArticlePage);
});
