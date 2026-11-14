import { test} from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData} from '../../src/common/testData/generateNewArticleData';
import { BODY_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';


test.beforeEach(async ({page, logger}) => {
    const user = generateNewUserData(logger);
    const article = generateNewArticleData(logger, 1);

    await signUpUser(page, user);
    await createNewArticle(page, article);
});

test('Remove the article text', async ({viewArticlePage, editArticlePage}) => {
    const newText = '';

    await viewArticlePage.openEditor();
    await editArticlePage.editTextField(newText);
    await editArticlePage.assertTextEdited(newText);
    await editArticlePage.updateArticle();
    await editArticlePage.assertErrorWhenTextIsEmpty(BODY_CANNOT_BE_EMPTY);
})