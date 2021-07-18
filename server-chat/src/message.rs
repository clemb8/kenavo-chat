use actix::prelude::*;

use crate::server::Client;

#[derive(Clone, Message)]
#[rtype(result = "()")]
pub struct ChatMessage(pub String);

#[derive(Clone, Message)]
#[rtype(result = "usize")]
pub struct JoinRoom(pub String, pub String, pub Client);

#[derive(Clone, Message)]
#[rtype(result = "()")]
pub struct LeaveRoom(pub String, pub usize);

#[derive(Clone, Message)]
#[rtype(result = "Vec<String>")]
pub struct ListRooms;

#[derive(Clone, Message)]
#[rtype(result = "()")]
pub struct SendMessage(pub String, pub usize, pub String);

#[derive(Clone, Message)]
#[rtype(result = "Vec<String>")]
pub struct ListClients(pub String);

#[derive(Clone, Message)]
#[rtype(result = "()")]
pub struct SetName(pub String, pub usize, pub String);