
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
              "description": "The user has been successfully registrated.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ViewUserModel"
                  }
                }
              }
            },
            "400": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/Errored"
                      },
                      {
                        "properties": {
                          "errorMessages": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/ErrorSwagger"
                            }
                          }
                        }
                      }
                    ]
                  }
                }
              }
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
              "description": "The mail has been successfully confirmed."
            },
            "400": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/Errored"
                      },
                      {
                        "properties": {
                          "errorMessages": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/ErrorSwagger"
                            }
                          }
                        }
                      }
                    ]
                  }
                }
              }
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
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AuthDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "The user has been successfully login."
            },
            "400": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/Errored"
                      },
                      {
                        "properties": {
                          "errorMessages": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/ErrorSwagger"
                            }
                          }
                        }
                      }
                    ]
                  }
                }
              }
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
      "/auth/refresh-token": {
        "post": {
          "operationId": "AuthController_refreshTokens",
          "parameters": [],
          "responses": {
            "201": {
              "description": "The user has been successfully refresh tokens."
            },
            "401": {
              "description": "Not authorized."
            }
          },
          "tags": [
            "auth"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/auth/logout": {
        "post": {
          "operationId": "AuthController_logout",
          "parameters": [],
          "responses": {
            "201": {
              "description": "The user has been successfully logout."
            },
            "401": {
              "description": "Not authorized."
            }
          },
          "tags": [
            "auth"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/users": {
        "get": {
          "operationId": "UsersController_findAllUsers",
          "parameters": [
            {
              "name": "pageNumber",
              "required": false,
              "in": "query",
              "schema": {
                "default": "1",
                "type": "string"
              }
            },
            {
              "name": "pageSize",
              "required": false,
              "in": "query",
              "schema": {
                "default": "10",
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/Paginated"
                      },
                      {
                        "properties": {
                          "items": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/ViewUserModel"
                            }
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Not authorized."
            }
          },
          "tags": [
            "users"
          ],
          "security": [
            {
              "bearer": []
            }
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
            "204": {
              "description": "Own user has been successfully updated."
            },
            "400": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/Errored"
                      },
                      {
                        "properties": {
                          "errorMessages": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/ErrorSwagger"
                            }
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Not authorized."
            }
          },
          "tags": [
            "users"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "UsersController_deleteCurrentUser",
          "parameters": [],
          "responses": {
            "204": {
              "description": "Own user has been successfully deleted"
            },
            "401": {
              "description": "Not authorized."
            }
          },
          "tags": [
            "users"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/users/friendship/{id}": {
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
              "description": "The friendship has been successfully created."
            },
            "401": {
              "description": "Not authorized."
            },
            "404": {
              "description": "User for friendship Not found"
            }
          },
          "tags": [
            "users"
          ],
          "security": [
            {
              "bearer": []
            }
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
              "description": "The comment has been successfully created.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ViewCommentModel"
                  }
                }
              }
            },
            "400": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/Errored"
                      },
                      {
                        "properties": {
                          "errorMessages": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/ErrorSwagger"
                            }
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Not authorized."
            },
            "403": {
              "description": "Create comment for good deed of user, who not in your friend-list."
            },
            "404": {
              "description": "Create comment for good deed which not found"
            }
          },
          "tags": [
            "comments"
          ],
          "security": [
            {
              "bearer": []
            }
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
            "204": {
              "description": "The comment has been successfully updated."
            },
            "400": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/Errored"
                      },
                      {
                        "properties": {
                          "errorMessages": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/ErrorSwagger"
                            }
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Not authorized."
            },
            "403": {
              "description": "Not your comment"
            },
            "404": {
              "description": "Not found comment for update."
            }
          },
          "tags": [
            "comments"
          ],
          "security": [
            {
              "bearer": []
            }
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
            "204": {
              "description": "Comment has been successfully deleted"
            },
            "401": {
              "description": "Not authorized."
            },
            "403": {
              "description": "Not your comment."
            },
            "404": {
              "description": "Not found comment for delete."
            }
          },
          "tags": [
            "comments"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/goodDeeds": {
        "get": {
          "operationId": "GoodDeedsController_findAllGoodDeedsForCurrentUser",
          "parameters": [
            {
              "name": "pageNumber",
              "required": false,
              "in": "query",
              "schema": {
                "default": "1",
                "type": "string"
              }
            },
            {
              "name": "pageSize",
              "required": false,
              "in": "query",
              "schema": {
                "default": "10",
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get all own good deeds"
            },
            "401": {
              "description": "Not authorized."
            }
          },
          "tags": [
            "goodDeeds"
          ],
          "security": [
            {
              "bearer": []
            }
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
              "description": "Good deed has been successfully created.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ViewGoodDeedModel"
                  }
                }
              }
            },
            "400": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/Errored"
                      },
                      {
                        "properties": {
                          "errorMessages": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/ErrorSwagger"
                            }
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Not authorized."
            }
          },
          "tags": [
            "goodDeeds"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/goodDeeds/{id}/user": {
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
            },
            {
              "name": "pageNumber",
              "required": false,
              "in": "query",
              "schema": {
                "default": "1",
                "type": "string"
              }
            },
            {
              "name": "pageSize",
              "required": false,
              "in": "query",
              "schema": {
                "default": "10",
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get all good deeds other user if it user in your friend-list"
            },
            "401": {
              "description": "Not authorized."
            },
            "403": {
              "description": "This user not in your friend-list"
            },
            "404": {
              "description": "This user not found"
            }
          },
          "tags": [
            "goodDeeds"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/goodDeeds/{id}": {
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
            "204": {
              "description": "Good deed has been successfully updated."
            },
            "400": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/Errored"
                      },
                      {
                        "properties": {
                          "errorMessages": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/ErrorSwagger"
                            }
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Not authorized."
            },
            "403": {
              "description": "Good deed for update is not your"
            },
            "404": {
              "description": "Good deed for update is not found"
            }
          },
          "tags": [
            "goodDeeds"
          ],
          "security": [
            {
              "bearer": []
            }
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
            "204": {
              "description": "GoodDeed has been successfully deleted"
            },
            "401": {
              "description": "Not authorized."
            },
            "403": {
              "description": "Good deed for delete is not your"
            },
            "404": {
              "description": "Good deed for delete is not found"
            }
          },
          "tags": [
            "goodDeeds"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/delete-all-data": {
        "delete": {
          "operationId": "AllDataController_delete",
          "parameters": [],
          "responses": {
            "204": {
              "description": "All data deleted"
            }
          },
          "tags": [
            "endpoints for testing"
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
        "Errored": {
          "type": "object",
          "properties": {}
        },
        "ErrorSwagger": {
          "type": "object",
          "properties": {
            "field": {
              "type": "string"
            },
            "message": {
              "type": "string"
            }
          },
          "required": [
            "field",
            "message"
          ]
        },
        "RegistrationDto": {
          "type": "object",
          "properties": {
            "login": {
              "type": "string",
              "minLength": 3,
              "maxLength": 10,
              "description": "user login"
            },
            "password": {
              "type": "string",
              "minLength": 6,
              "maxLength": 20,
              "description": "user password"
            },
            "email": {
              "type": "string",
              "pattern": "/^([\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$)/",
              "description": "user email"
            }
          },
          "required": [
            "login",
            "password",
            "email"
          ]
        },
        "ViewUserModel": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string"
            },
            "login": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "createdAt": {
              "type": "string"
            }
          },
          "required": [
            "_id",
            "login",
            "email",
            "createdAt"
          ]
        },
        "RegistrationConfirmationDto": {
          "type": "object",
          "properties": {
            "code": {
              "type": "string",
              "description": "confirmation code"
            }
          },
          "required": [
            "code"
          ]
        },
        "AuthDto": {
          "type": "object",
          "properties": {
            "loginOrEmail": {
              "type": "string"
            },
            "password": {
              "type": "string"
            }
          },
          "required": [
            "loginOrEmail",
            "password"
          ]
        },
        "Paginated": {
          "type": "object",
          "properties": {
            "totalCount": {
              "type": "number"
            },
            "pagesCount": {
              "type": "number"
            },
            "page": {
              "type": "number"
            },
            "size": {
              "type": "number"
            }
          },
          "required": [
            "totalCount",
            "pagesCount",
            "page",
            "size"
          ]
        },
        "UpdateCurrentUserDto": {
          "type": "object",
          "properties": {}
        },
        "CreateCommentDto": {
          "type": "object",
          "properties": {
            "content": {
              "type": "string"
            },
            "goodDeedId": {
              "type": "string"
            }
          },
          "required": [
            "content",
            "goodDeedId"
          ]
        },
        "ViewCommentModel": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string"
            },
            "content": {
              "type": "string"
            },
            "createdAt": {
              "type": "string"
            }
          },
          "required": [
            "_id",
            "content",
            "createdAt"
          ]
        },
        "UpdateCommentDto": {
          "type": "object",
          "properties": {
            "content": {
              "type": "string"
            }
          },
          "required": [
            "content"
          ]
        },
        "CreateGoodDeedDto": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string"
            }
          },
          "required": [
            "title"
          ]
        },
        "ViewGoodDeedModel": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string"
            },
            "title": {
              "type": "string"
            },
            "createdAt": {
              "type": "string"
            }
          },
          "required": [
            "_id",
            "title",
            "createdAt"
          ]
        },
        "UpdateGoodDeedDto": {
          "type": "object",
          "properties": {
            "isDone": {
              "type": "boolean"
            }
          },
          "required": [
            "isDone"
          ]
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
