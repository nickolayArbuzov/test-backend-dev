
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/auth/registration": {
        "post": {
          "operationId": "AuthController_registration",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RegistrationDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "The record has been successfully created."
            },
            "400": {
              "description": "Sending incorrect data."
            }
          },
          "tags": [
            "auth"
          ]
        }
      },
      "/auth/confirm-mail": {
        "post": {
          "operationId": "AuthController_confirmMail",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RegistrationConfirmationDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "The record has been successfully created."
            },
            "400": {
              "description": "Sending incorrect data."
            }
          },
          "tags": [
            "auth"
          ]
        }
      },
      "/auth/login": {
        "post": {
          "operationId": "AuthController_login",
          "parameters": [],
          "responses": {
            "201": {
              "description": "The record has been successfully created."
            },
            "400": {
              "description": "Sending incorrect data."
            },
            "401": {
              "description": "Not authorized."
            }
          },
          "tags": [
            "auth"
          ]
        }
      },
      "/auth/logout": {
        "post": {
          "operationId": "AuthController_logout",
          "parameters": [],
          "responses": {
            "201": {
              "description": "The record has been successfully created."
            },
            "401": {
              "description": "Not authorized."
            }
          },
          "tags": [
            "auth"
          ]
        }
      },
      "/users": {
        "get": {
          "operationId": "UsersController_findAllUsers",
          "parameters": [],
          "responses": {
            "201": {
              "description": "The record has been successfully created."
            },
            "401": {
              "description": "Not authorized."
            }
          },
          "tags": [
            "users"
          ]
        },
        "put": {
          "operationId": "UsersController_updateCurrentUser",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateCurrentUserDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "The record has been successfully created."
            },
            "400": {
              "description": "Sending incorrect data."
            },
            "401": {
              "description": "Not authorized."
            }
          },
          "tags": [
            "users"
          ]
        },
        "delete": {
          "operationId": "UsersController_deleteCurrentUser",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Current user has been successfully deleted"
            },
            "401": {
              "description": "Not authorized."
            }
          },
          "tags": [
            "users"
          ]
        }
      },
      "/users/{id}": {
        "post": {
          "operationId": "UsersController_createFriendship",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "The record has been successfully created."
            },
            "401": {
              "description": "Not authorized."
            },
            "404": {
              "description": "Not found or forbidden."
            }
          },
          "tags": [
            "users"
          ]
        }
      },
      "/comments": {
        "post": {
          "operationId": "CommentsController_createCommentForSpecificGoodDeed",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateCommentDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "The record has been successfully created."
            },
            "400": {
              "description": "Sending incorrect data."
            },
            "401": {
              "description": "Not authorized."
            }
          },
          "tags": [
            "comments"
          ]
        }
      },
      "/comments/{id}": {
        "put": {
          "operationId": "CommentsController_updateCommentById",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateCommentDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "The record has been successfully created."
            },
            "400": {
              "description": "Sending incorrect data."
            },
            "401": {
              "description": "Not authorized."
            },
            "404": {
              "description": "Not found or forbidden."
            }
          },
          "tags": [
            "comments"
          ]
        },
        "delete": {
          "operationId": "CommentsController_deleteCommentById",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Comment has been successfully deleted"
            },
            "401": {
              "description": "Not authorized."
            },
            "404": {
              "description": "Not found or forbidden."
            }
          },
          "tags": [
            "comments"
          ]
        }
      },
      "/goodDeeds": {
        "get": {
          "operationId": "GoodDeedsController_findAllGoodDeedsForCurrentUser",
          "parameters": [],
          "responses": {
            "201": {
              "description": "The record has been successfully created."
            },
            "401": {
              "description": "Not authorized."
            }
          },
          "tags": [
            "goodDeeds"
          ]
        },
        "post": {
          "operationId": "GoodDeedsController_createGoodDeed",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateGoodDeedDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "The record has been successfully created."
            },
            "400": {
              "description": "Sending incorrect data."
            },
            "401": {
              "description": "Not authorized."
            }
          },
          "tags": [
            "goodDeeds"
          ]
        }
      },
      "/goodDeeds/{id}": {
        "get": {
          "operationId": "GoodDeedsController_findAllGoodDeedsByUserId",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "The record has been successfully created."
            },
            "401": {
              "description": "Not authorized."
            },
            "404": {
              "description": "Not found or forbidden."
            }
          },
          "tags": [
            "goodDeeds"
          ]
        },
        "put": {
          "operationId": "GoodDeedsController_updateGoodDeed",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateGoodDeedDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "The record has been successfully created."
            },
            "400": {
              "description": "Sending incorrect data."
            },
            "401": {
              "description": "Not authorized."
            },
            "404": {
              "description": "Not found or forbidden."
            }
          },
          "tags": [
            "goodDeeds"
          ]
        },
        "delete": {
          "operationId": "GoodDeedsController_deleteGoodDeed",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "GoodDeed has been successfully deleted"
            },
            "401": {
              "description": "Not authorized."
            },
            "404": {
              "description": "Not found or forbidden."
            }
          },
          "tags": [
            "goodDeeds"
          ]
        }
      },
      "/delete-all-data": {
        "delete": {
          "operationId": "AllDataController_delete",
          "parameters": [],
          "responses": {
            "200": {
              "description": "All data deleted"
            }
          },
          "tags": [
            "clear data for testing"
          ]
        }
      }
    },
    "info": {
      "title": "Swagger-doc for test-task",
      "description": "The test-task API description",
      "version": "1.0",
      "contact": {}
    },
    "tags": [
      {
        "name": "test-task",
        "description": ""
      }
    ],
    "servers": [],
    "components": {
      "schemas": {
        "RegistrationDto": {
          "type": "object",
          "properties": {}
        },
        "RegistrationConfirmationDto": {
          "type": "object",
          "properties": {}
        },
        "UpdateCurrentUserDto": {
          "type": "object",
          "properties": {}
        },
        "CreateCommentDto": {
          "type": "object",
          "properties": {}
        },
        "UpdateCommentDto": {
          "type": "object",
          "properties": {}
        },
        "CreateGoodDeedDto": {
          "type": "object",
          "properties": {}
        },
        "UpdateGoodDeedDto": {
          "type": "object",
          "properties": {}
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
