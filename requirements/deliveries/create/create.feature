Feature: Create delivery
Quero poder cadastrar uma entrega

Scenario: Dados válidos
    Given: Dado que o usuário inseriu dados de cadastro válidos
    When: Quando o usuário solicitar o cadastro da entrega
    Then: Então o sistema deve retornar um sinal indicando que o cadastro da entrega foi feita com sucesso
Scenario: Dados inválidos
    Given: Dado que o usuário inseriu dados de cadastro inválidos
    When: Quando o usuário solicitar pra efetuar o cadastro da entrega
    Then: Então o sistema deve retornar uma mensagem de erro
