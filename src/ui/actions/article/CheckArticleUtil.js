import { test } from '@playwright/test';
import {
    BODY_CANNOT_BE_EMPTY,
    DESCRIPTION_CANNOT_BE_EMPTY,
    TITLE_CANNOT_BE_EMPTY,
} from '../../constants/articleErrorMessages';

export class CheckArticleUtil{
    static async checkArticleFields(article, viewArticlePage){
        await test.step(`Check article fields: ${article.title}`, async () => {
            await viewArticlePage.assertArticleTitleIsVisible(article.title)
            await viewArticlePage.assertArticleTextIsVisible(article.body)
            await viewArticlePage.assertArticleTagsVisible(article.tags)
        })
    }

    static async checkErrorMessageVisible(article, viewArticlePage){
        await test.step('Check error messages visible', async () => {

            if (article.title === null) {
                await viewArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY)
            }

            if (article.description === null) {
                await viewArticlePage.assertErrorMessageContainsText(DESCRIPTION_CANNOT_BE_EMPTY)
            }

            if (article.body === null) {
                await viewArticlePage.assertErrorMessageContainsText(BODY_CANNOT_BE_EMPTY)
            }
        })
    }
}