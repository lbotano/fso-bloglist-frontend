describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'johndoe',
      name: 'John Doe',
      password: 'test123'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#login-username').type('johndoe')
      cy.get('#login-pass').type('test123')
      cy.get('#login-submit').click()

      cy.contains('create new blog')
    })

    it('fails with wrong credentials', function() {
      cy.get('#login-username').type('johndoe')
      cy.get('#login-pass').type('wrongpass')
      cy.get('#login-submit').click()

      cy.contains('Wrong username or password')
    })
  })
})
