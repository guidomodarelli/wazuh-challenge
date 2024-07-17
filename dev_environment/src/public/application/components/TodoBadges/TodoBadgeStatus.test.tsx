import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoBadgeStatus from './TodoBadgeStatus';
import { Status } from '../../../core/domain/entities/Status';

describe('TodoBadgeStatus', () => {
  it('verify TodoBadgeStatus renders NOT_STARTED status label', () => {
    render(<TodoBadgeStatus />);

    expect(screen.getByText(Status.NOT_STARTED)).toBeTruthy();
  });

  it('verify TodoBadgeStatus renders with NOT_STARTED status variant', () => {
    render(<TodoBadgeStatus variant={Status.NOT_STARTED} />);

    expect(screen.getByText(Status.NOT_STARTED)).toBeTruthy();
  });

  it('verify TodoBadgeStatus renders with .IN_PROGRESS status variant ', () => {
    render(<TodoBadgeStatus variant={Status.IN_PROGRESS} />);

    expect(screen.getByText(Status.IN_PROGRESS)).toBeTruthy();
  });

  it('verify TodoBadgeStatus renders with .EXECUTED_WITH_ERROR status variant', () => {
    render(<TodoBadgeStatus variant={Status.EXECUTED_WITH_ERROR} />);

    expect(screen.getByText(Status.EXECUTED_WITH_ERROR)).toBeTruthy();
  });

  it('verify TodoBadgeStatus renders with DONE status variant', () => {
    render(<TodoBadgeStatus variant={Status.COMPLETED} />);

    expect(screen.getByText(Status.COMPLETED)).toBeTruthy();
  });
});
