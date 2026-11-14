import { test} from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { generateNewText } from '../../src/common/testData/generateNewArticleData';
import { reloadPage } from '../../src/ui/actions/article/waitForUrlAndReloadHelpers';

test.beforeEach(async ({page, logger}) => {
    const user = generateNewUserData(logger);
    const article = generateNewArticleData(logger);

    await signUpUser(page, user);
    await createNewArticle(page, article);
});

test('Edit the article text', async ({page, viewArticlePage, editArticlePage}) => {
    const newText = generateNewText();
    
    await viewArticlePage.openEditor();
    await editArticlePage.editTextField(newText);
    await editArticlePage.assertTextEdited(newText);
    await editArticlePage.updateArticle();
    await reloadPage(page);
    await viewArticlePage.assertArticleTextIsVisible(newText);
})