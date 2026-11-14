import { test} from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { generateNewTitle } from '../../src/common/testData/generateNewArticleData';
import { reloadPage } from '../../src/ui/actions/article/waitForUrlAndReloadHelpers';

test.beforeEach (async ({page, logger}) => {
    const user = generateNewUserData(logger);
    const article = generateNewArticleData(logger);
    
    await signUpUser(page, user);
    await createNewArticle(page, article);
});

test('Edit the article title', async ( {page, viewArticlePage, editArticlePage} ) => {
    const newTitle = generateNewTitle();

    await viewArticlePage.openEditor();
    await editArticlePage.editTitleField(newTitle);
    await editArticlePage.assertTitleEdited(newTitle);
    await editArticlePage.updateArticle();
    await reloadPage(page);
    await viewArticlePage.assertArticleTitleIsVisible(newTitle);
});
