import {
  Axis,
  BarSeries,
  Chart,
  LIGHT_THEME,
  Partition,
  PartitionLayout,
  Settings,
} from '@elastic/charts';
import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  euiPaletteColorBlind,
  EuiSpacer,
  EuiTitle,
} from '@elastic/eui';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { TodoEntity } from "../../../core/domain/entities/TodoEntity";
import { useTodoContext } from '../../context/TodoContext';
import useChartData from './hooks/useChartData.hook';

const Charts = () => {
  const { todoItems } = useTodoContext();
  const history = useHistory();
  const {
    getPriorityWeight,
    groupByAssignee,
    groupByPriorityAndStatus,
    groupByAssigneeAndPriority,
    groupByAssigneeAndStatus,
  } = useChartData();

  /**
   * The `clickHomeHandler` function navigates to the home page.
   */
  const clickHomeHandler = () => {
    history.push('/');
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
          valueAccessor={groupByAssignee}
          valueGetter="percent"
          topGroove={0}
          layers={[
            {
              groupByRollup: (d: TodoEntity) => d.assignee,
            },
          ]}
        />
      </Chart>
      <EuiSpacer />
      <EuiTitle className="eui-textCenter" size="xs">
        <h3>Todo priority distribution by person in charge</h3>
      </EuiTitle>
      <Chart size={{ height: 300 }}>
        <Settings baseTheme={LIGHT_THEME} rotation={90} showLegend={true} legendPosition="right" />
        <BarSeries
          id="issues"
          name="Issues"
          data={groupByAssigneeAndPriority()}
          xAccessor="assignee"
          yAccessors={['count']}
          splitSeriesAccessors={['priority']}
          stackAccessors={['priority']}
          color={euiPaletteColorBlind({ rotations: 2, order: 'group' }).slice(18, 20)}
        />
        <Axis id="bottom-axis" position={'left'} />
        <Axis id="left-axis" gridLine={{ visible: true }} position={'bottom'} />
      </Chart>
      <EuiSpacer />
      <EuiTitle className="eui-textCenter" size="xs">
        <h3>Todo status distribution by person in charge</h3>
      </EuiTitle>
      <Chart size={{ height: 300 }}>
        <Settings baseTheme={LIGHT_THEME} rotation={90} showLegend={true} legendPosition="right" />
        <BarSeries
          id="issues"
          name="Issues"
          data={groupByAssigneeAndStatus()}
          xAccessor="assignee"
          yAccessors={['count']}
          splitSeriesAccessors={['status']}
          stackAccessors={['status']}
          stackMode="silhouette"
          color={euiPaletteColorBlind({ rotations: 2, order: 'group' }).slice(18, 20)}
        />
        <Axis id="bottom-axis" position={'left'} />
        <Axis id="left-axis" gridLine={{ visible: true }} position={'bottom'} />
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
              groupByRollup: (d: TodoEntity) => d.status,
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
          valueAccessor={getPriorityWeight}
          layers={[
            {
              groupByRollup: (d: TodoEntity) => d.priority,
            },
          ]}
        />
      </Chart>
    </>
  );
};

export default Charts;
