```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Open SPA URL
    Browser->>Server: GET /spa
    Server-->>Browser: HTML file (SPA shell)

    Browser->>Server: GET /main.css
    Browser->>Server: GET /spa.js
    Server-->>Browser: CSS and JavaScript files

    Browser->>Server: GET /data.json
    Server-->>Browser: Notes data (JSON)

    Browser-->>User: Render notes using JavaScript
