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

Additionally, the plugin includes charts that display statistics about the TODOs, such as:

1. Types of TODOs by priority (low, medium, high, critical) assigned to a person.
2. Types of TODOs by status (Completed, Not Started, Working on it, Error) assigned to a person.
3. Types of TODOs by status.
4. Types of TODOs by priority.
5. Combination of TODOs by priority and status.

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
guide](https://github.com/opensearch-project/OpenSearch-Dashboards/blob/main/CONTRIBUTING.md) for instructions
setting up your development environment.

    ## Scripts
    <dl>
      <dt><code>yarn osd bootstrap</code></dt>
      <dd>Execute this to install node_modules and setup the dependencies in your plugin and in OpenSearch Dashboards
      </dd>

      <dt><code>yarn plugin-helpers build</code></dt>
      <dd>Execute this to create a distributable version of this plugin that can be installed in OpenSearch Dashboards
      </dd>
    </dl>
