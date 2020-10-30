describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            username: "test",
            name: "test",
            password: "test"
        }
        cy.request('POST', 'http://localhost:3001/api/user/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.get('[data-cy=loginTitle]').should('contain', 'Log in to application')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('[data-cy=username]').type('test')
            cy.get('[data-cy=password]').type('test')
            cy.get('[data-cy=login-button]').click()
        })

        it('fails with wrong credentials', function () {
            cy.get('[data-cy=username]').type('wrong')
            cy.get('[data-cy=password]').type('testPassword')
            cy.get('[data-cy=login-button]').click()
            cy.get('[data-cy=message]').should('contain', 'invalid username or password')
        })
    })


    describe.only('When logged in', function () {
        beforeEach(function () {
            cy.get('[data-cy=username]').type('test')
            cy.get('[data-cy=password]').type('test')
            cy.get('[data-cy=login-button]').click()
        })

        it('A blog can be created', function () {
            cy.get('[data-cy=create-isshow]').click()
            cy.get('[data-cy=create-title]').type('testtitle')
            cy.get('[data-cy=create-author]').type('testauthor')
            cy.get('[data-cy=create-url]').type('https://testurl')
            cy.get('[data-cy=create-submit]').click()

            cy.get('[data-cy=blog-testtitle]').should('contain', 'testtitle')
            cy.get('[data-cy=blog-testauthor]').should('contain', 'testauthor')
        })

        it('A blog can like the blog', function () {
            cy.get('[data-cy=create-isshow]').click()
            cy.get('[data-cy=create-title]').type('testtitle')
            cy.get('[data-cy=create-author]').type('testauthor')
            cy.get('[data-cy=create-url]').type('https://testurl')
            cy.get('[data-cy=create-submit]').click()
            cy.get('[data-cy=view-button]').click()

            cy.get('[data-cy=like-button]').click()
            cy.get('[data-cy=blog-testtitle-like]').should('contain', '1')
        })
u
        it('A blog can like the blog', function () {
            cy.get('[data-cy=create-isshow]').click()
            cy.get('[data-cy=create-title]').type('testtitle')
            cy.get('[data-cy=create-author]').type('testauthor')
            cy.get('[data-cy=create-url]').type('https://testurl')
            cy.get('[data-cy=create-submit]').click()
            cy.get('[data-cy=view-button]').click()

            cy.get('[data-cy=delete-button]').click()
            cy.get('[data-cy=blog-testtitle-like]').not('contain', '1')
        })
    })


})