import { test} from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData} from '../../src/common/testData/generateNewArticleData';
import { TITLE_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

test.beforeEach(async ({page, logger}) => {
    const user = generateNewUserData(logger);
    const article = generateNewArticleData(logger, 1);

    await signUpUser(page, user);
    await createNewArticle(page, article);
});

test('Remove article title', async ({viewArticlePage, editArticlePage}) => {
    const newTitle = '';

    await viewArticlePage.openEditor();
    await editArticlePage.editTitleField(newTitle);
    await editArticlePage.assertTitleEdited(newTitle);
    await editArticlePage.updateArticle();
    await editArticlePage.assertErrorWhenTitleIsEmpty(TITLE_CANNOT_BE_EMPTY);
})