import { test } from '../fixtures/fixturesMain';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import {
    BODY_CANNOT_BE_EMPTY,
    DESCRIPTION_CANNOT_BE_EMPTY,
    TITLE_CANNOT_BE_EMPTY,
} from '../../src/ui/constants/articleErrorMessages';
import { CheckArticleUtil } from '../../src/ui/actions/article/CheckArticleUtil';

test('Create an article without title field', async ({createArticlePage, homePage, articleWithoutTags}) => {
    await createNewArticle({
        customData: { title: ''},
        createArticlePage,
        homePage,
        articleWithoutTags
    });

    await createArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});

test('Create an article without description field', async ({createArticlePage, homePage, articleWithOneTag}) => {
    await createNewArticle({
        customData: { description: ''},
        createArticlePage,
        homePage,
        articleWithOneTag
    });

    await createArticlePage.assertErrorMessageContainsText(DESCRIPTION_CANNOT_BE_EMPTY);
});

test('Create an article without body field', async ({
    createArticlePage,
    homePage,
    articleWithTwoTags,
}) => {
    await createNewArticle({
        customData: { body: '' },
        createArticlePage,
        homePage,
        articleWithTwoTags,
    });

    await createArticlePage.assertErrorMessageContainsText(
        BODY_CANNOT_BE_EMPTY,
    );
});

test('Create an article without tags field', async ({
        createArticlePage,
        homePage,
        articleWithoutTags,
        viewArticlePage }) => {
    const createdArticleData = await createNewArticle({
        createArticlePage,
        homePage,
        articleWithoutTags
    });

    await CheckArticleUtil.checkErrorMessageVisible(createdArticleData, viewArticlePage)
});
