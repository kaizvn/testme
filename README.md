# testme project
  - aaalag
## Requirements:
  - Crawling data from a website, and show its items with falling effect.
  - Has new item: broadcast event to all users.
  - User can make change by 'drag n drop', also broadcast event for letting everybody see the change.
  
## Done:
  - Initial project.
  - Style the effect falling.
  - Setup emit/listen events.
  - Everyone can see new item added.

        addNew_API = {
                 url : 'http://host:port/items', // default:  http://localhost:8080/items
                 type : 'POST',
                 params : { name : 'whatever you want' }
              }

  - Drag & Drop item, update list.
  - Create add item form for testing purpose.
  - Handle disconnect event.
  - Count users.
  
## On-going:
  - crawling data.

## Know-issues:
  - Move `item` at low position to high: others will see group items from `start` to `end` do falling effects, instead of only `movedItem`. Workaround : disable effect when `drag n drop`.


## How to run: 
  - checkout and run commands:
  
        $ npm install   
        $ bower install

  - Start server
  
        $ node server

