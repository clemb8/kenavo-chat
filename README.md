# Kenavo Chat Application

This application is a simple web chat application powered by web socket for the messages. It uses Rust/Actix on the back-end and an Angular SPA for the client part. It's a simple App demonstrating the use of Web Socket in the Rust language.

## Running Locally

To run this server application locally you need :
  - Install Rustup : https://www.rust-lang.org/learn/get-started ;
  - `cd server-chat`
  - `cargo install`
  - `cargo watch -x run`

If you to develop on the client side while serving it with the Rust/Actix server :
    - Easiest way is to get the Angular CLI : `npm install -g @angular/cli` ;
    - `cd client-chat`
    - `npm install`
    - `npm run watch`