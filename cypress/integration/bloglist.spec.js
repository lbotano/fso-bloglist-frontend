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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'johndoe',
        password: 'test123'
      }).then(response => {
        localStorage.setItem('loggedBlogListUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function() {
      // Create blog
      cy.contains('create new blog').click()
      cy.get('#title').type('New blog')
      cy.get('#author').type('New Author')
      cy.get('#url').type('http://www.example.com/')
      cy.get('#submit').click()

      // Verify that it exists
      cy.contains('a new blog New blog by New Author created')
    })
  })
})
