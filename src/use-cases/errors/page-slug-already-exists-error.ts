export class PageSlugAlreadyExists extends Error {
  constructor() {
    super('E-mail already exists');
  }
}
