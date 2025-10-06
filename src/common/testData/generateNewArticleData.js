import { faker } from '@faker-js/faker';

/**
 * Generates a new article and logs it.
 * @param {import('pino').Logger} logger
 */
export function generateNewArticleData(logger) {
  const article = {
    title: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    body: faker.lorem.paragraphs(2),
    tags: [faker.word.noun(), faker.word.noun()], // ✅ changed tagList → tags
  };

  // ✅ exact required message (no JSON.stringify)
  logger.debug(`New article generated: ${article}`);

  return article;
}
