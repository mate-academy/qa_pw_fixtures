import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData, generateTag } from '../../src/common/testData/generateNewArticleData';
import { reloadPage } from '../../src/ui/actions/article/waitForUrlAndReloadHelpers';


test.beforeEach(async ({page, logger}) => {

    const user = generateNewUserData(logger);
    const article = generateNewArticleData(logger, 1);

    await signUpUser(page, user);
    await createNewArticle(page, article);
});

test('Add tag for the article with tags', async ({page, editArticlePage, viewArticlePage}) => {
    const tag = generateTag();
    
    await viewArticlePage.openEditor();
    await editArticlePage.addNewTag(tag);
    await editArticlePage.updateArticle();
    await reloadPage(page);
    await viewArticlePage.assertNewTagHasCorrectText(tag);
})