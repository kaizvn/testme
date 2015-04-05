# testme project

## Requiremnents: 
  - Crawling data from a website, and show its items with falling effect.
  - Has new item: broadcast event to all users.
  - User can make change by 'drag&drop', also broadcast event for letting everybody see the change.
  
## Done:
  - Initial project.
  - Style the effect falling.
  - Setup emit/listen events.
  - Everyone can see new item added.

        addItemsAPI = {
                 url : 'http://host:port/items', // default:  http://localhost:8080/items
                 type : 'POST',
                 params : { name : 'whatever you want' }
              }

  - Drag & Drop item, update list.
  
## On-going:
  - Create add item page for testing purpose.
  - crawling data....

## Know-issues:
  - Move item on top to bottom => other listeners will see items from <start> to <end> do falling effects. workaround : disable effect when drag n drop.


## How to run: 
  - checkout and run commands:
  
        $ npm install   
        $ bower install

  - Start server
  
        $ node server

  
