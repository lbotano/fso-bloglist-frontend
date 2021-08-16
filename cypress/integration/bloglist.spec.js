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

    it('A blog can be liked', function() {
      let token = JSON.parse(localStorage.getItem('loggedBlogListUser')).token
      cy.request({
        method: 'POST',
        url: 'http://localhost:3003/api/blogs',
        headers: {
          Authorization: `bearer ${token}`
        },
        body: {
          title: 'New blog',
          author: 'New author',
          url: 'http://example.com/',
        }
      })
      cy.visit('http://localhost:3000')
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('1')
    })

    it('User can delete their blog', function() {
      let token = JSON.parse(localStorage.getItem('loggedBlogListUser')).token
      cy.request({
        method: 'POST',
        url: 'http://localhost:3003/api/blogs',
        headers: {
          Authorization: `bearer ${token}`
        },
        body: {
          title: 'My blog',
          author: 'My author',
          url: 'http://example.com/',
        }
      })
      cy.visit('http://localhost:3000')
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.contains('My blog').should('not.exist')
    })

    it('Blog cannot be deleted by another user', function () {
      // Create blog with johndoe
      let token = JSON.parse(localStorage.getItem('loggedBlogListUser')).token
      cy.request({
        method: 'POST',
        url: 'http://localhost:3003/api/blogs',
        headers: {
          Authorization: `bearer ${token}`
        },
        body: {
          title: 'My blog',
          author: 'My author',
          url: 'http://example.com/',
        }
      }).then(() => {

        // Create stranger's user
        const user = {
          username: 'stranger',
          name: 'Stranger',
          password: 'test123'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
          .then(() => {
            // Login with stranger's user
            cy.request('POST', 'http://localhost:3003/api/login', {
              username: 'stranger',
              password: 'test123'
            }).then(response => {
              localStorage.setItem('loggedBlogListUser', JSON.stringify(response.body))
              cy.visit('http://localhost:3000')

              // Try to delete johndoe's blog
              cy.contains('view').click()
              cy.contains('remove')
                .should('have.css', 'display', 'none')
            })
          })
      })
    })
  })
})
