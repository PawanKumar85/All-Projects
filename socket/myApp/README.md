# Socket.io

Socket.io is a library that enables real-time, bidirectional, and event-based communication between web clients (browsers) and servers. It abstracts WebSockets and other communication protocols, allowing you to build applications like chat systems, live dashboards, and real-time collaboration tools easily.

`Key Concepts`

- `Client-Server Communication`: Socket.io provides APIs for both the client (browser) and server (Node.js) to communicate efficiently.
- `Rooms and Namespaces`: Rooms allow grouping sockets, and namespaces allow different paths for different modules in your application.
- `Event-Driven Model`: Communication happens via events. You can emit events from both client and server and listen for specific events.

## What are server side events in socket.io ?

- connection
- disconnect
- message
- reconnect
- ping
- join
- leave

## What are client side events in socket.io ?

- connect
- connect_error
- connect_timeout
- reconnect

## Broadcasting

- Users can see how many users are connected.
- If user connect,then we well shown an welcome message to user, and user can see how many users are connected.

## Namespaces

- what is namespace in socket.io ?
- How to create or use namespace ?

## Rooms

- what is room in socket.io ?
- How to create or use room ?
- create a simple room ?
- how to create a multi-room with their limit ?

## Error handling

- connection_failed
- reconnecting
- reconnect_failed

## How to connect client socket.io to multiple servers ?



