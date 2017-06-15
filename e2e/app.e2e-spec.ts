import { TiendaAppPage } from './app.po';

describe('tienda-app App', () => {
  let page: TiendaAppPage;

  beforeEach(() => {
    page = new TiendaAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
