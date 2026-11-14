import { test} from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { generateNewDescription } from '../../src/common/testData/generateNewArticleData';
import { reloadPage } from '../../src/ui/actions/article/waitForUrlAndReloadHelpers';


test.beforeEach(async ({page, logger}) => {
    const user = generateNewUserData(logger);
    const article = generateNewArticleData(logger);

    await signUpUser(page, user);
    await createNewArticle(page, article);
});

test('Edit the article description', async ({page, editArticlePage, viewArticlePage}) => {
    const newDescription = generateNewDescription();

    await viewArticlePage.openEditor();
    await editArticlePage.editDescriptionField(newDescription);
    await editArticlePage.assertDescriptionEdited(newDescription);
    await editArticlePage.updateArticle();
    await reloadPage(page);
    await viewArticlePage.openEditor();
    await editArticlePage.assertDescriptionEdited(newDescription);
})