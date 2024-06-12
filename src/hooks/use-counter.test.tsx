import { renderHook } from '@testing-library/react';
import { useCounter } from './use-counter';
import { act } from 'react';



describe('useCounter', () => {
  it('renders without crashing', () => {
    const {result} = renderHook(() => useCounter({initialCount:0}));
    expect(result.current.count).toBe(0)
  })

  it('should accept and render the same initial count', () => {
    const {result} = renderHook(() => useCounter({initialCount:10}));
    expect(result.current.count).toBe(10)
  })
  it('should increment the count', () => {
    const {result} = renderHook(() => useCounter({initialCount:0}));
    act(() => result.current.count++)
    expect(result.current.count).toBe(1)
  })
  it('should decrement the count', () => {
    const {result} = renderHook(() => useCounter({initialCount:1}));
    act(() => result.current.count--)
    expect(result.current.count).toBe(0)
  })
})