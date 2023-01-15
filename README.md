# Devnology Ecommercy


## Objetivos do Projeto.

O projeto consiste na criação de uma pequena aplicação de ecommerce, com os seguintes objetivos:
- Listar os Produtos dos fornecedores;
- Permitir o cliente filtrar e pesquisar os produtos especificos;
- Adicionar os produtos no carinho de compra;
- Guardar os produtos comprados na base de dados, bem como os dados dos clientes;


APis do fornecedor:
- http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider
- http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider


**Estruturo do Projeto:**
- Laravel Backend;
- React FrontEnd

## Backend:
- Laravel 9

**Instalação:**
npm install 

**executar o projeto**
php artisan serve

**Configuração do Base de Dados**
no ficheiro **.env**, adicionar as informações do base de dados:

`
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
`

**executar o comando npm install** para instalar todas as dependencias do projeto.


### Funcionalidades do backend:
**APIs:**
- http://localhost:8000/api/v1/invoice - Metodo Post para gravar as compras dos clientes;
![image](https://user-images.githubusercontent.com/65368848/212565232-fb2968b2-25ec-4b9e-9a52-f94b79542108.png)

- http://localhost:8000/api/v1/category - Metodo get para Listar todas as Categorias dos Produtos;
![image](https://user-images.githubusercontent.com/65368848/212565245-328f096f-5eda-466d-a922-33106b39a209.png)

- http://localhost:8000/api/auth/register - Metodo post, para fazer o registo dos clientes;
![image](https://user-images.githubusercontent.com/65368848/212564461-3e788d60-7400-49c7-ba9e-845d44684545.png)

- http://localhost:8000/api/auth/login - Efetuar o login;
![image](https://user-images.githubusercontent.com/65368848/212564358-925ab46c-c216-4353-bf6d-ebddc6833044.png)



## FrontEnd
- react next js

** instalar projeto:
npm install

executar o projeto

npm run dev

-- Para a criação do FrontEnd, foi adquirido o template : https://bonik-react.vercel.app/

**Entretanto foi apenas adicionado as seguintes funcionalidades:**
- Adicionar produto no carrinho;
- Filtrar Produtos;
- Ver produtods por Categorias;
- Ver Perfil;
- Ver quantidade de produtos comprados pelo Cliente e a Quantidade de Dinheiro utilizado na plataforma;
- Comprar produtos;

## Por adicionar: 
- Adicionar alertas nas funcionalidades de compras, login, registos;
- Apresentar todos os produtos comprados;
- Validar o formulario de Compra;
- etc.









