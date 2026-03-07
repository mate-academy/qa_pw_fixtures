import { test } from '../_fixtures/fixtures';
import { HomePage } from '../../src/ui/pages/HomePage';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle'; 
import { waitAndReloadArticlePage } from '../../src/ui/actions/article/waitAndReloadArticlePage';
import { 
  TITLE_CANNOT_BE_EMPTY,
  DESCRIPTION_CANNOT_BE_EMPTY,
  TEXT_CANNOT_BE_EMPTY
 } from '../../src/ui/constants/articleErrorMessages';

let homePage;

test.describe('tests for editing article fields', () => {
  test.beforeEach(async ({ 
    page, 
    viewArticlePage, 
    articleData,
    user 
  }) => {
    homePage = new HomePage(page);
  
    await signUpUser(page, user);
  
    await homePage.clickNewArticleLink();
    await createNewArticle(page, articleData);
    await viewArticlePage.assertArticleTitleIsVisible(articleData.title);
    await viewArticlePage.assertArticleTextIsVisible(articleData.text);
    await viewArticlePage.assertArticleTagsAreHidden();
  });
  
  test('Edit article title', 
    async ({ page, editArticlePage, viewArticlePage }) => {
    await editArticlePage.clickEditPageButton();
    await editArticlePage.fillTitleField('new title');
    await editArticlePage.clickUpdateArticleButton();
    await waitAndReloadArticlePage(page);
    await viewArticlePage.assertArticleTitleIsVisible('new title');
  });

  test('Edit article description', async ({ page, editArticlePage }) => {
    await editArticlePage.clickEditPageButton();
    const newDescription = 'new description'

    await editArticlePage.fillDescriptionField(newDescription);
    await editArticlePage.clickUpdateArticleButton();
    await waitAndReloadArticlePage(page);
    await editArticlePage.clickEditPageButton();
    await editArticlePage.assertDescriptionIsVisible(newDescription)
  })
  
  test('Edit article text', 
    async({ page, editArticlePage, viewArticlePage }) => {
    await editArticlePage.clickEditPageButton();
    await editArticlePage.fillTextField('new text');
    await editArticlePage.clickUpdateArticleButton();
    await waitAndReloadArticlePage(page);
    await viewArticlePage.assertArticleTextIsVisible('new text');
  })
})

test.describe('tests for editing tags in article without tags', () => {
  test.beforeEach(async ({ page, viewArticlePage, user,
     articleData }) => {
    homePage = new HomePage(page);
  
    await signUpUser(page, user);
  
    await homePage.clickNewArticleLink();
    await createNewArticle(page, articleData);
    await viewArticlePage.assertArticleTitleIsVisible(articleData.title);
    await viewArticlePage.assertArticleTextIsVisible(articleData.text);
    await viewArticlePage.assertArticleTagsAreHidden();
  });
  
  test('Add tags to article without tags', 
    async({ page, editArticlePage, viewArticlePage, articleData }) => {
    await editArticlePage.clickEditPageButton();
    
    await editArticlePage.fillTagField(articleData.tags);
    await editArticlePage.clickUpdateArticleButton();
    await waitAndReloadArticlePage(page);
    await viewArticlePage.assertArticleTagsAreVisible(articleData.tags);
  })
})

test.describe('tests for editing tags in article with tags', () => {
  test.beforeEach(async ({ page, viewArticlePage, user, articleData }) => {
    homePage = new HomePage(page);
  
    await signUpUser(page, user);
  
    await homePage.clickNewArticleLink();
    await createNewArticle(page, articleData);
    await viewArticlePage.assertArticleTitleIsVisible(articleData.title);
    await viewArticlePage.assertArticleTextIsVisible(articleData.text);
    await viewArticlePage.assertArticleTagsAreVisible(articleData.tags);
  });
  
  test('Add tags to article with tags', 
    async({ page, editArticlePage, viewArticlePage, articleData }) => {
    await editArticlePage.clickEditPageButton();
    
    await editArticlePage.fillTagField(articleData.tags);
    await editArticlePage.clickUpdateArticleButton();
    await waitAndReloadArticlePage(page);
    await viewArticlePage.assertArticleTagsAreVisible(articleData.tags);
    await viewArticlePage.assertArticleTagsAreVisible(articleData.tags);
  })
})

test.describe('tests for removing data from article', () => {
  test.beforeEach(async ({ page, viewArticlePage, user, articleData }) => {
    homePage = new HomePage(page);
  
    await signUpUser(page, user);
  
    await homePage.clickNewArticleLink();
    await createNewArticle(page, articleData);
    await viewArticlePage.assertArticleTitleIsVisible(articleData.title);
    await viewArticlePage.assertArticleTextIsVisible(articleData.text);
    await viewArticlePage.assertArticleTagsAreVisible(articleData.tags);
  });

  test('remove article tag for the article with tag', 
    async({ page, editArticlePage, viewArticlePage, articleData }) => {
    
    await viewArticlePage.assertArticleTagsAreVisible(articleData.tags);

    await editArticlePage.clickEditPageButton();
    await editArticlePage.removeTagsFromArticle(articleData.tags);
    await editArticlePage.clickUpdateArticleButton();
    await waitAndReloadArticlePage(page);

    await viewArticlePage.assertArticleTagsAreHidden();
  })
  
  test('remove article title', async({ editArticlePage }) => {
    await editArticlePage.clickEditPageButton();
    await editArticlePage.removeTitleFromArticle();
    await editArticlePage.clickUpdateArticleButton();
    await editArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
  })
  
  test('remove article description', async({ editArticlePage }) => {
    await editArticlePage.clickEditPageButton();
    await editArticlePage.removeDescriptionFromArticle();
    await editArticlePage.clickUpdateArticleButton();
    await editArticlePage.
    assertErrorMessageContainsText(DESCRIPTION_CANNOT_BE_EMPTY);
  })
  
  test('remove article text', async({ editArticlePage }) => {
    await editArticlePage.clickEditPageButton();
    await editArticlePage.removeTextFromArticle();
    await editArticlePage.clickUpdateArticleButton();
    await editArticlePage.assertErrorMessageContainsText(TEXT_CANNOT_BE_EMPTY);
  })
})

