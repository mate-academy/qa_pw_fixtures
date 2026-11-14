import { test} from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData} from '../../src/common/testData/generateNewArticleData';
import { DESCRIPTION_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

test.beforeEach(async ({page, logger}) => {
    const user = generateNewUserData(logger);
    const article = generateNewArticleData(logger, 1);

    await signUpUser(page, user);
    await createNewArticle(page, article);
});

test('Remove article description', async ({viewArticlePage, editArticlePage}) => {
    const newDescription = '';

    await viewArticlePage.openEditor();
    await editArticlePage.editDescriptionField(newDescription);
    await editArticlePage.assertDescriptionEdited(newDescription);
    await editArticlePage.updateArticle();
    await editArticlePage
    .assertErrorWhenDescrIsEmpty(DESCRIPTION_CANNOT_BE_EMPTY);
})