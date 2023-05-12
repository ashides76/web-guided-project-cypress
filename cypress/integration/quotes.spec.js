// write tests here
describe('Quotes App', () => {
    //Each test needs fresh state
    // Tests shoudn't rely on other tests
    // Every test should work in isolation!
    beforeEach(() => {
        cy.visit('http://localhost:1234'); //Careful
    })

    // Helpers (ie GETTERS)
    const textInput = () => cy.get('input[name=text]');
    const authorInput = () => cy.get('input[name=author]');
    const fooInput = () => cy.get('input[name=foo]');
    const submitBtn = () => cy.get(`button[id='submitBtn']`)
    const cancelBtn = () => cy.get(`button[id='cancelBtn']`)

    it('sanity check to make sure tests work', () => {
        //'it' is a test
        // 'except' is an assertion
        // There can be multiple assertions per test, but they all need
        // to relate to the 'one thing' that we're testing
        expect(1+2).to.equal(3);
        expect(2+2).not.equal(5);
        expect({}).not.to.equal({});

    })

    // CI/CD -> Continuous Integration / Continuous Deliery

    it('proper elements are showing', () => {
        textInput()
            .should('exist');
        authorInput()
            .should('exist');
        fooInput()
            .should('not.exist');
        submitBtn()
            .should('exist');
        cancelBtn()
            .should('exist');
        
        cy.contains('Submit Quote')
            .should('exist');
        cy.contains(/submit quote/i)
            .should('exist');

    })

    describe('Filling out the inputs and cancellling', () => {
        it('can navigate to the site', () => {
            cy.url()
                .should('include','localhost')
        })

        it('submit button starts out disabled', () => {
            submitBtn()
                .should('be.disabled');
        })

        it('can type in the inputs', () => {
            textInput()
                .should('have.value', '')
                .type('new quote')
                .should('have.value', 'new quote');

            authorInput()
                .should('have.value', '')
                .type('Ashish Desai')
                .should('have.value', 'Ashish Desai')
        })

        it('submite button enables when both inputs are filled out', () => {
            textInput()
                .type('Another Quote')
            authorInput()
                .type('John')
            submitBtn()
                .should('not.be.disabled')
        })

        it('the cancel button can reset the inputs and disable the submite button', () => {
            textInput()
            .type('Another Quote')
            authorInput()
                .type('John')
            cancelBtn()
                .click();
            textInput()
                .should('not.have.value', 'Another Quote'); //using not
            authorInput()
                .should('have.value', '');
            submitBtn()
                .should('not.be.enabled'); // using not
            submitBtn()
                .should('be.disabled');
        })

    })

    describe('Adding a new quote', () => {
        it('can submite and delete a new quote', () => {
            // Add new quote
            textInput()
                .type('Brand New Quote')
            authorInput()
                .type('Joe')
            submitBtn()
                .click()
            // Delete new quote
            cy.contains('Brand New Quote')
                .siblings('button:nth-of-type(2)')
                .click()
            cy.contains('Brand new Quote')
                .should('not.exist');
        })

        it('Another variation of can submit a new quote', () => {
            cy.contains(/have fun/)
                .should('not.exist');
            textInput()
                .type('have fun')
            authorInput()
                .type('Ash')
            submitBtn()
                .click()
            cy.contains('have fun')
            cy.contains('Ash')
            cy.contains('have fun')
                .next().next().click()
            cy.contains('have fun')
                .should('not.exist')
            })

    })

    
    describe('Editing an existing quote', () => {
        it('can edit a quote', () => {
            textInput()
                .type('2 me')
            authorInput()
                .type('You')
            submitBtn()
                .click()
            cy.contains('2 me')
                .siblings('button:nth-of-type(1)')
                .click()
            textInput()
                .should('have.value', '2 me');
            textInput()
                .type('You Updated')
            submitBtn()
                .click()
            cy.contains(' meYou Updated (You)')
                .next().next().click()
        })
    })

})


