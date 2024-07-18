export interface UseCase {
  execute: (...params: any[]) => void;
}