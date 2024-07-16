import {
  Axis,
  BarSeries,
  Chart,
  LIGHT_THEME,
  Partition,
  PartitionLayout,
  Settings,
} from '@elastic/charts';
import { EuiButton, EuiFlexGroup, EuiFlexItem, EuiSpacer, EuiTitle } from '@elastic/eui';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Priority, TodoItem } from '../../../common/types';
import { useTodoContext } from '../../context/todo.context';

interface ChartsProps {}

const Charts = ({}: ChartsProps) => {
  const { todoItems } = useTodoContext();
  const history = useHistory();

  /**
   * The `clickHomeHandler` function navigates to the home page.
   */
  const clickHomeHandler = () => {
    history.push('/');
  };

  /**
   * The function `getPriorityValueAccessor` returns a numerical value based on the priority of a todo item.
   */
  const getPriorityValueAccessor = (todoItem: TodoItem) => {
    switch (todoItem.priority) {
      case Priority.LOW:
        return 1;
      case Priority.MEDIUM:
        return 2;
      case Priority.HIGH:
        return 3;
      default:
        return 4;
    }
  };

  /**
   * The function `getAssigneeValueAccessor` returns the number of todo items assigned to the same assignee as the input
   * todo item.
   * @param {TodoItem} todoItem - represents an individual todo item with properties such as `assignee`. The
   * `getAssigneeValueAccessor` function takes a `todoItem` as input and returns the count of todo items assigned to the
   * same assignee as the input `todoItem`.
   * @returns the number of todo items assigned to the same assignee as the input `todoItem`.
   */
  const getAssigneeValueAccessor = (todoItem: TodoItem) => {
    const itemsGroupedByAssignee = Object.groupBy(todoItems, (item) => item.assignee ?? '');
    const assignee = todoItem.assignee ?? '';
    return itemsGroupedByAssignee[assignee]?.length ?? 0;
  };

  /**
   * The function `groupByPriorityAndStatus` groups todo items by priority and status, counts the number of items in
   * each group, and sorts the groups by count in descending order.
   * @returns an array of objects, where each object represents a group of todo items grouped by a combination of status
   * and priority. Each object in the array has a `key` property representing the status and priority combination, and a
   * `count` property representing the number of todo items in that group. The array is sorted in descending order based
   * on the count of todo items
   */
  const groupByPriorityAndStatus = () => {
    const itemsGroupedByPriorityAndStatus = Object.groupBy(
      todoItems,
      ({ priority, status }) => `${status} (${priority})`
    );
    return Object.entries(itemsGroupedByPriorityAndStatus)
      .map((item) => ({
        key: item[0],
        count: item[1].length,
      }))
      .sort((a, b) => {
        return b.count - a.count;
      });
  };

  return (
    <>
      <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <EuiButton onClick={clickHomeHandler}>Home</EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer />
      <EuiTitle className="eui-textCenter" size="xs">
        <h3>Distribution of tasks assigned to each person in charge</h3>
      </EuiTitle>
      <Chart size={{ height: 240 }}>
        <Settings baseTheme={LIGHT_THEME} showLegend legendMaxDepth={1} />
        <Partition
          id="treemap"
          data={todoItems}
          config={{ partitionLayout: PartitionLayout.treemap }}
          valueAccessor={getAssigneeValueAccessor}
          valueGetter="percent"
          topGroove={0}
          layers={[
            {
              groupByRollup: (d: TodoItem) => d.assignee,
            },
          ]}
        />
      </Chart>
      <EuiSpacer />
      <EuiTitle className="eui-textCenter" size="xs">
        <h3>Distribution of tasks by priority and status</h3>
      </EuiTitle>
      <Chart size={{ height: 300 }}>
        <Settings baseTheme={LIGHT_THEME} rotation={90} showLegend={false} />
        <BarSeries
          id="priority_status"
          name="Priority and Status"
          data={groupByPriorityAndStatus()}
          xAccessor={'key'}
          yAccessors={['count']}
        />
        <Axis id="bottom-axis" position={'left'} gridLine={{ visible: false }} />
        <Axis id="left-axis" position={'bottom'} />
      </Chart>
      <EuiSpacer />
      <EuiTitle className="eui-textCenter" size="xs">
        <h3>Distribution of tasks by status</h3>
      </EuiTitle>
      <Chart size={{ height: 240 }}>
        <Settings baseTheme={LIGHT_THEME} showLegend legendMaxDepth={1} />
        <Partition
          id="treemap"
          data={todoItems}
          config={{ partitionLayout: PartitionLayout.treemap }}
          valueAccessor={() => 1}
          valueGetter="percent"
          topGroove={0}
          layers={[
            {
              groupByRollup: (d: TodoItem) => d.status,
            },
          ]}
        />
      </Chart>
      <EuiSpacer />
      <EuiTitle className="eui-textCenter" size="xs">
        <h3>Distribution of tasks by priority</h3>
      </EuiTitle>
      <Chart size={{ height: 400 }}>
        <Settings showLegend baseTheme={LIGHT_THEME} />
        <Partition
          id="pieByPriority"
          data={todoItems}
          config={{ partitionLayout: PartitionLayout.sunburst }}
          valueAccessor={getPriorityValueAccessor}
          layers={[
            {
              groupByRollup: (d: TodoItem) => d.priority,
            },
          ]}
        />
      </Chart>
    </>
  );
};

export default Charts;
