import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoBadgePriority from './TodoBadgePriority';
import { Priority } from '../../../common/types';

describe('TodoBadgePriority', () => {
  it('verify TodoBadgePriority renders LOW priority label', () => {
    render(<TodoBadgePriority />);

    expect(screen.getByText(Priority.LOW)).toBeTruthy();
  });

  it('verify TodoBadgePriority renders with LOW priority variant', () => {
    render(<TodoBadgePriority variant={Priority.LOW} />);

    expect(screen.getByText(Priority.LOW)).toBeTruthy();
  });

  it('verify TodoBadgePriority renders with CRITICAL priority variant ', () => {
    render(<TodoBadgePriority variant={Priority.CRITICAL} />);

    expect(screen.getByText(Priority.CRITICAL)).toBeTruthy();
  });

  it('verify TodoBadgePriority renders with MEDIUM priority variant', () => {
    render(<TodoBadgePriority variant={Priority.MEDIUM} />);

    expect(screen.getByText(Priority.MEDIUM)).toBeTruthy();
  });

  it('verify TodoBadgePriority renders with HIGH priority variant', () => {
    render(<TodoBadgePriority variant={Priority.HIGH} />);

    expect(screen.getByText(Priority.HIGH)).toBeTruthy();
  });
});
