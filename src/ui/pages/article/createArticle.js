import { test } from '@playwright/test';

export async function createArticle(homePage, createArticlePage, article) {
    await test.step(`Create article`, async () => {
        await homePage.clickNewArticleLink();
        await createArticlePage.fillTitleField(article.title);
        await createArticlePage.fillDescriptionField(article.description);
        await createArticlePage.fillTextField(article.text);
        await createArticlePage.clickPublishArticleButton();
    });
}