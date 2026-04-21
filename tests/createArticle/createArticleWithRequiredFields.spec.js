import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test.only('Creat an article with required fields', async ({
  articleWithoutTags,
}) => {
  await articleWithoutTags;
});
