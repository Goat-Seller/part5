describe('Blog app', () => {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:3000/api/testing/reset')
        const user ={
            username: 'root',
            name:'Superuser',
            password: 'root'
        }
        const user2 ={
            username: 'rooten',
            name:'Superused',
            password: 'rooten'
        }
        cy.request('POST', 'http://localhost:3000/api/users', user)
        cy.request('POST', 'http://localhost:3000/api/users', user2)
        cy.visit('http://localhost:3000')
    })
    it('Login form is shown, when clicked', () => {
        cy.contains('log in').click()
        cy.contains('Log in to application')
    })
    describe('Login', () => {
        it('Successfully log in', () => {
            cy.contains('log in').click()
            cy.get('#username').type('root')
            cy.get('#password').type('root')
            cy.get('#loginSubmit').click()
            cy.contains('Superuser logged in')
        })
        it('Unsuccessfully log in', () => {
            cy.contains('log in').click()
            cy.get('#username').type('root')
            cy.get('#password').type('password')
            cy.get('#loginSubmit').click()
            cy.get('.fail').should('contain','wrong username or pasword').and('have.css', 'color', 'rgb(255, 0, 0)')
        })
        describe('When logged in', () => {
            beforeEach(() => { cy.login({ username: 'root', password: 'root' }) })
            it('A blog can be created', () => {
                cy.contains('create blog').click()
                cy.get('#title').type('cypress blog')
                cy.get('#author').type('cypress')
                cy.get('#url').type('https://docs.cypress.io/guides/overview/why-cypress')
                cy.get('#create').click()
                cy.contains('cypress blog')
            })
            describe('One blog operations', () => {
                beforeEach(() => cy.createBlog({ title: 'cypress blog 1', author: 'cypress', url:'https://docs.cypress.io/guides/overview/why-cypress' }))
                it('A blog can be liked', () => {
                    cy.contains('cypress blog 1')
                    cy.contains('show').click()
                    cy.contains('like me!').click()
                    cy.contains('Likes: 1')
                })
                it('A blog can be deleted', () => {
                    cy.contains('cypress blog 1')
                    cy.contains('show').click()
                    cy.contains('delete').click()
                    cy.get('.success').should('contain', 'cypress blog 1 was successfully deleted')
                })
                it('Only creator can delete', () => {
                    cy.login({ username: 'rooten', password: 'rooten' })
                    cy.contains('cypress blog 1')
                    cy.contains('show').click()
                    cy.contains('delete').click()
                    cy.get('.fail').should('contain', 'You are not the owner of blog')
                })
                describe('Many Blogs operations', () => {
                    beforeEach(() => {
                        cy.createBlog({ title: 'cypress blog 2', author: 'cypress', url:'https://docs.cypress.io/guides/overview/why-cypress' })
                    })
                    it.only('Blogs are ordered by likes', () => {
                        cy.get('.blog').eq(0).should('contain', 'cypress blog 1').as('first')
                        cy.get('.blog').eq(1).should('contain', 'cypress blog 2').as('second')
                        cy.get('@second').likeBlog()
                        cy.reload()
                        cy.get('.blog').eq(0).should('contain', 'cypress blog 2')
                    })
                })
            })
        })
    })
})