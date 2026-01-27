```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server
    participant Admin

    User->>Browser: Type note and click Save
    Browser->>Server: POST /new_note (note content)
    Server-->>Browser: 302 Redirect to /notes
    Browser->>Server: GET /notes
    Server-->>Browser: HTML page with updated notes
    Browser-->>User: Display updated notes list
    User-->>Browser: comment
