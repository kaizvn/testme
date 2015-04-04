# testme project

## Requiremnents: 
  - Crawling data from <xxx>, and show items with falling effect.
  - Has new item: broadcast event to all users.
  - User can make change by 'drag&drop', also broadcast event for letting everybody see the change.
  
## Progess:
  - Initial project.
  - Style the effect falling.
  - Setup emit/listen events.
  - Everyone can see new item added (send `POST`request to <host:port>/items with body data `{"name": <name>}`.
  
## On-going:
  - Implelemt drag & drop in angular.
  
## How to run: 
  - checkout and run commands:
  
        $ npm install   
        $ bower install

  - Start server
  
        $ node server

  
