import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('lib/utils', () => {
  describe('cn', () => {
    it('merges class names correctly', () => {
      const result = cn('foo', 'bar');
      expect(result).toBe('foo bar');
    });

    it('handles conditional classes', () => {
      const result = cn('foo', false && 'bar', 'baz');
      expect(result).toBe('foo baz');
    });

    it('handles undefined and null values', () => {
      const result = cn('foo', undefined, null, 'bar');
      expect(result).toBe('foo bar');
    });

    it('resolves Tailwind CSS conflicts', () => {
      const result = cn('p-4', 'p-2');
      expect(result).toBe('p-2');
    });

    it('resolves complex Tailwind conflicts', () => {
      const result = cn('px-2 py-1', 'p-4');
      expect(result).toBe('p-4');
    });

    it('handles array of classes', () => {
      const result = cn(['foo', 'bar']);
      expect(result).toBe('foo bar');
    });

    it('handles object notation', () => {
      const result = cn({ foo: true, bar: false, baz: true });
      expect(result).toBe('foo baz');
    });

    it('handles mixed inputs', () => {
      const result = cn('foo', ['bar', 'baz'], { qux: true });
      expect(result).toBe('foo bar baz qux');
    });

    it('returns empty string for no arguments', () => {
      const result = cn();
      expect(result).toBe('');
    });

    it('handles empty string inputs', () => {
      const result = cn('foo', '', 'bar');
      expect(result).toBe('foo bar');
    });
  });
});
