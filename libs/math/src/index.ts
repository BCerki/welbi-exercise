// Basic math utilities
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Statistical functions
export function mean(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
}

export function median(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 
    ? (sorted[mid - 1] + sorted[mid]) / 2 
    : sorted[mid];
}

export function mode(numbers: number[]): number[] {
  if (numbers.length === 0) return [];
  
  const frequency: Record<number, number> = {};
  let maxFreq = 0;
  
  for (const num of numbers) {
    frequency[num] = (frequency[num] || 0) + 1;
    maxFreq = Math.max(maxFreq, frequency[num]);
  }
  
  return Object.entries(frequency)
    .filter(([, freq]) => freq === maxFreq)
    .map(([num]) => Number(num));
}

export function standardDeviation(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  const avg = mean(numbers);
  const variance = mean(numbers.map(num => Math.pow(num - avg, 2)));
  return Math.sqrt(variance);
}

export function variance(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  const avg = mean(numbers);
  return mean(numbers.map(num => Math.pow(num - avg, 2)));
}

// Percentage calculations
export function percentage(value: number, total: number): number {
  if (total === 0) return 0;
  return (value / total) * 100;
}

export function percentageChange(oldValue: number, newValue: number): number {
  if (oldValue === 0) return newValue === 0 ? 0 : 100;
  return ((newValue - oldValue) / Math.abs(oldValue)) * 100;
}

// Range and array utilities
export function sum(numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

export function product(numbers: number[]): number {
  return numbers.reduce((total, num) => total * num, 1);
}

export function min(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return Math.min(...numbers);
}

export function max(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return Math.max(...numbers);
}

export function range(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return max(numbers) - min(numbers);
}

// Distance and geometry
export function distance2D(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

export function distance3D(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));
}

export function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export function radiansToDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

// Factorial and combinatorics
export function factorial(n: number): number {
  if (n < 0) throw new Error('Factorial is not defined for negative numbers');
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

export function combination(n: number, r: number): number {
  if (r > n) return 0;
  if (r === 0 || r === n) return 1;
  return factorial(n) / (factorial(r) * factorial(n - r));
}

export function permutation(n: number, r: number): number {
  if (r > n) return 0;
  return factorial(n) / factorial(n - r);
}

// Financial calculations
export function compound(principal: number, rate: number, time: number, frequency: number = 1): number {
  return principal * Math.pow(1 + rate / frequency, frequency * time);
}

export function simpleInterest(principal: number, rate: number, time: number): number {
  return principal * rate * time;
}

export function presentValue(futureValue: number, rate: number, periods: number): number {
  return futureValue / Math.pow(1 + rate, periods);
}

export function futureValue(presentValue: number, rate: number, periods: number): number {
  return presentValue * Math.pow(1 + rate, periods);
}

// Validation helpers
export function isInteger(value: number): boolean {
  return Number.isInteger(value);
}

export function isFloat(value: number): boolean {
  return Number.isFinite(value) && !Number.isInteger(value);
}

export function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  
  return true;
}

export function isEven(n: number): boolean {
  return n % 2 === 0;
}

export function isOdd(n: number): boolean {
  return n % 2 !== 0;
} 