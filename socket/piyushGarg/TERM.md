# Real-Time Communication Terminology

This document provides a glossary of key terms related to **Polling**, **WebSockets**, **Socket.IO**, and general real-time communication.

---

## General Communication Terminology

### 1. Client-Server Model

A network architecture where a client requests services or resources from a server. The server responds with the requested data or action.

### 2. Request-Response Cycle

The traditional HTTP communication model where the client sends a request to the server, and the server processes it and returns a response.

### 3. Real-Time Communication

The exchange of information with minimal latency, allowing messages or data to be transferred and received almost instantly (or in near real-time).

### 4. Full-Duplex

A communication system that allows data to be sent and received simultaneously between two parties.

### 5. Half-Duplex

A communication system where data transmission occurs in both directions but not at the same time.

---

## Polling Terminology

### 6. Polling

A technique where the client sends requests to the server at regular intervals to check for updates or new data.

### 7. Short Polling

The client repeatedly sends requests to the server at fixed intervals, regardless of whether there is new data or not.

### 8. Long Polling

A more efficient polling technique where the server holds the client’s request until new data is available, then responds. After the response, the client sends a new request, maintaining continuous communication.

### 9. Polling Interval

The time period between each successive request made by the client to the server in a polling mechanism.

---

## WebSocket Terminology

### 10. WebSocket

A protocol that allows a persistent, full-duplex connection between a client and a server, enabling real-time communication without the need for repeated requests.

### 11. Handshake

The initial request-response process between a client and server to establish a WebSocket connection. The client sends an HTTP request that is upgraded to the WebSocket protocol if the server supports it.

### 12. Frame

The basic unit of communication in WebSockets. It is a portion of data sent from the client to the server or vice versa.

### 13. Open Connection

The persistent connection between a client and a server once the WebSocket handshake is completed.

### 14. Close Connection

The event when either the client or the server decides to close the WebSocket connection, terminating communication.

### 15. Ping/Pong Frames

WebSocket control frames used to check if the connection is still active. The client or server can send a ping, and the other party responds with a pong.

---

## Socket.IO Terminology

### 16. Socket.IO

A library built on top of WebSockets, offering real-time, event-based communication with features like automatic reconnection and fallback methods for environments without WebSocket support.

### 17. Socket

In the context of Socket.IO, a socket represents the connection between a client and the server. It allows communication through events.

### 18. Namespace

A way to segment the communication on the same server in Socket.IO. It allows different parts of an application to share a single connection without interfering with each other.

### 19. Room

A feature in Socket.IO that allows clients to join and leave specific rooms to receive or emit messages. Messages emitted to a room are sent only to the clients in that room.

### 20. Event Emission

In Socket.IO, communication happens through events. An event can be "emitted" by the client or server, and the other side can listen for and respond to that event. E.g., `socket.emit('message')`.

### 21. Broadcasting

Sending a message to all connected clients except the one who sent the message. In Socket.IO, broadcasting is a common technique used to communicate with all clients in a specific room or namespace.

### 22. Fallback Mechanism

When WebSockets are not supported by the environment, Socket.IO automatically falls back to alternate transport methods, such as long-polling, to maintain a connection.

### 23. Middleware

Functions in Socket.IO that allow you to intercept or modify incoming data before it is processed by the application.

---

## Related Concepts

### 24. HTTP

The Hypertext Transfer Protocol is the foundation of communication on the web, typically used in a request-response model.

### 25. TCP (Transmission Control Protocol)

A core protocol of the internet that provides reliable, ordered, and error-checked delivery of data between applications.

### 26. Latency

The time delay between the moment a client sends a request and the moment a server responds. Low latency is critical in real-time applications.

### 27. Connection Timeout

The period after which a connection is considered inactive or lost if no data is received within a specific duration.

### 28. CORS (Cross-Origin Resource Sharing)

A security feature in browsers that controls which resources can be requested from a different domain (origin). Issues like **CORS policy errors** occur when a web application attempts to make requests to a server with different origins without proper permissions.

### 29. Server-Sent Events (SSE)

A server push technology that allows the server to push updates to the client over a single, long-lived HTTP connection.

### 30. XHR (XMLHttpRequest)

An API used to send HTTP requests from the client to the server, commonly used for polling in older applications.

---

## Real-World Use Cases

- **Chat Applications**: Real-time messaging apps like WhatsApp or Slack, where Socket.IO is used to update messages in real-time.
- **Live Data Feeds**: Stock trading platforms that display live updates on stock prices using WebSockets.
- **Multiplayer Games**: Games with real-time updates, where player actions need to be communicated instantly to other players using WebSocket or Socket.IO.
- **Collaboration Tools**: Real-time collaboration tools like Google Docs or Figma, where changes are synced across users via WebSocket connections.

---

### License

This document is open for use and modification.
