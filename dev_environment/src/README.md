# TODO Plugin

An OpenSearch Dashboards plugin

## Description

The TODO plugin provides comprehensive task management features, including:

- Pagination and sorting by properties.
- Search functionality for TODOs by title, tags, and assignee.
- Create, update, and delete TODOs.
- Mark TODOs as completed.

Each TODO has the following attributes:
- Title
- Status (Completed, Not Started, Working on it, Error)
- Priority (low, medium, high, critical)
- CreatedAt
- Tags
- Assignee

Additionally, the plugin includes charts that display statistics about the
TODOs, such as:

1. Types of TODOs by priority (low, medium, high, critical) assigned to a
   person.
2. Types of TODOs by status (Completed, Not Started, Working on it, Error)
   assigned to a person.
3. Types of TODOs by status.
4. Types of TODOs by priority.
5. Combination of TODOs by priority and status.

## Project Architecture

This project follows the principles of Hexagonal Architecture (also known as
Ports and Adapters Architecture). The main goal of this architecture is to
decouple the core business logic from the user interface, database, and other
external systems, ensuring that the business logic remains independent and
reusable.

### Directory Structure

```
.
├── common
├── public
│   ├── application
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── layouts
│   │   ├── pages
│   │   ├── providers
│   │   ├── types
│   │   └── utils
│   └── core
│       ├── adapters
│       ├── domain
│       │   ├── entities
│       │   └── usecases
│       └── ports
├── server
│   ├── constants
│   ├── routes
│   ├── schema
│   └── utils
└── test
    ├── mocks
    └── utils
```

#### Folder Descriptions

1. **common**: Contains shared utilities and components that can be used across
   the entire application.

2. **public**: Houses the frontend application.

   - **application**: Contains UI-specific logic and components.
     - **components**: UI components that are primarily presentational and
       communicate with the rest of the system through props.
     - **context**: React Contexts for managing and providing global state.
     - **hooks**: Custom hooks that encapsulate business logic and local state
       management.
     - **layouts**: Layout components that define the structure of pages.
     - **pages**: Components representing different pages in the application.
     - **providers**: Context providers that wrap the application or parts of it
       to provide context values.
     - **types**: TypeScript types and interfaces used throughout the
       application.
     - **utils**: Utility functions specific to the application layer.

   - **core**: Contains the business logic and interactions with external
     systems.
     - **adapters**: Bridges between the business logic and external systems
       (e.g., APIs, databases).
     - **domain**: Contains the core business logic.
       - **entities**: Domain entities and value objects that represent the core
         business model.
       - **usecases**: Application use cases or services that encapsulate
         business logic.
     - **ports**: Interfaces that define contracts for the adapters to
       implement, facilitating communication between the core and external
       systems.

3. **server**: Backend logic and configurations for the server-side part of the
   application.
   - **constants**: Constant values used throughout the server.
   - **routes**: Route definitions and handlers for the server API.
   - **schema**: Database schemas used by the server.
   - **utils**: Utility functions specific to the server-side logic.

4. **test**: Contains mocks and utility functions for testing.
   - **mocks**: Mock data and functions to assist in unit and integration
     testing.
   - **utils**: Utility functions and helpers used across various test cases.

#### Testing Structure

Tests are located next to the files they test, making it easy to find and
maintain the tests related to specific components or modules. This approach
promotes a close association between the code and its tests.

In the `test` directory, we maintain common utilities and mocks that are used
throughout the test suite. This helps in keeping the test code DRY (Don't Repeat
Yourself) and organized.

- **mocks**: Contains mock data and functions to assist in unit and integration
  testing.
- **utils**: Utility functions and helpers used across various test cases.

**Tests next to the components:**

*   **Advantages:**
    *   Easy access to the tests related to a specific component.
    *   Promotes writing tests alongside component development.
    *   Reduced navigation within the folder structure.
*   **Disadvantages:**
    *   Can create clutter if there are many files in one folder.
    *   Less clear for very large projects where separation can improve readability.

## How to run the tests

To run the tests for the `todo_plugin`, follow these steps:

1. Enter the Docker container (`dev_environment-osd-1`):

    Navigate to the `todo_plugin` directory:
    ```bash
    cd /home/node/kbn/plugins/todo_plugin
    ```

2. Run the tests using Yarn:
    ```bash
    yarn test
    ```

## Development

See the [OpenSearch Dashboards contributing
guide](https://github.com/opensearch-project/OpenSearch-Dashboards/blob/main/CONTRIBUTING.md)
for instructions setting up your development environment.

    ## Scripts
    <dl>
      <dt><code>yarn osd bootstrap</code></dt>
      <dd>Execute this to install node_modules and setup the dependencies in your plugin and in OpenSearch Dashboards
      </dd>

      <dt><code>yarn plugin-helpers build</code></dt>
      <dd>Execute this to create a distributable version of this plugin that can be installed in OpenSearch Dashboards
      </dd>
    </dl>
