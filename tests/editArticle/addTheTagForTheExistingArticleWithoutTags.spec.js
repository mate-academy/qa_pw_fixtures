import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData, generateTag } from '../../src/common/testData/generateNewArticleData';
import { reloadPage } from '../../src/ui/actions/article/waitForUrlAndReloadHelpers';

test.beforeEach(async ({page, logger}) => {

    const user = generateNewUserData(logger);
    const article = generateNewArticleData(logger);

    await signUpUser(page, user);
    await createNewArticle(page, article);
});

test('Add tag for the article without tags', async ({page, viewArticlePage, editArticlePage}) => {
    const tag = generateTag();
    
    await viewArticlePage.openEditor();
    await editArticlePage.addNewTag(tag);
    //await page.keyboard.press('Enter');//
    await editArticlePage.updateArticle();
    await reloadPage(page);
    //await viewArticlePage.assertTagisVisible(tag);//
    await viewArticlePage.assertTagHasCorrectText(tag);
})

