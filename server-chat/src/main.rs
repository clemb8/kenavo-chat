#[macro_use]

use actix_files::Files;
use actix_identity::{CookieIdentityPolicy, IdentityService};
use actix_web::{guard, middleware, web, App, HttpServer, HttpResponse, HttpRequest, Error, Result};
use actix_web::http::header;
use actix_web_actors::ws;
use actix_cors::Cors;
use log::info;

mod message;
mod session;
mod server;

use session::WsChatSession;

async fn chat_route(req: HttpRequest, stream: web::Payload) -> Result<HttpResponse, Error> {
    ws::start(WsChatSession::default(), &req, stream)
}

async fn angular_index() -> Result<actix_files::NamedFile> {
    info!("redirect to Anfular front-end");
    Ok(actix_files::NamedFile::open("../client-chat/dist/client-chat/index.html")?)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {

    std::env::set_var(
        "RUST_LOG",
        "simple-auth-server=debug,actix_web=info,actix_server=info",
    );
    env_logger::init();
    let domain: String = std::env::var("DOMAIN").unwrap_or_else(|_| "localhost".to_string());

    // Start http server
    HttpServer::new(move || {

        let cors = Cors::default()
        .allowed_origin("http://localhost:4200")
        .allowed_origin("http://localhost:3000")
        .allowed_methods(vec!["GET", "POST"])
        .allowed_headers(vec![header::AUTHORIZATION, header::ACCEPT])
        .allowed_header(header::CONTENT_TYPE)
        .max_age(3600);

        App::new()
            .wrap(cors)
            // enable logger
            .wrap(middleware::Logger::default())
            .service(actix_files::Files::new("/static", "../client-chat/dist/client-chat"))
            // limit the maximum amount of data that server will accept
            .data(web::JsonConfig::default().limit(4096))
            // everything under '/api/' route
            .service(
                web::scope("/api")
                    .service(
                        web::resource("/create-game")

                    )
                    // .service(
                    //     web::resource("/auth")
                    //         .route(web::post().to(auth_handler::login))
                    //         .route(web::delete().to(auth_handler::logout))
                    //         .route(web::get().to(auth_handler::get_me)),
                    // ),
            )
            .service(
                web::resource("/ws/").to(chat_route)
            )
            .default_service(
                web::resource("/")
                    .route(web::get().to(angular_index))
                    .route(
                        web::route()
                            .guard(guard::Not(guard::Get()))
                            .to(|| HttpResponse::MethodNotAllowed()),
                    )
            )
    })
    .bind("127.0.0.1:3000")?
    .run()
    .await
}