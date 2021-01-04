define({ "api": [
  {
    "type": "get",
    "url": "/shot",
    "title": "get a screenshot of a page",
    "name": "TakeScreenshot",
    "group": "Screenshots",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>a url to be looked up</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "selector",
            "description": "<p>take a screenshot of a given selector - encoded URI component</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "File",
            "optional": false,
            "field": "image",
            "description": "<p>the generated screenshot</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "Errors",
            "description": "<p>returned errors</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api.js",
    "groupTitle": "Screenshots"
  },
  {
    "type": "get",
    "url": "/pdf",
    "title": "get a pdf of a page",
    "name": "TakeScreenshot",
    "group": "Screenshots",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>a url to be looked up</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "selector",
            "description": "<p>take a screenshot of a given selector</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "File",
            "optional": false,
            "field": "image",
            "description": "<p>the generated screenshot</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "Errors",
            "description": "<p>returned errors</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api.js",
    "groupTitle": "Screenshots"
  }
] });
