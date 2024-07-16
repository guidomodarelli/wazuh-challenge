import { EuiButton, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import React from 'react';
import { useHistory } from "react-router-dom";

interface ChartsProps {}

const Charts = ({}: ChartsProps) => {
  const history = useHistory();

  const clickHomeHandler = () => {
    history.push('/');
  }

  return (
    <EuiFlexGroup>
      <EuiFlexItem grow={false}>
        <EuiButton onClick={clickHomeHandler}>Home</EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default Charts;
